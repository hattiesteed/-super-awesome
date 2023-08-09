import { Navigate } from 'react-router-dom';
import { GET_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

const FavoriteTeams = () => {
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
            <h1>Fabian was here</h1>
        </main>
    )
}
export default FavoriteTeams;