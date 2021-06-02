import { Resolvers } from "../../types";

const resolver: Resolvers = {
    Query: {
        seeCoffeeShop: async (_, { coffeeShopId }, { client }) => {
            return await client.coffeeShop.findUnique({
                where: {
                    id: coffeeShopId
                },
                include: {
                    categories: true
                }
            });
        }
    }
}

export default resolver;