import { Router } from "express";
import db from "../models/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const books = await db.Book.findAll({
    include: [{ model: db.Author, as: 'author' }]
  });
  res.status(200).send(JSON.stringify(books));
});

router.post("/", async (req, res) => {
  console.log("🚀 ~ router.post ~ req.params.authorId:", req.body);
//   const author = await db.Author.findByPk(req.body.authorId, { include: [{ model: db.Book, as: 'books' }] });
//   if (!author) {
//     res.status(404).send("Author not found");
//     return;
//   }
  const book = db.Book.build({ ...req.body }, { include: [{model: db.Author, as: 'author'}] });
  await book.save();
  res.send(JSON.stringify(book)).status(201);
});

export default router;
