import dotenv from "dotenv";
dotenv.config();

import express from "express";
import knex from "knex";

const app = express();
const port = process.env.PORT || 3000;

const knexInstance = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "my-secret-pw",
    database: process.env.DB_NAME || "hyf_nodejs_week3",
    multipleStatements: true,
  },
});

app.use(express.json());

const apiRouter = express.Router();
app.use("/api", apiRouter);

const contactsAPIRouter = express.Router();
apiRouter.use("/contacts", contactsAPIRouter);

contactsAPIRouter.get("/", async (req, res) => {
  let query = knexInstance.select("*").from("contacts");

  if (req.query.sort) {
    const [column, direction] = req.query.sort.toLowerCase().split(" ");

    const allowedColumns = ["id", "first_name", "last_name", "email", "phone"];
    const allowedDirections = ["asc", "desc"];

    if (
      allowedColumns.includes(column) &&
      allowedDirections.includes(direction)
    ) {
      query = query.orderBy(column, direction);
    } else {
      return res.status(400).json({ error: "Invalid sort parameter" });
    }
  }

  console.log("SQL", query.toSQL().sql);

  try {
    const data = await query;
    res.json({ data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
