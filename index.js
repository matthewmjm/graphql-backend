const express = require("express");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.hj6fb.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

const app = express();
const port = process.env.PORT || 4000;

mongoose
	.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB connected!! 🤘"))
	.catch((error) => console.error(error));

const typeDefs = `
	type Query {
		flowers: [Flower]
	}

	type Flower {
		_id: ID!
		kind: String!
		petals: Int
	}
`;

const FlowerSchema = new mongoose.Schema({
	kind: {
		type: String,
		required: true,
	},
	petals: Number,
});

const Flower = mongoose.model("Flower", FlowerSchema);

const resolvers = {
	Query: {
		flowers: () => [{ _id: 1, kind: "cool", petals: 100 }],
	},
};

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

app.listen(port, () => console.log(`listening on port ${port}`));
