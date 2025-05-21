//GET /search - POST /search
import express from "express";
import fs from "fs/promises";

export const searchRoutes = express.Router();


searchRoutes.get("/search", async (req, res) => {
      const q = req.query.q?.toLowerCase();
      const data = JSON.parse(await fs.readFile("documents.json", "utf-8"));
    
      if (!q) {
        return res.json(data);
      }
    
      const result = data.filter((doc) =>
        Object.values(doc).some(
          (value) => typeof value === "string" && value.toLowerCase().includes(q)
        )
      );
    
      res.json(result);

});

searchRoutes.post("/search", async (req, res) => {
    const q = req.query.q;
    const fields = req.body.fields;
  
    if (q && fields) {
      return res.status(400).json({ error: "Cannot use both 'q' and 'fields'" });
    }
  
    const data = JSON.parse(await fs.readFile("documents.json", "utf-8"));
  
    if (q) {
      const qLower = q.toLowerCase();
      const result = data.filter((doc) =>
        Object.values(doc).some(
          (value) =>
            typeof value === "string" && value.toLowerCase().includes(qLower)
        )
      );
      return res.json(result);
    }
  
    if (fields) {
      const result = data.filter((doc) =>
        Object.entries(fields).every(([key, val]) => doc[key] === val)
      );
      return res.json(result);
    }
  
    res.json(data);
  });

