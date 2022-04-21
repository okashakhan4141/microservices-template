import express from "express";

const router = express.Router();

router.get("/api/bill/payments/categories", async (req, res) => {

  res.status(200).send({
    Electricity: [],
    Gas: [],
    Water: ["National Water Commision", "Company Without Logo"],
    Internet: [],
    Telephone: [],
    'Credit Card' : []
  });
});

export { router as CategoriesRouter };