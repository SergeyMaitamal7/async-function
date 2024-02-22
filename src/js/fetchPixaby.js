import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '29175457-ea8e2c93dbfac842acac0bec2';

async function getData(query, per_page, page) {
  try {
    const response = await axios.get(
      `?key=${KEY}&q=${query}&per_page=${per_page}&page=${page}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export { getData };
