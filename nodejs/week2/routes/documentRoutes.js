//GET /documents/:id

import express from "express";
import { getDocumentById } from "../controllers/documentController.js";

const router = express.Router();

router.get("/documents/:id", getDocumentById);

export default router;
