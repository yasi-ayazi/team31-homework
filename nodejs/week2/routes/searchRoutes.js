//GET /search - POST /search
import express from "express";
import { getSearch, postSearch } from "../controllers/searchController.js";

const router = express.Router();

router.get("/search", getSearch);
router.post("/search", postSearch);

export default router;
