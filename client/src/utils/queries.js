import { gql } from '@apollo/client';

export const GET_ME = gql`
{
    me {
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
