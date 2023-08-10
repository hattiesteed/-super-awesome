const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        savedTeams: [Team]

    }

    type Auth {
        token: ID!
        user: User
    }

    type Team {
        teamId: Int!
        name: String
        conference: String
        division: String
        city: String
        abbreviation: String
        class: String
    }

    input InputTeam {
        teamId: Int!
        name: String
        conference: String
        division: String
        city: String
        abbreviation: String
        class: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveTeam(newTeam: InputTeam!) : User
        removeTeam(teamId: Int!): User
    }
`;

module.exports = typeDefs;