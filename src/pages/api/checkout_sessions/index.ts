import { NextApiRequest, NextApiResponse } from "next";

import { formatAmountForStripe } from "../../../utils/stripe";

import Stripe from "stripe";
import { env } from "../../../env/server.mjs";
import { product } from "@prisma/client";

const CURRENCY = "usd";
const MIN_AMOUNT = 10.0;
const MAX_AMOUNT = 5000.0;

const stripe = new Stripe(env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // const amount: number = req.body.amount;
    const items: product[] = req.body.items;
    console.log("kkk", items);
    const transformedItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      items?.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: Math.floor(item.price) * 100,
          product_data: {
            name: item.name,
            description: item.description || "No description",
            images: [item.image || ""],
          },
        },
        quantity: item.quantity,
      }));
    try {
      // Validate the amount that was passed from the client.
      // if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
      //   throw new Error("Invalid amount.");
      // }
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        mode: "payment",
        payment_method_types: ["card"],
        line_items: transformedItems,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/donate-with-checkout`,
      };

      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
