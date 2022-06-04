import Link from 'next/link';

export const EventItem = (props) => {
  const { title, image, date, location, id } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedAddress = location.replace(', ', '\n');
  const exploreLink = `/events/${id}`;

  return (
    <li>
      <img src={'/' + image} alt={title} />
      <div>
        <h2>{title}</h2>
        <time>{humanReadableDate}</time>
      </div>
      <div>
        <address>{formattedAddress}</address>
      </div>
      <div>
        <Link href={exploreLink}>Explore Event</Link>
      </div>
    </li>
  );
};