import { MongoClient } from 'mongodb';

const CONNECT_URL =
  'mongodb+srv://Kadir:starfallkacobre1@cluster0.h22nx.mongodb.net/?retryWrites=true&w=majority';

export const connectDatabase = async () => {
  const client = await MongoClient.connect(CONNECT_URL);
  return client;
};

export const insertDocument = async (
  client,
  collection,
  document,
  database
) => {
  const db = client.db(database);
  await db.collection(collection).insertOne(document);
};

export const getAllDocuments = async (client, collection, sort, database) => {
  const db = client.db(database);

  const documents = await db
    .collection(collection) //comments
    .find()
    .sort(sort) // sorting comments that latest comment is first in fetching
    .toArray();

  return documents;
};
