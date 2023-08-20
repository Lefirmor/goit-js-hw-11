export default fetchPictures;
// // const BASE_URL = `https://pixabay.com/api/q=cat`
// // const API_KEY = '33922902-bfae212e6daaaa40ab37292b2';

function fetchPictures(event) {
//   event.preventDefault() 
const URL = 'https://pixabay.com/api/'; // С большой буквы потому что знаем что в переменной наперед
const API_KEY = '33922902-bfae212e6daaaa40ab37292b2';

const params = new URLSearchParams({
    api_key: API_KEY,
    page: 1,
    q: searchQuery,
    image_type: photo,
    orientation: horizontal,
    safesearch: true
  });

  return fetch('${URL}?${params}').then(res => {
    if(!res.ok){
        throw new Error(res.statusText)
    }
    return res.json()
  });

}
fetchPictures("cat").then((res) => console.log(res))
.catch((err) => console.error(err))