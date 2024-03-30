import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createErrorMessageTemplate, createLoadingIndicatorTemplate, createRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
      <section class='content'>
        <h1 class='content__label'>Favorite Restaurant</h1>
        <div class='posts' id='posts'></div>
      </section>
    `;
  },

  async afterRender() {
    const restaurantsContainer = document.querySelector('#posts');

    try {
      restaurantsContainer.innerHTML = createLoadingIndicatorTemplate();

      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      restaurantsContainer.innerHTML = '';
      if (restaurants.length !== 0) {
        restaurants.forEach((restaurant) => {
          restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        });
      } else {
        restaurantsContainer.innerHTML += createErrorMessageTemplate();

        const errorMessage = document.querySelector('#error-indicator__message');
        errorMessage.innerText = 'Your favorite restaurant is empty.';
      }
    } catch (error) {
      restaurantsContainer.innerHTML = '';
      restaurantsContainer.innerHTML += createErrorMessageTemplate();

      const errorMessage = document.querySelector('#error-indicator__message');
      errorMessage.innerText = 'Failed to fetch favorite restaurant data. Please try again later.';

      console.error('Error fetching restaurant data:', error);
    }

    const header = document.querySelector('#header');
    header.classList.remove('detail-header');

    const hero = document.querySelector('#hero');
    hero.classList.remove('detail-hero');
  },
};

export default Favorite;
