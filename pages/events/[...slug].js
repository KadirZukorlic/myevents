import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Head from 'next/head';

import { EventList } from '../../components/events/event-list';
import { ResultsTitle } from '../../components/events/results-title';
import { ErrorAlert } from '../../components/ui/error-alert';
import { Button } from '../../components/ui/button';

const FilteredEventsPage = () => {
  const [events, setEvents] = useState();
  const router = useRouter();

  const filterData = router.query.slug;

  const { data, error } = useSWR(
    'https://next-dummy-6221f-default-rtdb.firebaseio.com/events.json',
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setEvents(events);
    }
  }, [data]);

  let pageHeadData = <Head></Head>;

  if (!events) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2020 ||
    numMonth > 12 ||
    numMonth < 1 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No Events found!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

// export const getServerSideProps = async (ctx) => {
//   const { params } = ctx;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2020 ||
//     numMonth > 12 ||
//     numMonth < 1
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//       // notFound: true,
//       // redirect: {
//       //   destination: "/error"
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// };

export default FilteredEventsPage;
