import { Resolvers } from "../../types";
import { processCategories } from "../coffeeshop.utils";

const resolver: Resolvers = {
    Mutation: {
        createCoffeeShop: async (
            _,
            { name, latitude, longitude, description },
            { loggedInUser, client }
        ) => {
            const existingCoffeeshop = await client.coffeeShop.findUnique({
                where: {
                    name
                }
            });
            if (existingCoffeeshop) {
                return {
                    ok: false,
                    error: "Alaready Coffeeshop exists."
                }
            }
            let categoriesObj = [];
            if (description) {
                categoriesObj = processCategories(description);
            }
            const newCoffeeshop = await client.coffeeShop.create({
                data: {
                    name,
                    latitude,
                    longitude,
                    user: {
                        connect: {
                            id: loggedInUser.id
                        }
                    },
                    ...(categoriesObj.length > 0 && {
                        categories: {
                            connectOrCreate: categoriesObj
                        }
                    })
                }
            });
            return {
                ok: true,
                coffeeShop: newCoffeeshop
            };
        }
    }
}

export default resolver;