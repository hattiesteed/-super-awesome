import { Navigate } from 'react-router-dom';
import { GET_ME } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { REMOVE_TEAM } from '../utils/mutations';
import { removeTeamId } from '../utils/localStorage';
import {
    Container,
    Card,
    Button,
    Row,
    Col
} from 'react-bootstrap';

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

    console.log(user)
    return (
        <main>
            <h1 id='favTeamH1'>Your favorites teams:</h1>
            <Row>
                {user.savedTeams.map((team) => {
                    return(
                        <Col md='4' key={team.teamId}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{team.name}</Card.Title>
                                    <Card.Text>{team.city}</Card.Text>
                                    <Button className='btn-block btn-danger' onClick={() => handleRemoveTeam(team.teamId) }>
                                        Remove this team!
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
            <div className='teamsList'>
                <div>team</div>
                <div>team</div>
                <div>team</div>
                <div>team</div>
            </div>
        </main>
    )
}
export default FavoriteTeams;