import express, { Request } from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";
import { root } from "./resolvers";
import cors from "cors";
import { authenticate } from "./middleware";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://your-coffee-frontend.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy does not allow access from ${origin}`));
      }
    },
    credentials: true,
  })
);

app.use(authenticate);

app.use(
  "/graphql",
  graphqlHTTP((_req, res) => {
    const req = _req as Request;

    return {
      schema,
      rootValue: root,
      graphiql: true,
      context: { user: req.user },
    };
  })
);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
