// package.json dependencies:
// {
//   "@grpc/grpc-js": "^1.9.0",
//   "@grpc/proto-loader": "^0.7.0",
//   "apollo-server-express": "^3.12.0",
//   "express": "^4.18.2",
//   "graphql": "^16.8.0"
// }

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// In-memory database for demonstration
const users = new Map();

// REST API Setup
const app = express();
app.use(express.json());

// REST Endpoints
app.post('/api/users', (req, res) => {
  const { id, name, email } = req.body;
  users.set(id, { id, name, email });
  res.status(201).json({ id, name, email });
});

app.get('/api/users/:id', (req, res) => {
  const user = users.get(req.params.id);
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

// GraphQL Setup
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    user(id: ID!): User
  }

  type Mutation {
    createUser(id: ID!, name: String!, email: String!): User
  }
`;

const resolvers = {
  Query: {
    user: (_, { id }) => users.get(id),
  },
  Mutation: {
    createUser: (_, { id, name, email }) => {
      const user = { id, name, email };
      users.set(id, user);
      return user;
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

// gRPC Setup
const protoPath = path.resolve(__dirname, 'user.proto');
const packageDefinition = protoLoader.loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const grpcServer = new grpc.Server();
grpcServer.addService(userProto.UserService.service, {
  createUser: (call, callback) => {
    const { id, name, email } = call.request;
    users.set(id, { id, name, email });
    callback(null, { id, name, email });
  },
  getUser: (call, callback) => {
    const user = users.get(call.request.id);
    if (!user) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: 'User not found',
      });
    }
    callback(null, user);
  },
});

// Server startup
async function startServer() {
  // Start Apollo Server
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // Start REST Server
  app.listen(3000, () => {
    console.log('REST API running on http://localhost:3000');
    console.log('GraphQL running on http://localhost:3000/graphql');
  });

  // Start gRPC Server
  grpcServer.bindAsync(
    '0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error(error);
        return;
      }
      grpcServer.start();
      console.log('gRPC Server running on port 50051');
    }
  );
}

startServer().catch(console.error);