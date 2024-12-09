# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"id": "1", "name": "John", "email": "john@example.com"}'

# Get user
curl http://localhost:3000/api/users/1

# Create user
mutation {
  createUser(id: "1", name: "John", email: "john@example.com") {
    id
    name
    email
  }
}

# Get user
query {
  user(id: "1") {
    id
    name
    email
  }
}

const client = new userProto.UserService('localhost:50051', grpc.credentials.createInsecure());

// Create user
client.createUser({
  id: "1",
  name: "John",
  email: "john@example.com"
}, callback);

// Get user
client.getUser({ id: "1" }, callback);