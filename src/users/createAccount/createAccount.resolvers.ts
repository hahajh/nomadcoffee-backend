import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolver: Resolvers = {
    Mutation: {
        createAccount: async (
            _,
            { username, email, name, location, password, githubUsername },
            { client }
        ) => {
            try {
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [
                            { username }, { email }
                        ]
                    }
                });
                if (existingUser) {
                    throw new Error("This username or email is already taken.");
                }
                const uglyPassword = await bcrypt.hash(password, 10);
                return client.user.create(
                    {
                        data: {
                            username,
                            email,
                            name,
                            location,
                            githubUsername,
                            password: uglyPassword
                        }
                    }
                );
            } catch (e) {
                return e;
            }
        }
    }
}

export default resolver;