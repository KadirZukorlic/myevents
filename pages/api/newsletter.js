import { MongoClient } from 'mongodb';

const CONNECT_URL =
  'mongodb+srv://Kadir:starfallkacobre1@cluster0.h22nx.mongodb.net/?retryWrites=true&w=majority';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    const client = await MongoClient.connect(CONNECT_URL);
    const db = client.db('newsletter');

    await db.collection('emails').insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: 'Signed up! Your email is: ' + userEmail });
  }
}

export default handler;
