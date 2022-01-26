import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const likedIds = makeVar([]);

export const cache = new InMemoryCache({
  typePolicies: {
    Movie: {
      fields: {
        isLiked: {
          read(_, { readField }) {
            const movieId = readField("id");
            const isLiked = !!likedIds().find((id) => id === movieId);

            return isLiked;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: cache,
});

export default client;

// resolvers: {
//   Movie: {
//     isLiked: () => false,
//   },
//   Mutation: {
//     toggleLikeMovie: (_, { id }, { cache }) => {
//       cache.modify({
//         id: `Movie:${id}`,
//         fields: {
//           isLiked(val) {
//             return !val;
//           },
//         },
//       });
//     },
//   },
// },
