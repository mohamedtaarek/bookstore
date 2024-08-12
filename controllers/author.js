import { Router } from "express";
import db from "../models/index.js";
const router = Router();

router.get("/", async (req, res) => {
  const authors = await db.Author.findAll();
  res.status(200).send(JSON.stringify(authors));
});

router.get("/:id", async (req, res) => {
  const author = await db.Author.findByPk(req.params.id, {
    include: [{ model: db.Book, as: "books" }],
  });
  res.status(200).send(JSON.stringify(author));
});

router.get("/:id/cheapest-books", async (req, res) => {
  const storeBooks = await db.store_book.findAll({ where: { "book.author.id": req.params.id } , include: [{ model: db.Book, as: "book" }, { model: db.Store, as: "store" }]});
  const cheapestBooks = author.books.sort((a, b) => a.price - b.price);
  res.status(200).send(JSON.stringify(cheapestBooks));
});

router.post("/", async (req, res) => {
  const author = db.Author.build({ ...req.body });
  await author.save();
  res.send(JSON.stringify(author)).status(201);
});

router.put("/:id", async (req, res) => {
  const author = await db.Author.findByPk(req.params.id);
  author.update(req.body);
  res.send(JSON.stringify(author)).status(200);
});
export default router;
