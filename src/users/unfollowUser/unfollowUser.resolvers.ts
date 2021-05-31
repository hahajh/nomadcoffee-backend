import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const resolver: Resolvers = {
    Mutation: {
        unfollowUser: protectResolver(
            async (
                _,
                { username },
                { loggedInUser, client }
            ) => {
                const ok = client.user.findUnique({ where: { username } });
                if (!ok) {
                    return {
                        ok: false,
                        error: "That user does not exist"
                    }
                }
                await client.user.update({
                    where: {
                        id: loggedInUser.id
                    },
                    data: {
                        following: {
                            disconnect: {
                                username
                            }
                        }
                    }
                });
                return {
                    ok: true
                }
            }
        )
    }
}

export default resolver;