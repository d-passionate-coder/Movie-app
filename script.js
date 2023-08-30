const API_KEY = '&api_key=3fd2be6f0c70a2a598f084ddfb75487c';
const BASE_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?query=';

const main = document.querySelector('main');
const form = document.querySelector('form');
const search = document.querySelector('.search');

getMovies(BASE_URL + API_KEY);

async function getMovies(url) {
    const data = await fetch(url);
    const res = await data.json();
    showMovies(res.results);
}

function showMovies(result) {

    main.innerHTML = '';

    result.forEach(movie => {
        const { title, poster_path, overview, vote_average } = movie;
        const movEl = document.createElement('div');
        movEl.classList.add('movie');
        movEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${parseFloat(vote_average).toFixed(1)}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        `
        main.appendChild(movEl);
    })
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', e => {
    e.preventDefault()
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm + API_KEY)

        search.value = ''
    } else {
        window.location.reload()
    }

})


