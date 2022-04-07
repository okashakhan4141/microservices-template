import express from "express";
import logger from "../logger/logger";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  req.session = null;

  logger.info("User Signout!");
  logger.error("Testing!");

  res.send({});
});

export { router as signoutRouter };
