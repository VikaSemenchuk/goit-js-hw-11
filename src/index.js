import { fetchImages } from "./js/fetchImages";

const formEl = document.getElementById("search-form");
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

formEl.addEventListener('submit', onSubmit)

function onSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const value = form.elements.searchQuery.value.trim();

    fetchImages(value).then(({ hits }) => {
        if (hits.length === 0) throw new Error ('no data')
        console.log(hits);
    })
    .catch(onError)
    .finally(() => formEl.reset())
    console.log(value);

    
}
console.log(form);


function onError(err) {
    console.log(err);
}
// console.log(galleryEl);
// console.log(loadMoreBtn);

console.log(fetchImages);
fetchImages();