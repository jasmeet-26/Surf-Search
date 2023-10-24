const accessKey = "X-8c-L1vy8hm4ism_zkQWBtk2Oyl73u0zHbpfB-phnE";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const modeToggle = document.getElementById("modeToggle");
const stylesheet = document.getElementById("stylesheet");
const waveFont = new FontFace('THE WAVE', 'url(font/ThewaveRegular-OVOe8.ttf)');

let keyword = "";
let page = 1;

async function searchImage(){
    keyword = searchBox.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=15`;

    const response = await fetch(url);
    const data = await response.json();

    if(page === 1){
        searchResult.innerHTML = "";
    }

    const result = data.results;

    result.map((result) =>{
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })

    showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    page = 1;
    searchImage();
})

showMoreBtn.addEventListener("click",()=>{
    page++;
    searchImage();
})

modeToggle.addEventListener("change", function () {
    if (modeToggle.checked) {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
    }
});

function togglePlaceholder() {
    if (searchBox.placeholder === 'Ride the wave of search...') {
        searchBox.placeholder = 'Search anything here...';
    } else {
        searchBox.placeholder = 'Ride the wave of search...';
    }
}setInterval(togglePlaceholder, 2750);

waveFont.load().then((font) => {
    document.fonts.add(font);
    document.body.style.fontFamily = 'THE WAVE, Arial, sans-serif';
});
