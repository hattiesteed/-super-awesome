import { Navigate } from 'react-router-dom';
import { GET_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

// const user = data?.me || data?.user || {};

const ProfilePage = () => {
    const { loading, error, data, refetch } = useQuery(GET_ME);
    const user = data?.me || data?.user || {};
    // // navigate to personal profile page if username is yours
    if (!Auth.loggedIn()) {
        return <Navigate to="/" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <main>
            <div className='leftHalf'>
                <h1>testing</h1>
            </div>
            <h1>testing</h1>

            <div className='rightHalf'>
                <h2>Welcome back { }</h2>
                {/* <h2>{data.username}</h2> */}


                <h3>Email: ex</h3>
                <br></br>
                <br></br>
                <br></br>

                <h3>Select/Change your favorite NBA team:</h3>

                <label for='teams'>Select a team:</label>

                <select name='teams' id='teams'>
                    <option value='lakers'>Los Angeles Lakers</option>
                    <option value='nugs'>Denver Nuggets</option>
                </select>
            </div>



        </main>
    )
}
export default ProfilePage;