import TheRestaurantDbSource from '../data/therestaurantdb-source';
import { createReviewDetailTemplate } from '../views/templates/template-creator';

const ReviewInitiator = {
  async init({
    id,
    formContainer,
    nameContainer,
    reviewContainer,
  }) {
    this._id = id;
    this._formContainer = formContainer;
    this._nameContainer = nameContainer;
    this._reviewContainer = reviewContainer;

    this._formSubmit();
    this._renderReviews();
  },

  async _formSubmit() {
    this._formContainer.addEventListener('submit', async (event) => {
      event.preventDefault();

      try {
        const response = await TheRestaurantDbSource.addReview({
          id: this._id,
          name: this._nameContainer.value,
          review: this._reviewContainer.value,
        });
        console.log(response);

        const customerReview = response.customerReviews.pop();
        this._renderAddReview(customerReview);

        this._clearValue();
      } catch (error) {
        console.error('Error adding review:', error);
      }
    });
  },

  async _renderReviews() {
    const restaurant = await TheRestaurantDbSource.detailRestaurant(this._id);
    const reviews = document.querySelector('#restaurant__reviews');
    restaurant.customerReviews.reverse().forEach((review) => {
      reviews.innerHTML += createReviewDetailTemplate(review);
    });
  },

  _renderAddReview(customerReview) {
    const reviews = document.querySelector('#restaurant__reviews');
    reviews.insertAdjacentHTML('afterbegin', createReviewDetailTemplate(customerReview));
  },

  _clearValue() {
    this._nameContainer.value = '';
    this._reviewContainer.value = '';
  },
};

export default ReviewInitiator;
