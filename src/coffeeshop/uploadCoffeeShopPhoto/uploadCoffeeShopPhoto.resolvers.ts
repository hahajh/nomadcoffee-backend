import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { createWriteStream } from "fs";

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
                const { filename, createReadStream } = await file;
                const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
                const readStream = createReadStream();
                const writeStream = createWriteStream(
                    process.cwd() + "/uploads/" + newFilename
                );
                readStream.pipe(writeStream);
                let photoUrl = `http://localhost:4000/static/${newFilename}`;

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