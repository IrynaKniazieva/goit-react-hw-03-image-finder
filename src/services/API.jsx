// import axios from "axios";

// axios.defaults.baseURL = 'https://pixabay.com/api/'
// // const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '30111831-2eef1cdbdbde188a842c8e9ba';

// export const fetchImagesWithQuery = async (searchQuery, page) => {
//     const { data } = await axios.get(`?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
//     return data 
// };

import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30111831-2eef1cdbdbde188a842c8e9ba';

export const fetchImagesWithQuery = async searchQuery => {
  const responce = await axios.get(BASE_URL, {
    params: {
      q: searchQuery,
      page: '1',
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: '12',
    },
  });
  return responce;
};



