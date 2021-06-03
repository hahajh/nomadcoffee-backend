import {
    loadFilesSync,
    mergeTypeDefs,
    mergeResolvers
} from "graphql-tools";

const loadedTypeDef = loadFilesSync(`${__dirname}/**/*.typeDefs.*`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.*`);

export const typeDefs = mergeTypeDefs(loadedTypeDef);
export const resolvers = mergeResolvers(loadedResolvers);
