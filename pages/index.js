import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
    return (
        <>
            <Head>
                <title>NextJS | React Meetups</title>
                <meta name='description' content='Browse React Meetups list' />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
}

// // will rebuild each time on the server after deployment (code runs only on the server)
// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     // fetch data from API / etc.
//     return {
//         props: DUMMY_MEETUPS,
//     };
// }

// Update when req comes (during build process) - better if data on the site doesnt update few times a second
export async function getStaticProps() {
    // fetch data from and API / DataBase

    const client = await MongoClient.connect('mongodb+srv://veilvokay:QwTHp08FsdPr43Z@cluster0.d0hhj.mongodb.net/meetupsDB?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetupsCollection');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 3600, // number of seconds which NextJS will wait until it regenerates its page for the incoming req
    }; // need to return an object (always)
}

export default HomePage;