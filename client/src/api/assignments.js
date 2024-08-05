import axios from "axios"

 export default async function getAssignments(req,res){
const response = await axios.get('https://smit-server.vercel.app/teacher/assignment')
return response.data;
}


