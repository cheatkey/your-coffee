import express, { Request } from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";
import { root } from "./resolvers";
import cors from "cors";
import { authenticate } from "./middleware";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
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
