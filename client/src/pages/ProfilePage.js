import {
    Container,
    Col,
    Button,
    Card,
    Row
} from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { GET_ME } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import React, { useState, useEffect } from 'react';
import { saveTeamIds, getSavedTeamIds, getTeams } from '../utils/localStorage';
import { SAVE_TEAM } from '../utils/mutations';


const ProfilePage = () => {
    const { loading, error: userQueryerror, data, refetch } = useQuery(GET_ME);
    const [searchedTeams, setSearchTeams] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [savedTeamIds, setSavedTeamIds] = useState(getSavedTeamIds());
    const [saveTeam, { error }] = useMutation(SAVE_TEAM);


    // // navigate to personal profile page if username is yours
    async function fetchTeams() {
        const teams = await getTeams()

        setSearchTeams(teams)
    }
    useEffect(() => {
        fetchTeams()

        return () => saveTeamIds(savedTeamIds);
    }, []);
    if (!Auth.loggedIn()) {
        return <Navigate to="/" />;
    }
    console.log(Auth.loggedIn())
    if (loading) {
        return <div>Loading...</div>;
    }

    const handleSaveTeam = async (teamId) => {
        const teamToSave = searchedTeams.find((team) => team.teamId === teamId);
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }
        try {
            const response = await saveTeam({
                variables: { newTeam: teamToSave },
            });
            console.log(teamToSave);
            setSavedTeamIds([...savedTeamIds, teamToSave.teamId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main>
            <div>
                <Container>
                    <h1>Add your favorite teams!</h1>
                    {/* <Form onSubmit={handleFormSubmit}>
                        <Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                    name='searchInput'
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    type='text'
                                    size='lg'
                                    placeholder='Search for a favorite NBA team'
                                    id='teamSearchBox'
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button type='submit' id='teamSearchBtn' variant='success' size='lg'>
                                    Submit Search
                                </Button>
                            </Col>
                        </Row>
                    </Form> */}
                    <Row>
                        {
                            searchedTeams.map((team) => {
                                let classString = team.class
                                if (classString=='76ers') {
                                    classString = 'Philadelphia'
                                };
                                return (
                                    <Col key={team.teamId} md="4">
                                        <Card className={classString}>
                                            <Card.Body>
                                                <Card.Title>{team.name}</Card.Title>
                                                <Button variant="primary" onClick={() => handleSaveTeam(team.teamId)}>Save</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )

                            })

                        }
                    </Row>
                </Container>
            </div>
            <footer id='welcomeFoot'>
                <p>Created by: Hattie Steed, Fabian Barranco, Kelton Sterett, Mckay Memmott</p>
            </footer>


        </main>
    )
}
export default ProfilePage;