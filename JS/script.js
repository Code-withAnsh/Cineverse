
let theme = document.querySelector(".ri-moon-line");
let body = document.querySelector("body");
let searching = document.querySelector("#searching");
let searchBox = document.querySelector(".search-box");
let trending = document.querySelector("#trending");
let moviecards = document.querySelector(".movie-cards");
let img = document.querySelector(".cards img");
let categories = document.querySelectorAll(".showcat");
let trend = document.querySelector("#trend");
let detail = document.querySelector(".movie-detail");
let page1 = document.querySelector("#page1");
let page2 = document.querySelector("#page2");
let footContainer = document.querySelector(".foot-container");
let footer = document.querySelector("#footer");

theme.addEventListener("click", function () {
  body.classList.toggle("light");
});
searching.addEventListener("click", (event) => {
  event.preventDefault();
  if (searchBox.value.trim() === "") {
    alert("please enter the movie name");
    return;
  }
});
//ab mai ek fn me ye card banne ka prakriya daal de rha jis se dikkkat na ho
function getCard(data) {
  moviecards.innerHTML = "";
  for (let i = 0; i < data.results.length; i++) {
    let movie = data.results[i];

    let card = document.createElement("div");
    card.className = "cards";
    moviecards.appendChild(card);
    let posterImg = document.createElement("img");
    posterImg.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    let cardInfo = document.createElement("div");
    cardInfo.className = "card-info";
    let movieName = document.createElement("h3");
    movieName.className = "movie-name";
    movieName.innerText = movie.original_title;
    // console.log(movieName);
    cardInfo.appendChild(movieName);
    let movieMeta = document.createElement("p");
    movieMeta.className = "movie-meta";
    movieMeta.innerHTML = `
  ⭐️ ${movie.vote_average} &nbsp; • &nbsp; ${movie.release_date.split("-")[0]}
`;
    cardInfo.appendChild(movieMeta);

    let dot = document.createElement("span");

    card.appendChild(posterImg);
    card.appendChild(cardInfo);

    //ye neeche ka code mai fn me isliye likha kyunki card per click hone per landing page gayab ho
    //aur card naam ka div fn ke loop me bana hai toh yhi karna hoga iska kaam tamam
card.addEventListener("click", function (e) {
  e.preventDefault();
  fetch(
    `https://api.themoviedb.org/3/movie/${movie.id}?api_key=de1423f6e627f88b3373117e462d557e`,
  )
    .then((raw) => raw.json())
    .then((info) => {
      console.log(info);
      
  opemMovieDetail(movie,info)
    })
    .catch((err) => {
      alert("API is not working");
      
    });
});
  }
}
document.addEventListener("DOMContentLoaded", function () {
  fetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=de1423f6e627f88b3373117e462d557e",
  )
    .then((raw) => raw.json())
    .then((data) => {
      getCard(data);
    })
    .catch((err) => {
      console.error(err);
    });
});
function getMovies(url) {
  fetch(url)
    .then((raw) => raw.json())
    .then((data) => {
      getCard(data);
    })
    .catch((err) => {
      console.error(err);
      
    });
}
for (let i = 0; i < categories.length; i++) {
  categories[i].addEventListener("click", (e) => {
    e.preventDefault();
    let category = categories[i].innerText;
    if (category === "Action") {
      getMovies(
        "https://api.themoviedb.org/3/discover/movie?api_key=de1423f6e627f88b3373117e462d557e&with_genres=28",
      );
      trend.innerText = " Action Movies";
    }
    if (category === "Sci-Fi") {
      getMovies(
        "https://api.themoviedb.org/3/discover/movie?api_key=de1423f6e627f88b3373117e462d557e&with_genres=878",
      );
      trend.innerText = "🔭 Sci-Fi Movies";
    }
    if (category === "Marvel") {
      getMovies(
        "https://api.themoviedb.org/3/discover/movie?api_key=de1423f6e627f88b3373117e462d557e&with_companies=420",
      );
      trend.innerText = "🤖 Marvel Movies";
    }
    if (category === "DC") {
      getMovies(
        "https://api.themoviedb.org/3/discover/movie?api_key=de1423f6e627f88b3373117e462d557e&with_companies=9993",
      );
      trend.innerText = "DC Movies";
    }
    if (category === "Animation") {
      getMovies(
        "https://api.themoviedb.org/3/discover/movie?api_key=de1423f6e627f88b3373117e462d557e&with_genres=16",
      );
      trend.innerText = "Animation Movies";
    }
    if (category === "Oscar-winners") {
      getMovies();
      trend.innerText = "🏆 Oscar-Winner Movies";
    }
    if (category === "🔥Trending") {
      getMovies(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=de1423f6e627f88b3373117e462d557e",
      );
    }
  });
}

function opemMovieDetail(movie,info) {
   page1.style.display = "none";
   page2.style.display = "none";
   footContainer.style.display = "none";
   footer.style.display = "none";
   detail.style.display = "flex";
   //  alert("clicked");
  //  alert(movie.original_title);
  let detailCard = document.createElement("div");
  detailCard.className = "detail-card";
 let posterImg = document.createElement("img");
 posterImg.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
 let cardInfo = document.createElement("div");
 cardInfo.className = "card-info";
 let movieName = document.createElement("h3");
 movieName.className = "movie-name";
 movieName.innerText = movie.original_title;
  cardInfo.appendChild(movieName);
  let movieMeta = document.createElement("p");
  movieMeta.className = "movie-meta";
  movieMeta.innerHTML = `
  ⭐️ ${movie.vote_average} &nbsp; • &nbsp; ${movie.release_date.split("-")[0]}
`;
  cardInfo.appendChild(movieMeta);
    detailCard.appendChild(posterImg);
  detailCard.appendChild(cardInfo)
  detail.appendChild(detailCard)
//       body.style.background = `radial-gradient(circle at top,
// #E4FD97,
// transparent 40%),
// radial-gradient(circle at bottom right,
// #2D3E2C,
// transparent 30%) #09090b;`
let movieContent = document.createElement('div')
movieContent.className = 'movie-content'
detail.appendChild(movieContent)
let Title = document.createElement('h2')
Title.className = 'Title'
Title.innerText = movie.original_title
movieContent.appendChild(Title)
let movieContentMeta = document.createElement("p");
movieContentMeta.className = "movieContent-meta";
const runtime = info.runtime >= 60
  ? `${Math.floor(info.runtime / 60)}h ${info.runtime % 60}m`
  : `${info.runtime}m`;
  let lang = info.spoken_languages
  console.log(lang);
  
  
movieContentMeta.innerHTML = `
  ⭐️ ${movie.vote_average} &nbsp; • &nbsp; ${movie.release_date.split("-")[0]} &nbsp; &nbsp; ${runtime} &nbsp; &nbsp ${originalLang}
`;
movieContent.appendChild(movieContentMeta)
}