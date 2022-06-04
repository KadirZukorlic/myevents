import { getFeaturedEvents, getAllEvents } from '../dummy-data';
import { EventList } from '../components/events/event-list';

const HomePage = () => {
  const featuerdEvents = getFeaturedEvents();
  const allEvents = getAllEvents();
  console.log(featuerdEvents);

  return (
    <div>
      <EventList items={allEvents} />
    </div>
  );
};

export default HomePage;
