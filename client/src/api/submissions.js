import axios from "axios"

 export default async function getSubmissions(req,res){
const response = await axios.get('https://smit-server.vercel.app/student/assignment/submission')
return response.data;
}


