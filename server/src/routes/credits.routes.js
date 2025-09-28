import { Router } from "express";

import { verifyJwt } from "../middlewares/auth.middleware.js";
import { getPlans, purchasePlans } from "../controllers/credit.controller.js";

const router=Router();

router.route("/get-plan").get(getPlans)
router.route("/purchase").post(verifyJwt,purchasePlans)


export default router