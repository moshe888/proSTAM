const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const Store = require('../models/store');


// // Get all authors
// router.get('/', async (req, res) => {
//   const authors = await Store.find();
//   res.json(authors);
// });

// // Create a new author
// router.post('/', async (req, res) => {
//   const author = new Author({
//       name: req.body.name,
//       image: req.body.image
//   });
//   try {
//     const newAuthor = await author.save();
//     res.status(201).json(newAuthor);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

module.exports = router;
