const Announcement = require("../models/announcement")

async function createAnnouncements(req, res) {
    const { title, content, teacherId, teacherName } = req.body;
    
    if (!teacherId) {
        return res.status(400).json({ message: "teacherId is required" });
    }
    
    const announcement = new Announcement({
        title,
        content,
        teacherId,
        teacherName
    });
    
    try {
        const createdAnnouncement = await announcement.save();
        res.status(200).json(createdAnnouncement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating announcement", error: error.message });
    }
}

async function getAllAnnouncements(req, res) {
    const announcements = await Announcement.find({})
    
    try {
        res.status(200).json(announcements)
    } catch (error) {
        console.error(error.message)
    }

}

async function getAnnouncementsById(req, res) {
    const id = req.params.id;
    try {
        const announcementsById = await Announcement.find({ teacherId: id })
        res.status(200).json(announcementsById)
    } catch (error) {
        console.log(error.message)
    }
}

async function updateAnnoucementById(req, res) {
    const { title, content } = req.body
    try {
        const updatedAssignment = await Announcement.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        )
        res.status(200).json(updatedAssignment)
    } catch (error) {

    }
}

async function deleteAnnouncemenById(req, res) {
    const deleteNote = await Announcement.findByIdAndDelete(req.params.id)

    try {
        res.status(200).json({ message: 'success' })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    createAnnouncements,
    getAllAnnouncements,
    getAnnouncementsById,
    updateAnnoucementById,
    deleteAnnouncemenById
}

