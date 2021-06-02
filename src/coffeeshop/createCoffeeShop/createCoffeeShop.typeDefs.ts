import { gql } from "apollo-server";

export default gql`
    type CreateCoffeeShopResult {
        ok: Boolean!,
        error: String,
        coffeeShop: CoffeeShop
    }
    type Mutation {
        createCoffeeShop(name: String!, latitude: String, longitude: String, description: String) : CreateCoffeeShopResult
    }
`;