import express from "express";
import searchRoutes from "./routes/searchRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

// Support parsing JSON requests
app.use(express.json());

app.use("/", searchRoutes);

app.use("/", documentRoutes);

app.get("/", (req, res) => {
  res.send("This is a search engine");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
