export const getAllEvents = async () => {
  const response = await fetch(
    'https://next-dummy-6221f-default-rtdb.firebaseio.com/events.json'
  );
  const data = await response.json();
  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
      // spread everything from every object
      //   title: data[key].title,
      //   description: data[key].description,
      //   image: data[key].image,
      //   location: data[key].location,
      //   isFeatured: data[key].isFeatured,
      //   date: data[key].date,
    });
  }
  return events;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
