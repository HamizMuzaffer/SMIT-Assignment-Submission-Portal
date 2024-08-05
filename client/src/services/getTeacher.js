import axios from 'axios';

export default async function getTeachers() {
  try {
    const response = await axios.get('https://smit-server.vercel.app/teacher');
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    throw error;
  }
}
