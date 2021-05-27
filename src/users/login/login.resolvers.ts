import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Resolvers } from "../../types";

const resolver: Resolvers = {
    Mutation: {
        login: async (_, { username, password }, { client }) => {
            const user = await client.user.findFirst({ where: { OR: [{ username }] } });
            if (!user) {
                return {
                    ok: false,
                    error: "User not found"
                };
            }
            const passwordOk = await bcrypt.compare(password, user.password);
            if (!passwordOk) {
                return {
                    ok: false,
                    error: "Password is incorrect"
                };
            }
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
            return {
                ok: true,
                token: token
            }
        }
    }
}

export default resolver;