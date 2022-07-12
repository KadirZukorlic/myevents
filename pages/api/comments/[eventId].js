function handler(req, res) {
  const eventId = req.query.eventId; // eventId = ime fajla [eventId].js

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      name,
      email,
      text,
    };

    console.log(newComment);

    res.status(201).json({ message: 'Added Comment!', comment: newComment });
  }

  if (req.method === 'GET') {
    const dummyList = [
      {
        id: 'c1',
        name: 'Kadir',
        text: 'Selam za najbolju stranku svi gradzani glasaju za vas SAMO PRAVO SPP',
      },
      {
        id: 'C2',
        name: 'Rasem Skrijelj',
        text: 'Jeli vam to VUCIC naredio vama iz SPP jedna jedina stranka demokratske akcije SDA SULJO',
      },
    ];

    res.status(200).json({ comments: dummyList });
  }
}

export default handler;
