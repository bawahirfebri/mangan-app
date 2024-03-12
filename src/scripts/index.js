import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";
import "../styles/responsive.css";
import DATA from "../public/data/DATA.json";

const menu = document.querySelector("#menu");
const hero = document.querySelector(".hero");
const main = document.querySelector("main");
const search = document.querySelector(".search")
const drawer = document.querySelector("#drawer");

menu.addEventListener("click", function (event) {
  drawer.classList.toggle("open");
  search.classList.toggle("open");
  hero.classList.toggle("open__hero");
  event.stopPropagation();
});

hero.addEventListener("click", function () {
  drawer.classList.remove("open");
  search.classList.remove("open");
  hero.classList.remove("open__hero");
});

main.addEventListener("click", function () {
  drawer.classList.remove("open");
  search.classList.remove("open");
  hero.classList.remove("open__hero");
});

const renderPost = (data) => {
  return `
    <article class="post-item">
      <img 
        class="post-item__thumbnail"
        src=${data.pictureId} 
        alt=${data.name}
      >
      <p class="post-item__city">
        ${data.city}
      </p>
      <div class="post-item__content">
        <div class="post-item__content-top">
          <h1 class="post-item__title">
            <a href="#">${data.name}</a>
          </h1>
          <p class="post-item__rating">
            &starf; ${data.rating}
          </p>
        </div>
        <p class="post-item__description">
          ${data.description}
        </p>
      </div>
    </article>
  `;
};

const posts = document.querySelector(".posts");
const headerTiitle = document.querySelector(".header__title");
const searchInput = document.querySelector(".search__input");
const searchButton = document.querySelector(".search__button");

posts.innerHTML = ``;
DATA.restaurants.map((restaurant) => {
  posts.innerHTML += renderPost(restaurant);
});

headerTiitle.addEventListener("click", function () {
  posts.innerHTML = ``;
  DATA.restaurants.map((restaurant) => {
    posts.innerHTML += renderPost(restaurant);
    searchInput.value = ''
  });
});

searchInput.addEventListener("change", function (event) {
  const filteredData = DATA.restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(event.target.value.toLowerCase()));

  posts.innerHTML = ``;
  filteredData.map((restaurant) => {
    posts.innerHTML += renderPost(restaurant);
  });
});

searchButton.addEventListener("click", function (event) {
  const filteredData = DATA.restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(searchInput.value.toLowerCase()));

  posts.innerHTML = ``;
  filteredData.map((restaurant) => {
    posts.innerHTML += renderPost(restaurant);
  });
});


import TheRestaurantDbSource from "./data/therestaurantdb-source";
import CONFIG from "./globals/config";
async function test() {
  const rest = await TheRestaurantDbSource.restaurantList()
  console.log(rest)
}

test()