import { Resolvers } from "../types";

const resolver: Resolvers = {
    User: {
        followers: async ({ username }, { page }, { client }) => {
            const ok = await client.user.findUnique(
                {
                    where: {
                        username
                    },
                    select: {
                        id: true
                    }
                });
            if (!ok) {
                return []
            }
            return await client.user
                .findUnique({ where: { username } })
                .followers({
                    take: 5,
                    skip: (page - 1) * 5
                });
        },
        following: async ({ username }, { page }, { client }) => {
            const ok = await client.user.findUnique(
                {
                    where: {
                        username
                    }, select: {
                        id: true
                    }
                });
            if (!ok) {
                return []
            }
            return await client.user
                .findUnique({ where: { username } })
                .following({
                    take: 5,
                    skip: (page - 1) * 5
                });
        }
    }
}

export default resolver;