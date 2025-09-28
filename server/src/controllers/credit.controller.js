import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Transaction } from "../models/transaction.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import Stripe from "stripe";

const plans = [
  {
    _id: "basic",
    name: "Basic",
    price: 10,
    credits: 100,
    features: [
      "100 text generations",
      "50 image generations",
      "Standard support",
      "Access to basic model",
    ],
  },
  {
    _id: "pro",
    name: "Pro",
    price: 20,
    credits: 500,
    features: [
      "500 text generations",
      "200 image generations",
      "Priority support",
      "Access to pro models",
      "Faster response time",
    ],
  },
  {
    _id: "premium",
    name: "Premium",
    price: 30,
    credits: 1000,
    features: [
      "1000 text generations",
      "500 image generations",
      "24/7 VIP support",
      "Access premium models",
      "Dedicated account manager",
    ],
  },
];

//? step 1 get all plans
const getPlans = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, plans));
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//? step 2 controller for purchasing plans
const purchasePlans = asyncHandler(async (req, res) => {
  try {
    const { planId } = req.body;
    if (!planId) throw new ApiError(400, "planId is required");
    const userId = req.user._id;
    const plan = plans.find((plan) => plan._id == planId);
    if (!plan) {
      throw new ApiError(400, "Invalid plan");
    }

    // create new transaction
    const transaction = await Transaction.create({
      userId: userId,
      planId: plan._id,
      amount: plan.price,
      credits: plan.credits,
      isPaid: false,
    });

    const { origin } = req.headers;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: plan.price * 100,
            product_data: {
              name: plan.name,
            },
          },

          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/loading`,
      cancel_url: `${origin}`,
      metadata: { transactionId: transaction._id.toString(), appId: "mygpt" },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // Expires in 30 minuires
    });
    return res
      .status(200)
      .json(new ApiResponse(200, { url: session.url }, "Payment successfull"));
  } catch (error) {
    throw new ApiError(500, error.message || "payment failed");
  }
});
export { getPlans, purchasePlans };
