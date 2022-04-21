import express from "express";

const router = express.Router();

router.get("/api/rewards", async (req, res) => {

  res.send({});
});

export { router as getRewardsRouter };