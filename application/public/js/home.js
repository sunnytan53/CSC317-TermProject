function setFadeOut(element) {
    setTimeout(() => {
        let opacity = 1.0;
        let timer = setInterval(() => {
            if (opacity <= 0) {
                clearInterval(timer);
                element.remove();
            }
            opacity -= 0.05;
            element.style.opacity = opacity;
        }, 70);
    }, 2000)
}
function executeSearch() {
    let searchTerm = document.getElementById('search-text').value;
    if (!searchTerm) {
        location.replace('/');
    } else {
        let searchURL = `/posts/search?search=${searchTerm}`;
        fetch(searchURL)
            .then((data) => data.json())
            .then((data_json) => {
                let newInnerHTML = '';
                data_json.results.forEach((row) => {
                    newInnerHTML += createCard(row);
                })

                let cardContent = document.getElementById('card-content');
                cardContent.innerHTML = newInnerHTML;

                if (data_json.message) {
                    addFlash(data_json.message);
                    console.log(data_json);
                }
            })
            .catch((err) => console.log(err))
    }
}

function createCard(data) {
    return `<div id="post-${data.id}" class="card">
    <img class="card-image" src="${data.thumbnail}" alt="Missing Image"/>
    <div class="card-body">
        <div class="card-title">${data.title}</div>
        <div class="card-description">${data.description}</div>
        <a href="/post/${data.id}" class="card-a">Post Details</a>
    </div></div>`;
}

function addFlash(message) {
    let flashMessageDiv = document.createElement('div');
    let innerFlashDiv = document.createElement('div');
    let innerTextNode = document.createTextNode(message);
    innerFlashDiv.appendChild(innerTextNode);
    flashMessageDiv.appendChild(innerFlashDiv);
    flashMessageDiv.setAttribute('id', 'flashmessage');
    innerFlashDiv.setAttribute('class', 'alert alert-success');
    document.getElementsByTagName('body')[0].appendChild(flashMessageDiv);;
    setFadeOut(flashMessageDiv);
}

let flashElement = document.getElementById('flashmessage');
if (flashElement) {
    setFadeOut(flashElement);
}

let searchButton = document.getElementById('search-button');
if (searchButton) {
    searchButton.onclick = executeSearch;
}