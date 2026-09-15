import { ProductController } from "../controllers/productController.js";
import express from "express";
const router = express.Router();

router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.post("/", ProductController.create);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.remove);

export default router;
