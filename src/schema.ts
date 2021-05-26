import {
    loadFilesSync,
    mergeTypeDefs,
    mergeResolvers,
    makeExecutableSchema
} from "graphql-tools";

const loadedTypeDef = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.{queries,mutations}.ts`);

const typeDefs = mergeTypeDefs(loadedTypeDef);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;