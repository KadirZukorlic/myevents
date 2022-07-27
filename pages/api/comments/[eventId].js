import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from '../../../helpers/db-util';

async function handler(req, res) {
  const eventId = req.query.eventId; // eventId = ime fajla [eventId].js

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the datebase failed!' });
    return;
  }

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
      // client.close();
      return;
    }

    const newComment = {
      name,
      email,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(
        client,
        'comments', // collection
        newComment,
        'events' // db
      );

      newComment._id = result.insertedId;

      res.status(201).json({ message: 'Added Comment!', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting commenet failed!' });
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        'events'
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed!' });
    }
  }
  // client.close();
}

export default handler;
