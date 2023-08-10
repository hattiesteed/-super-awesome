import {
    Container,
    Col,
    Form,
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
    // // navigate to personal profile page if username is yours
    useEffect(() => {
        return () => saveTeamIds(savedTeamIds);
    });
    if (!Auth.loggedIn()) {
        return <Navigate to="/" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }


    // add this to html where search bar is: onSubmit={handleFormSubmit}
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }
        try {
            const response = await fetch(`https://www.balldontlie.io/api/v1/teams?search=${searchInput}`);
            if (!response.ok) {
                throw new Error(`Uh oh...Something went wrong!`);
            }
            const { items } = await response.json();
            const teamData = items.map((team) => ({
                teamId: team.id,
                name: team.name,
                conference: team.conference,
                division: team.division,
                city: team.city,
                abbreviation: team.abbreviation,
            }));
            setSearchTeams(teamData);
            setSearchInput(``);
        } catch (err) {
            console.error(err);
        }
    };
    const handleSaveTeam = async (teamId) => {
        const teamToSave = searchedTeams.find((team) => team.teamId === teamId);
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }
        try {
            const { data } = await saveTeam({
                variables: { teamData: { ...teamToSave } },
            });
            setSavedTeamIds([...savedTeamIds, teamToSave.teamId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main>
            <div>
                <Container>
                    <h1>Search for your favorite team!</h1>
                    <Form onSubmit={handleFormSubmit}>
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
                    </Form>
                </Container>
            </div>



        </main>
    )
}
export default ProfilePage;