import * as bcrypt from "bcrypt";
import client from "../client";
import { Resolvers } from "../types";

const resolver: Resolvers = {
    Mutation: {
        createAccount: async (
            _,
            { username, email, name, location, avartarURL, githubUsername, password }
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
                    return {
                        ok: false,
                        error: "This username or email is already taken."
                    }
                }
                const uglyPassword = await bcrypt.hash(password, 10);
                const newUser = await client.user.create({
                    data: {
                        username,
                        email,
                        name,
                        location,
                        avartarURL,
                        githubUsername,
                        password: uglyPassword
                    }
                });
                if (newUser.id) {
                    return {
                        ok: true
                    }
                } else {
                    return {
                        ok: false,
                        error: "Can't create a new user"
                    }
                }
            } catch (e) {
                return e;
            }
        }
    }
}

export default resolver;