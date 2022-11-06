import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';

export const fetchImagesWithQuery = async searchQuery => {
    const response = axios.get('/search?query={searchQuery}');
    return response.data.hits;
};

export default {
    fetchImagesWithQuery,
}

