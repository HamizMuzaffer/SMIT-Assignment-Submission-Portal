import axios from 'axios'
 export default async function getCourses(req,res){
try {
    const response = await axios.get('https://smit-server.vercel.app/teacher/course')
    const data = response.data
    return data
} catch (error) {
    console.log(error.message)
    throw error
}
}