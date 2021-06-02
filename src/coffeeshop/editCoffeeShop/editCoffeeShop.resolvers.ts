import { Resolvers } from "../../types";
import { processCategories } from "../coffeeshop.utils";

const resolver: Resolvers = {
    Mutation: {
        editCoffeeShop: async (
            _,
            { id, latitude, longitude, description },
            { client }
        ) => {
            const oldCoffeeShop = await client.coffeeShop.findUnique({
                where: {
                    id
                }, include: {
                    categories: {
                        select: {
                            id: true
                        }
                    }
                }
            });
            if (!oldCoffeeShop) {
                return {
                    ok: false,
                    error: "Coffeeshop not found."
                }
            }

            await client.coffeeShop.update({
                where: {
                    id
                },
                data: {
                    latitude,
                    longitude,
                    categories: {
                        disconnect: oldCoffeeShop.categories,
                        connectOrCreate: processCategories(description)
                    }
                }
            });
            return {
                ok: true
            };
        }
    }
}

export default resolver;