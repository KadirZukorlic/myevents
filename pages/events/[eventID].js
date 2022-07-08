import React, { Fragment } from 'react';
import Head from 'next/head';

import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import Comments from '../../components/input/comments';

const EventDetail = (props) => {
  const event = props.event;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>{event.description}</EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
};

export const getStaticProps = async (ctx) => {
  const eventID = ctx.params.eventID;

  const event = await getEventById(eventID);
  return {
    props: {
      event: event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => {
    return { params: { eventID: event.id } };
  });

  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export default EventDetail;
