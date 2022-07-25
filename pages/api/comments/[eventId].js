import { MongoClient } from 'mongodb';

async function handler(req, res) {
  const eventId = req.query.eventId; // eventId = ime fajla [eventId].js

  const client = await MongoClient.connect(
    'mongodb+srv://Kadir:starfallkacobre1@cluster0.h22nx.mongodb.net/?retryWrites=true&w=majority'
  );

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
      name,
      email,
      text,
      eventId,
    };

    const db = client.db('events');

    const result = await db.collection('comments').insertOne(newComment);

    console.log(result);

    newComment.id = result.insertedId;

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

  client.close();
}

export default handler;
