require('dotenv').config();
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import * as logger from "morgan";
import client from "./client";
import { resolvers, typeDefs } from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.token),
            client
        }
    }
});

const app = express();
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
apollo.applyMiddleware({ app });
app.listen({ port: PORT }, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});