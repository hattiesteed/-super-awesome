import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login(
    $email: String!, 
    $password: String!
    ){
        login(
            email: $email, 
            password: $password
            ){
                token
                user {
                    _id
                    username
                    email
                }
            }
        }
`;

export const ADD_USER = gql`
mutation addUser(
    $username: String!,
    $email: String!,
    $password: String!
    ){
        addUser(
            username: $username,
            email: $email,
            password: $password
            ){
                token
                user {
                    _id
                    username
                    email
                }
            }
        }
`;

export const SAVE_TEAM = gql`
mutation saveTeam( $newTeam: InputTeam! ) {
    saveTeam( newTeam: $newTeam ) {
        _id
        username
        email
        savedTeams {
            teamId
            name
            conference
            division
            city
            abbreviation
        }
    }
}
`;

export const REMOVE_TEAM = gql`
mutation removeTeam( $teamId: String! ) {
    removeTeam( teamId: $teamId ) {
        _id
        username
        email
        savedTeams {
            teamId
            name
            conference
            division
            city
            abbreviation
        }
    }
}
`;
