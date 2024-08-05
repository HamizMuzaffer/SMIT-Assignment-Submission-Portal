import axios from 'axios'

export default async function getAllStudents(){
    try {
        const response = await axios.get('https://smit-server.vercel.app/student/')
        const data = response.data
        return data;
    } catch (error) {
        console.log(error.message)
        throw error
    }
}