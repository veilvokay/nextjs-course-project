import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A first meetup',
        image: 'https://i2.wp.com/digital-photography-school.com/wp-content/uploads/2019/05/joseph-barrientos-49318-unsplash-e1558728034701.jpg?resize=1500%2C1000&ssl=1',
        address: 'Some address 5, 12341',
        description: 'This is a first meetup descr'
    },
    {
        id: 'm2',
        title: 'A second meetup',
        image: 'https://i2.wp.com/digital-photography-school.com/wp-content/uploads/2019/05/joseph-barrientos-49318-unsplash-e1558728034701.jpg?resize=1500%2C1000&ssl=1',
        address: 'Some address 152, 6543',
        description: 'This is a second meetup descr'
    },

]

function HomePage(props) {
    return (
        <MeetupList meetups={DUMMY_MEETUPS} />
    );
}

export default HomePage;