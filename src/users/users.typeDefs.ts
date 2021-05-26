import { gql } from "apollo-server";

export default gql`
    type User {
        id: String!
        username: String!
        email: String!
        name: String!
        location: String
        avartarURL: String
        githubUsername: String!
        createdAt: String!
        updatedAt: String!
    }
    type CreateAccountResult {
        ok: Boolean!
        error: String
    } 
    type Mutation {
        createAccount(
            username: String!
            email: String!
            name: String!
            location: String
            avartarURL: String
            githubUsername: String!
            password: String!
        ): CreateAccountResult
    }
    type Query {
        seeProfile(username: String!): User
    }
`