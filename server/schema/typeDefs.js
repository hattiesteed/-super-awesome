const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!

    }

    type Auth {
        token: ID!
        user: User
    }

    type Team {
        teamId: String!
        name: String
        conference: String
        division: String
        city: String
        abbreviation: String
    }

    input InputTeam {
        teamId: String!
        name: String
        conference: String
        division: String
        city: String
        abbreviation: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveTeam(newTeam: InputTeam!) : User
        removeTeam(teamId: String!): User
    }
`;

module.exports = typeDefs;