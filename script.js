const container = document.getElementById('container');
const input = document.getElementById('searchInput')
// fetch("https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyBeMLtVPRb9KyCG_iFdbSQ2kDuJ3IPpHj4").then(res=>res.json()).then(render);
function render(json) {
    Object.keys(json.items).forEach(key => {
        const item = json.items[key];
        if (item.volumeInfo.title && item.volumeInfo.imageLinks && item.volumeInfo.description) {
            const card = document.createElement('div');
            card.className = 'container__card';

            const titleElement = document.createElement('h3');
            titleElement.textContent = item.volumeInfo.title;

            const imageElement = document.createElement('div');
            imageElement.className = 'container__card__img';
            const imageSrc = document.createElement('img');
            imageSrc.src = item.volumeInfo.imageLinks.thumbnail; 
            imageSrc.alt = 'img'; 
            imageElement.appendChild(imageSrc);

            const descriptionElement = document.createElement('p');
            descriptionElement.className = 'container__card__description';
            descriptionElement.textContent = item.volumeInfo.description; 

            card.appendChild(titleElement);
            card.appendChild(imageElement);
            card.appendChild(descriptionElement);
            container.appendChild(card);
        }
        // console.log(item);
    })
}
function search(event) {
    event.preventDefault();
    container.innerHTML="";
    if (input.value) {
        // console.log(input.value);
        // console.log('fetching');
        var uri = `https://www.googleapis.com/books/v1/volumes?q=${input.value.replace(/ /g, "_")}&maxResults=20`;
        console.log("uri: ", uri);
        fetch(uri, {method: 'GET', cache: 'no-store',}).then(res=>res.json()).then(render);
    }
}
