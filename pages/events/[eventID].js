import React, { Fragment } from 'react';
import { getEventById } from '../../helpers/index';
import { useRouter } from 'next/router';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import { ErrorAlert } from '../../components/ui/error-alert';

const EventDetail = () => {
  const router = useRouter();

  const eventID = router.query.eventID;

  const event = getEventById(eventID);
  console.log(event);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>{event.description}</EventContent>
    </Fragment>
  );
};

export default EventDetail;
