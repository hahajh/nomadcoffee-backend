import { gql } from "apollo-server";

export default gql`
    type EditCoffeeShopResult {
        ok: Boolean!,
        error: String
    }
    type Mutation {
        editCoffeeShop(id: Int!, latitude: String, longitude: String, description: String) : EditCoffeeShopResult!
    }
`;