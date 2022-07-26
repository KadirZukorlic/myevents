import { MongoClient } from 'mongodb';

const CONNECT_URL =
  'mongodb+srv://Kadir:starfallkacobre1@cluster0.h22nx.mongodb.net/?retryWrites=true&w=majority';

const connectDatabase = async () => {
  const client = await MongoClient.connect(CONNECT_URL);
  return client;
};

const insertDocument = async (client, document) => {
  const db = client.db('newsletter');
  await db.collection('emails').insertOne(document);
};

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    try {
      await insertDocument(client, { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
      return;
    }

    res.status(201).json({ message: 'Signed up! Your email is: ' + userEmail });
  }
}

export default handler;
