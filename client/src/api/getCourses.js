import axios from 'axios'
 export default async function getCourses(req,res){
try {
    const response = await axios.get('http://localhost:3000/teacher/course')
    const data = response.data
    return data
} catch (error) {
    console.log(error.message)
    throw error
}
}