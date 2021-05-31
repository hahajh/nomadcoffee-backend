import { gql } from "apollo-server";

export default gql`
    type User { 
        id: String!
        username: String!   
        email: String!
        name: String!
        location: String
        password: String!
        avartarURL: String
        githubUsername: String!
        followers(page: Int!): [User]
        following(page: Int!): [User]
        createdAt: String!
        updatedAt: String!
    }
`;