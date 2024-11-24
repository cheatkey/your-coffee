import express, { Request } from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";
import { root } from "./resolvers";
import cors from "cors";
import { authenticate } from "./middleware";
import https from "https";

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

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

const SELF_PING_INTERVAL = 14 * 60 * 1000;
const SERVER_URL = `${process.env.SERVER_URL}/health` as string;

setInterval(() => {
  https
    .get(SERVER_URL, (res) => {
      console.log(`Self-ping successful. Status code: ${res.statusCode}`);
    })
    .on("error", (err) => {
      console.error("Self-ping failed:", err.message);
    });
}, SELF_PING_INTERVAL);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
