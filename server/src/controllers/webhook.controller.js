import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

import { ApiResponse } from "../utils/ApiResponse.js";
import Stripe from "stripe";
import { Transaction } from "../models/transaction.model.js";
import { User } from "../models/users.model.js";

const stripeWebhooks = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    throw new ApiError(400, error.message || "Webhook error");
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        const sessionList = await stripe.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        });
        const session = sessionList.data[0];
        if (!session) {
          throw new ApiError(400, "No checkout session found for payment");
        }
        const { transactionId, appId } = session.metadata;

        if (appId == "mygpt") {
          const transaction = await Transaction.findOne({
            _id: transactionId,
            isPaid: false,
          });
          if (!transaction) {
            throw new ApiError(404, "Transaction not found or already paid");
          }

          // update credit in User account
          await User.updateOne(
            { _id: transaction.userId },
            { $inc: { credits: transaction.credits } }
          );

          // Update credits payment status
          transaction.isPaid = true;
          await transaction.save();
        } else {
          throw new ApiError(400, "Ignored event: Invalid app");
        }
        break;
      }

      default:
        console.log("Unhandled Event Type", event.type);

        break;
    }

    res.status(200).json(new ApiResponse(200, { received: true }));
  } catch (error) {
    console.log("WEbhook processing error");

    res
      .status(200)
      .json(new ApiResponse(200, { received: true, error: error.message }));
  }
});

export { stripeWebhooks };
