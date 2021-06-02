import { Resolvers } from "../../types";
import { getSlug } from "../coffeeshop.utils";

const resolver: Resolvers = {
    Query: {
        seeCategories: async (_, { page }, { client }) => {
            return await client.category.findMany({
                take: 5,
                skip: (page - 1) * 5
            })
        }
    }
}

export default resolver;