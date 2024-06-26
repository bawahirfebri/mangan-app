import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import { createErrorMessageTemplate, createLoadingIndicatorTemplate, createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <section class='content'>
        <h1 class='content__label'>Explore Restaurant</h1>
        <div class='posts' id='posts'>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restaurantsContainer = document.querySelector('#posts');

    try {
      restaurantsContainer.innerHTML = createLoadingIndicatorTemplate();

      const restaurants = await TheRestaurantDbSource.restaurantList();
      restaurantsContainer.innerHTML = '';

      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } catch (error) {
      restaurantsContainer.innerHTML = '';
      restaurantsContainer.innerHTML += createErrorMessageTemplate();

      const errorMessage = document.querySelector('#error-indicator__message');
      errorMessage.innerText = 'Failed to fetch restaurant data. Please try again later.';

      console.error('Error fetching restaurant data:', error);
    }

    const header = document.querySelector('#header');
    header.classList.remove('detail-header');

    const hero = document.querySelector('#hero');
    hero.classList.remove('detail-hero');
  },
};

export default Home;
