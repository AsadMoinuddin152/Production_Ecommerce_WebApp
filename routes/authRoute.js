import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";
import { isMerchant, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//Protected Merchant route
router.get("/merchant-auth", requireSignIn, isMerchant, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
