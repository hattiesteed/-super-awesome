import { Navigate } from 'react-router-dom';
import { GET_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

const ProfilePage = () => {
    // const { loading, error, data, refetch } = useQuery(GET_ME);
    // const user = data?.me || data?.user || {};
    // // navigate to personal profile page if username is yours
    // if (!Auth.loggedIn()) {
    //     return <Navigate to="/" />;
    // }

    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    return (
        <main>

            <h1>testing</h1>

            <br></br>
            <br></br>
            <br></br>

            <h3>Select your favorite NBA team:</h3>

            <label for='teams'>Select a team:</label>

            <select name='teams' id='teams'>
                <option value='lakers'>Los Angeles Lakers</option>
                <option value='nugs'>Denver Nuggets</option>
            </select>


        </main>
    )
}
export default ProfilePage;