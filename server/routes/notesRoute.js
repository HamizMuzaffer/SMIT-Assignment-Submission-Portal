const express = require("express")
const {getAllNotes, createNotes, updateNotesById, deleteNote, getNotesById} = require("../controllers/notes")
const router = express.Router()


router.get("/:id",getNotesById)
router.post('/',createNotes)
router.put("/:id",updateNotesById)
router.delete('/:id',deleteNote)

module.exports = router