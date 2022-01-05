import Head from 'next/head'
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';


const MeetupDetails = (props) => {
    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name='description' content={props.meetupData.description} />
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </>
    )
}

// use only with getStaticProps
export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://veilvokay:QwTHp08FsdPr43Z@cluster0.d0hhj.mongodb.net/meetupsDB?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetupsCollection');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); // get only ids

    client.close();

    return {
        fallback: false, // false - paths contains ALL possible paths | true - nextJS will try to generate page for the id which isnt in the array
        paths: meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString(),
            }
        })),
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    // fetch data for the single Meetup

    const client = await MongoClient.connect('mongodb+srv://veilvokay:QwTHp08FsdPr43Z@cluster0.d0hhj.mongodb.net/meetupsDB?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetupsCollection');

    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });


    client.close();

    console.log(meetupId, 'id');

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            },
        }
    }
}

export default MeetupDetails;
