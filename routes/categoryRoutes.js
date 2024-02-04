import express from "express";
import { isMerchant, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//Routes
//create category
router.post(
  "/create-category",
  requireSignIn,
  isMerchant,
  createCategoryController
);

//Update Category
router.put(
  "/update-category/:id",
  requireSignIn,
  isMerchant,
  updateCategoryController
);

//Get All Categories
router.get("/get-category", categoryController);

//Get Single Category
router.get("/single-category/:slug", singleCategoryController);

//Delete Category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isMerchant,
  deleteCategoryController
);

export default router;
