import express from "express";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
// controllers
import {
  register,
  login,
  secret,
  updateProfile,
  
 
} from "../controllers/auth.js";

router.post("/register", register);
//to test swagger
// router.post("/register",(req, res)=>{
//     res.status(200).json({path:'/register', method:"Hello swagger shakil"})
// })
router.post("/login", login);
router.get("/auth-check", requireSignin, (req, res) => {
  res.json({ ok: true });
});
router.get("/admin-check", requireSignin, isAdmin, (req, res) => {
  res.json({ ok: true });
});

router.put("/profile", requireSignin, updateProfile);

// testing
router.get("/secret", requireSignin, isAdmin, secret);

// orders
//router.get("/orders", requireSignin, getOrders);
router.get("/all-orders", requireSignin, isAdmin);

export default router;