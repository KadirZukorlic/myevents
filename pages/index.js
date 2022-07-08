import Head from 'next/head';
import NewsletterRegistration from '../components/input/newsletter-registration';

import { getFeaturedEvents } from '../helpers/api-util';
import { EventList } from '../components/events/event-list';

// Random comment

const HomePage = (props) => {
  return (
    <div>
      <Head>
        <title>My Events</title>
        <meta
          name="description"
          content="Find a lot of great events that fits your needs"
        />
      </Head>
      |<NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
};

export async function getStaticProps() {
  const featuerdEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuerdEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
