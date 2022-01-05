import Head from 'next/head'
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';


const NewMeetupPage = () => {
    const router = useRouter();

    const addMeetupHandler = async (enteredData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data);

        router.push('/');
    }

    return (
        <>
            <Head>
                <title>Add a New Meetup</title>
                <meta name='description' content='Add a new meetup to gather around and talk React' />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    )
}

export default NewMeetupPage
