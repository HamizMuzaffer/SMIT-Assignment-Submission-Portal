const Notes = require("../models/notes");

async function getAllNotes(req,res){
 const notes = await Notes.find({})
try {
     res.status(200).json(notes)
} catch (error) {
    console.log(error.message)
}

}
async function getNotesById(req,res){
    const id = req.params.id
    const notesById = await Notes.findOne({userId : id})
    try {
        res.status(200).json(notesById)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
  
}

async function updateNotesById(req,res){
    const {title , content} = req.body
    try {
        const updatedNote = await Notes.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        )

        res.status(200).json(updatedNote)
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
    
    
}

async function createNotes(req,res){
    const body = req.body
    const note = new Notes(body)

    try {
        const createdNote = await note.save()
        res.status(200).json(createdNote)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

async function deleteNote(req,res){
    try {
        const deleteNote = await Notes.findByIdAndDelete(req.params.id);
        res.status(200).json({msg: 'success'})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports = {
getAllNotes,
getNotesById,
updateNotesById,
deleteNote,
createNotes
}

