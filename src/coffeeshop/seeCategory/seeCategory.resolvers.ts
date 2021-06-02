import { Resolvers } from "../../types";
import { getSlug } from "../coffeeshop.utils";

const resolver: Resolvers = {
    Query: {
        seeCategory: async (_, { category, page }, { client }) => {
            const slug = getSlug(category);
            return await client.category.findUnique({
                where: {
                    slug
                }, include: {
                    shops: {
                        take: 5,
                        skip: (page - 1) * 5
                    }
                }
            })
        }
    }
}

export default resolver;