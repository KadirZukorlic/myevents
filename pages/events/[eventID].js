import React, { Fragment } from 'react';
import { getEventById, getAllEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import { ErrorAlert } from '../../components/ui/error-alert';

const EventDetail = (props) => {
  const event = props.event;

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

export const getStaticProps = async (ctx) => {
  const eventID = ctx.params.eventID;

  const event = await getEventById(eventID);
  return {
    props: {
      event: event,
    },
  };
};

export const getStaticPaths = async () => {
  const events = await getAllEvents();
  const paths = events.map((event) => {
    return { params: { eventID: event.id } };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export default EventDetail;
