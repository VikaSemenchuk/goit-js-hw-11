// export function fetchImages(quary) {
//     const ENDPOINT = `https://pixabay.com/api/`;

//     return fetch (`${ENDPOINT}?key=33731840-f6299e204f5104584f5709ced&q=${quary}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`)
//     .then(response => {
//         if (!response.ok) throw new Error(response.status)

//         return response.json();
//     })
//     // .then(({ hits }) => console.log(hits))
// }
'use strict';
import Notiflix from 'notiflix';

import axios from 'axios';

const ENDPOINT = `https://pixabay.com/api/`;
const API_KEY = `33731840-f6299e204f5104584f5709ced`;

export default class ImagesApiService {
  constructor() {
    this.page = 1;
    this.searchQuary = '';
  }

  getImages(searchQuary) {
    // const apiParameters = {
    //     parameters: {
    //         key: ImageApiService.API_KEY,
    //         q: this.searchQuary,
    //         image_type: 'photo',
    //         orientation: 'horizontal',
    //         safesearch: true,
    //         per_page: 40,
    //         page: this.page
    //     }
    // }

    const URL = `${ENDPOINT}?key=${API_KEY}&q=${this.searchQuary}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    return fetch(URL)
      .then(response => {
        if (!response.ok) {
          Notiflix.Notify.failure(`Oops, error ${response.status}`);
        }

        return response.json();
      })
      .then(({ hits }) => {
        this.nextPage();
        return hits;
      });
  }

  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
