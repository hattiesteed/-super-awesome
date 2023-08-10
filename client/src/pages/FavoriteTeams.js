import { Navigate } from 'react-router-dom';
import { GET_ME } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { REMOVE_TEAM } from '../utils/mutations';
import { removeTeamId } from '../utils/localStorage';

const FavoriteTeams = () => {
    const { loading, error, data, refetch } = useQuery(GET_ME);
    const user = data?.me || data?.user || {};
    const [removeTeam, { removeTeamError }] = useMutation(REMOVE_TEAM);
    // // navigate to personal profile page if username is yours
    if (!Auth.loggedIn()) {
        return <Navigate to="/" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    const handleRemoveTeam = async (teamId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            const { data } = await removeTeam({
                variables: { teamId },
            });
            removeTeamId(teamId);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <main>
            <h1>Fabian was here</h1>
        </main>
    )
}
export default FavoriteTeams;