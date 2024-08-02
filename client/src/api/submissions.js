import axios from "axios"

 export default async function getSubmissions(req,res){
const response = await axios.get('http://localhost:3000/student/assignment/submission')
return response.data;
}


