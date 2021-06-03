import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { createWriteStream } from "fs";
import { uploadToS3 } from "../../shared/shared.utils";

const resolver: Resolvers = {
    Mutation: {
        uploadCoffeeShopPhoto: protectResolver(
            async (_, { coffeeShopId, file }, { loggedInUser, client }) => {
                const coffeeshop = await client.coffeeShop.findUnique({
                    where: {
                        id: coffeeShopId
                    },
                    select: {
                        id: true
                    }
                });
                if (!coffeeshop) {
                    return {
                        ok: false,
                        error: "Coffeeshop not found"
                    };
                }

                let photoUrl = await uploadToS3(file, loggedInUser.id, "coffeeshop_photo");
                const newCoffeeShopPhoto = await client.coffeeShopPhoto.create({
                    data: {
                        url: photoUrl,
                        shop: {
                            connect: {
                                id: coffeeshop.id
                            }
                        }
                    }
                });
                return {
                    ok: true,
                    coffeeShopPhoto: newCoffeeShopPhoto
                };
            }
        )
    }
};

export default resolver;