import { getFeaturedEvents } from '../helpers/api-util';
import { EventList } from '../components/events/event-list';

// Random comment

const HomePage = (props) => {
  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
};

export async function getStaticProps() {
  const featuerdEvents = await getFeaturedEvents();
  console.log(featuerdEvents);
  return {
    props: {
      events: featuerdEvents,
    },
  };
}

export default HomePage;
