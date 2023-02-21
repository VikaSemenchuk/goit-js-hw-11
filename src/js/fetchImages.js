export function fetchImages() {
    const ENDPOINT = `https://pixabay.com/api/`;

    return fetch (`${ENDPOINT}?key=33731840-f6299e204f5104584f5709ced&q&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(response => {
        if (!response.ok) throw new Error(response.status)

        return response.json();
    });
}