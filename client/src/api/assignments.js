import axios from "axios"

 export default async function getAssignments(req,res){
const response = await axios.get('http://localhost:3000/teacher/assignment')
return response.data;
}


