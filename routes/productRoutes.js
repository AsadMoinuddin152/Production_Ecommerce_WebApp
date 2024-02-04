import express from "express";
import { isMerchant, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productCountController,
  productFiltersController,
  searchProductController,
  relatedProductController,
  productCategoryController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//Routes

//Create Products
router.post(
  "/create-product",
  requireSignIn,
  isMerchant,
  formidable(),
  createProductController
);

//update product
router.put(
  "/product/:pid",
  requireSignIn,
  isMerchant,
  formidable(),
  updateProductController
);

//Get Products
router.get("/get-products", getProductController);

//Get Single Product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//category product
router.get("/product-category/:slug", productCategoryController);

export default router;
