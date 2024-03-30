import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import ReviewInitiator from '../../utils/review-initiator';
import { createRestaurantDetailTemplate, createLoadingIndicatorDetailTemplate, createErrorMessageDetailTemplate } from '../templates/template-creator';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    return `
      <div id='restaurant' class='restaurant'>
      </div>
      <div id='likeButtonContainer'></div>
    `;
  },

  async afterRender() {
    const restaurantContainer = document.querySelector('#restaurant');

    try {
      restaurantContainer.innerHTML = createLoadingIndicatorDetailTemplate();

      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurant = await TheRestaurantDbSource.detailRestaurant(url.id);
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: restaurant.id,
          pictureId: restaurant.pictureId,
          name: restaurant.name,
          rating: restaurant.rating,
          address: restaurant.address,
          city: restaurant.city,
          description: restaurant.description,
          menus: restaurant.menus,
          customerReviews: restaurant.customerReviews,
        },
        favoriteRestaurants: FavoriteRestaurantIdb,
      });

      ReviewInitiator.init({
        id: restaurant.id,
        formContainer: document.querySelector('#review__form'),
        nameContainer: document.querySelector('#name'),
        reviewContainer: document.querySelector('#review'),
      });

      const restaurantFoods = document.querySelector('#restaurant__foods');
      restaurant.menus.foods.forEach((food) => {
        restaurantFoods.innerHTML += `<li>${food.name}</li>`;
      });

      const restaurantDrinks = document.querySelector('#restaurant__drinks');
      restaurant.menus.drinks.forEach((drink) => {
        restaurantDrinks.innerHTML += `<li>${drink.name}</li>`;
      });
    } catch (error) {
      restaurantContainer.innerHTML = createErrorMessageDetailTemplate();

      const errorMessage = document.querySelector('#error-indicator__message');
      errorMessage.innerText = 'Failed to fetch restaurant detail data. Please try again later.';

      console.error('Error fetching restaurant data:', error);
    }

    const header = document.querySelector('#header');
    header.classList.add('detail-header');

    const hero = document.querySelector('#hero');
    hero.classList.add('detail-hero');
  },
};

export default Detail;
