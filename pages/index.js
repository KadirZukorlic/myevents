import { getFeaturedEvents, getAllEvents } from '../helpers';
import { EventList } from '../components/events/event-list';

// Random comment

const HomePage = () => {
  const featuerdEvents = getFeaturedEvents();
  const allEvents = getAllEvents();
  // console.log(featuerdEvents);

  return (
    <div>
      <EventList items={allEvents} />
    </div>
  );
};

export default HomePage;
