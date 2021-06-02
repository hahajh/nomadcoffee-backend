import { gql } from "apollo-server";

export default gql`
    type Query {
        seeCoffeeShops(page: Int!): [CoffeeShop]
    }
`;