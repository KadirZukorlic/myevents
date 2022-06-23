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
  console.log(events);
  return events;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};
