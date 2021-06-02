import { gql } from "apollo-server";

export default gql`
    type Query {
        seeCategories(page: Int!): [Category]
    }
`;