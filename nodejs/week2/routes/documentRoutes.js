//GET /documents/:id
import fs from "fs/promises";
import express from "express";

export const documentRoutes = express.Router();

documentRoutes.get("/documents/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const data = JSON.parse(await fs.readFile("documents.json", "utf-8"));

    const doc = data.find((doc) => doc.id === id);
    if (!doc) {
        return res.status(404).send("Document not found");
    }

    res.json(doc);
});
