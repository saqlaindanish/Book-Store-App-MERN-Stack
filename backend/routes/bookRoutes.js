import express from "express";
import { Book } from "../models/booksModel.js";
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { title, aurthor, publishYear } = req.body
        if (!title || !aurthor || !publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: '
            })
        }
        const newBook = {
            title: req.body.title,
            aurthor: req.body.aurthor,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook)
        return res.status(201).send(book)
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

// Get all books from Database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            data: books
        })

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

// Get An Individual book from Database
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        return res.status(200).json(book)

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

// Update a book in Database
router.put('/:id', async (req, res) => {
    try {
        const { title, aurthor, publishYear } = req.body
        if (!title || !aurthor || !publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: '
            })
        }
        const { id } = req.params
        const result = await Book.findByIdAndUpdate(id, req.body)
        if (!result) {
            return res.status(404).send({ message: "Book not found" })
        }
        return res.status(200).send({ message: "Book updated successfully" })

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

// Delete a book from Database
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id)
        if (!book) {
            return res.status(404).send("Book dsn't exist!")
        }
        res.status(200).send('Book is deleted successfully')
    } catch (err) {
        console.log(err.message);
        res.send(500).send({ message: err.message })
    }
})

export default router