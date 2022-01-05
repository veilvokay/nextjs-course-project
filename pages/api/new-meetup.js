import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        // const { title, image, address, description } = data;

        const client = await MongoClient.connect('mongodb+srv://veilvokay:QwTHp08FsdPr43Z@cluster0.d0hhj.mongodb.net/meetupsDB?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsCollection = db.collection('meetupsCollection');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'Meetup Added!' });
    }
}

export default handler;