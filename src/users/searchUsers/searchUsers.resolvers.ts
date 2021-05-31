import { Resolvers } from "../../types";

const resolver: Resolvers = {
    Query: {
        searchUsers: async (
            _,
            { keyword, page },
            { client }
        ) => {
            if (keyword.length < 3) {
                return {
                    ok: false,
                    error: "Keyword is too short"
                }
            }
            const users = await client.user.findMany({
                take: 5,
                skip: (page - 1) * 5,
                where: {
                    username: {
                        startsWith: keyword.toLowerCase()
                    }
                }
            });
            return {
                ok: true,
                users
            };
        }
    }
}

export default resolver;