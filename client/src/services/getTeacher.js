import axios from 'axios';

export default async function getTeachers() {
  try {
    const response = await axios.get('http://localhost:3000/teacher'); // Corrected URL
    const data = response.data; // Access the data from the response
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    throw error; // Optionally rethrow the error to be handled by the caller
  }
}
