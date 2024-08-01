import axios from 'axios';

export default async function getTeachers() {
  try {
    const response = await axios.get('http://localhost:3000/teacher');
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    throw error;
  }
}
