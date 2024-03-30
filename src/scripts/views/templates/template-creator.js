import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `
  <article class='post-item'>
    <img 
      class='post-item__thumbnail'
      src=${restaurant.pictureId ? CONFIG.BASE_IMG_URL + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'} 
      alt=${restaurant.name}
    >
    <p class='post-item__city'>
      ${restaurant.city}
    </p>
    <div class='post-item__content'>
      <div class='post-item__content-top'>
        <h1 class='post-item__title'>
          <a href='#/detail/${restaurant.id}'>${restaurant.name}</a>
        </h1>
        <p class='post-item__rating'>
          &starf; ${restaurant.rating}
        </p>
      </div>
      <p class='post-item__description'>
        ${restaurant.description}
      </p>
    </div>
  </article>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <div class='restaurant__picture'>
    <img 
      class='restaurant__picture'
      src=${restaurant.pictureId ? CONFIG.BASE_IMG_URL + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'} 
      alt=${restaurant.name}
    >
  </div>
  <div class='restaurant__info-top'>
    <h2 class='restaurant__name'>${restaurant.name}</h2>
    <p class='restaurant__rating'>&starf; ${restaurant.rating}</p>
  </div>
  <p class='restaurant__address'>${restaurant.address}, ${restaurant.city}</p>
  <div class='restaurant__info-bottom'>
    <h4>Description</h4>
    <p class='restaurant__description'>${restaurant.description}</p>
  </div>
  <div class='restaurant__info-bottom'>
    <h4>Foods</h4>
    <ul class='restaurant__foods' id='restaurant__foods'></ul>
  </div>
  <div class='restaurant__info-bottom'>
    <h4>Drinks</h4>
    <ul class='restaurant__drinks' id='restaurant__drinks'></ul>
  </div>
  <div class='restaurant__info-bottom'>
    <h4>Review</h4>
    <form id='review__form' class='review__form'>
      <label for='name'>Name</label>
      <input type='text' id='name' name='name' required>
      <label for='review'>Review</label>
      <textarea name='review' id='review' required></textarea>
      <button type='submit'>Comment</button>
    </form>
    <div class='restaurant__reviews' id='restaurant__reviews'></div>
  </div>
`;

const createReviewDetailTemplate = (review) => `
  <div class='review-item'>
    <div class='review-item__top'>
      <h5>${review.name}</h5>
      <p>${review.date}</p>
    </div>
    <p class='review-item__bottom'>${review.review}</p>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label='like this restaurant' id='likeButton' class='like'>
    <i class='fa fa-heart-o' aria-hidden='true'></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label='unlike this restaurant' id='likeButton' class='like'>
    <i class='fa fa-heart' aria-hidden='true'></i>
  </button>
`;

const createLoadingIndicatorTemplate = () => `
  <div id='loading-indicator' class='loading-indicator'>
    <div class='loader'></div>
  </div>
`;

const createLoadingIndicatorDetailTemplate = () => `
  <div class='restaurant__picture loading-detail'></div>
  <div class='loading-indicator__detail'>
    <div class='loader'></div>
  </div>
`;

const createErrorMessageTemplate = () => `
  <div id='error-indicator' class='error-indicator'>
    <p id='error-indicator__message'  class='error-indicator__message'></p>
  </div>
`;

const createErrorMessageDetailTemplate = () => `
  <div class='restaurant__picture loading-detail'></div>
  <div id='error-indicator__detail' class='error-indicator__detail'>
    <p id='error-indicator__message'  class='error-indicator__message'></p>
  </div>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createReviewDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createLoadingIndicatorTemplate,
  createErrorMessageTemplate,
  createLoadingIndicatorDetailTemplate,
  createErrorMessageDetailTemplate,
};
