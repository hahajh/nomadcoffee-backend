import {
    loadFilesSync,
    mergeTypeDefs,
    mergeResolvers
} from "graphql-tools";

const loadedTypeDef = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);

export const typeDefs = mergeTypeDefs(loadedTypeDef);
export const resolvers = mergeResolvers(loadedResolvers);
