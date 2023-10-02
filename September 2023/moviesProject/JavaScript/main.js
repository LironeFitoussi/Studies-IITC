let chosenFilter = "day";
let favArr = new Array();
const currentPage = 1

// Navbar Loader Module
import getNavBar from "./modules/navBar.js";
getNavBar(currentPage)

// Footer Loader Module
import getFooter from "./modules/loadFooter.js";
getFooter()

if (localStorage.userFavMovies) {
    console.log(favArr);
    favArr = JSON.parse(localStorage.userFavMovies)
}

function fetchMovies(time = "day") {
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://api.themoviedb.org/3/trending/movie/${time}?language=en-US&page=1`,
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjVmZTcyZGYwODg4MzgyZTQxNDhlMjFmNThjNzBiOCIsInN1YiI6IjY1MTVjNWQ0ZDQ2NTM3MDBjNjdiMmMxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2huECgDm-vl-quAM-E50mrdEymLQO4yHgmgrdfRa3vI",
    },
  };

  $.ajax(settings).done(function (data) {
    console.log(data);
    //! Header
    const moviesArr = data.results;
    const tenTopMovies = [];

    for (let i = 0; i < 10; i++) {
      tenTopMovies.push(moviesArr[i]);
    }

    const genrePromise = fetchMovieGenres();

    let slideCount = 1;
    $("#rightSlide").click(function autoSlideRight() {
      console.log(slideCount);
      if (slideCount == 10) {
        slideCount = 1;
      }
      $(`#topMovies_${++slideCount}`)[0].scrollIntoView({ behavior: "smooth" });
    });

    $("#leftSlide").click(() => {
      if (slideCount == 1) {
        slideCount = 11;
      }
      --slideCount;
      $(`#topMovies_${slideCount}`)[0].scrollIntoView({ behavior: "smooth" });
    });

    tenTopMovies.forEach((movie, index) => {
      const movieDate = new Date(movie.release_date);
      const newDiv = $("<div>");
      const movieContent = $("<div>");
      const movieTitle = movie.title;
      newDiv.addClass("topMovies");
      newDiv.attr("id", `topMovies_${index + 1}`);
      movieContent.addClass("movieContent");

      // Genre Promise
      genrePromise.then((genres) => {
        const genre = genres.find((genre) => genre.id === movie.genre_ids[0]);
        if (genre) {
          movieContent.find(".yearAndGenre span:last-child").text(genre.name);
        }

        if (movieTitle.length > 18) {
          movieContent.find("h1").addClass("longTitle");
        }
      });

      movieContent.append(`
            <h1>${movieTitle}</h1>
            <div class="yearAndGenre">
                <span>${movieDate.getFullYear()}</span>
                <i class="fa-solid fa-circle" style="color: #ffffff;"></i>
                <span></span>
            </div>
            <p>${movie.overview}</p>
        `);

      newDiv.css(
        "background-image",
        `url(http://image.tmdb.org/t/p/original${movie.backdrop_path})`
      );
      newDiv.append(movieContent);
      $(".moviesSlider").append(newDiv);

      //? setInterval(() => {
      //?    if (slideCount == 10) {
      //?         slideCount = 1
      //?     }
      //?     $(`#topMovies_${++slideCount}`)[0].scrollIntoView({behavior: 'smooth'});
      //? }, 5000);
    });

    //! Main
    nextPage(1, chosenFilter, favArr);

    //! Pagination
    console.log(data);
    const paginationElem = $("<div>");
    paginationElem.addClass("pagination");
    for (let i = 1; i <= 5; i++) {
      const newPageBtn = $("<a>");
      newPageBtn.addClass("pageBtn");
      newPageBtn.text(i);
      newPageBtn.attr("value", i);
      paginationElem.append(newPageBtn);
    }
    const lastPage = $("<a>");
    lastPage.text(250);
    lastPage.attr("value", 6);
    lastPage.addClass("pageBtn");
    paginationElem.append(lastPage);

    $("main").append(paginationElem);
    $(paginationElem).insertAfter("main");

    const pageBtnArr = document.querySelectorAll(".pageBtn");
    pageBtnArr[0].classList.add("active");

    //! Pagination Listener
    pageBtnArr.forEach((page) => {
      page.addEventListener("click", () => {
        pageBtnArr[clickedBtn - 1].classList.remove("active");
        clickedBtn = page.getAttribute("value");
        page.classList.add("active");
        nextPage(page.innerText, chosenFilter, favArr);
      });
    });

    $("#chooseFilter").on("submit", (e) => {
      e.preventDefault();
      chosenFilter = $("#timeFilter").val();
      pageBtnArr[clickedBtn - 1].classList.remove("active");
      clickedBtn = 1;
      pageBtnArr[0].classList.add("active");
      nextPage(1, chosenFilter, favArr);
    });
  });
}

function fetchMovieGenres() {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=df5fe72df0888382e4148e21f58c70b8"
  )
    .then((response) => response.json())
    .then((data) => data.genres)
    .catch((err) => {
      console.error(err);
      return [];
    });
}

let clickedBtn = 1;

import nextPage from "./modules/nextPage.js";

fetchMovies(chosenFilter);
