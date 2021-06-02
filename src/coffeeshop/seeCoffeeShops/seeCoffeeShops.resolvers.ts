import { Resolvers } from "../../types";

const resolver: Resolvers = {
    Query: {
        seeCoffeeShops: async (_, { page }, { client }) => {
            return client.coffeeShop.findMany({
                take: 5,
                skip: (page - 1) * 5
            });
        }
    }
}

export default resolver;