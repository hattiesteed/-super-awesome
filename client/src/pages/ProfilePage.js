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
import { saveTeamIds, getSavedTeamIds } from '../utils/localStorage';
import { SAVE_TEAM } from '../utils/mutations';

// const user = data?.me || data?.user || {};

const ProfilePage = () => {
    const { loading, error: userQueryerror, data, refetch } = useQuery(GET_ME);
    const user = data?.me || data?.user || {};
    const [searchedTeams, setSearchTeams] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [savedTeamIds, setSavedTeamIds] = useState(getSavedTeamIds());
    const [saveTeam, { error }] = useMutation(SAVE_TEAM);

    const getTeams = async () => {
        try {
            const response = await fetch(`https://www.balldontlie.io/api/v1/teams`);
            if (!response.ok) {
                throw new Error(`Uh oh...Something went wrong!`);
            }
            const { data } = await response.json();
            const teamData = data.map((team) => ({
                class: team.name,
                teamId: team.id,
                name: team.full_name,
                conference: team.conference,
                division: team.division,
                city: team.city,
                abbreviation: team.abbreviation,
            }));
            setSearchTeams(teamData);
        } catch (err) {
            console.error(err);
        }
    };

    const teamData = {
        abbreviation: "ATL",
        city: "Atlanta",
        conference: "East",
        division: "Southeast",
        name: "Atlanta Hawks",
        teamId: 1
    }
    // // navigate to personal profile page if username is yours
    useEffect(() => {
        // getTeams()

        return () => saveTeamIds(savedTeamIds);
    });
    if (!Auth.loggedIn()) {
        return <Navigate to="/" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    function test() {
        saveTeam({
            variables: { newTeam: teamData }
        })
    }
    const handleSaveTeam = async (teamId) => {
        const teamToSave = searchedTeams.find((team) => team.id === teamId);
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }
        try {
            console.log(teamToSave)
            const response = await saveTeam({
                variables: { newTeam: teamToSave },
            });
            setSavedTeamIds([...savedTeamIds, teamToSave.teamId]);
        } catch (err) {
            console.log(err.message)
            console.log(err.name)
            console.error(err);
        }
    };

    return (
        <main>
            <Button onClick={test}>Test</Button>
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
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button type='submit' variant='success' size='lg'>
                                    Submit Search
                                </Button>
                            </Col>
                        </Row>
                    </Form> */}
                    <Row>
                        {
                            searchedTeams.map((team) => {
                                return (
                                    <Col key={team.id} md="4">
                                        <Card className={team.class}>
                                            <Card.Body>
                                                <Card.Title>{team.name}</Card.Title>
                                                <Button variant="primary" onClick={() => handleSaveTeam(team.id)}>Save</Button>
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