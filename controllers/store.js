import { Router } from "express";
import db from "../models/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const stores = await db.Store.findAll({
    include: [{ model: db.Book, as: "books" }],
  });
  res.status(200).send(JSON.stringify(stores));
});

router.get("/:id", async (req, res) => {
  const store = await db.Store.findByPk(req.params.id, {
    include: [{ model: db.Book, as: "books" }],
  });
  res.status(200).send(JSON.stringify(store));
});

export default router;
