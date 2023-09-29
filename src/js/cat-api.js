import axios from "axios";

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common["x-api-key"] = 'live_gENyqxI4CKTup2rVYxuz2kdHYhpulfAjA9RU9PsgU0gFtQRExezYdbdcj24XVkhs';

function fetchBreeds() {
    return axios
        .get(`/breeds`)
        .then(response => response.data)
        .catch(error => { throw error });
};


function fetchCatByBreed(breedId) {
    return axios
        .get(`/images/search?breed_ids=${breedId}`)
        .then(response => response.data)
        .catch(error => { throw error });
};



export { fetchBreeds, fetchCatByBreed };