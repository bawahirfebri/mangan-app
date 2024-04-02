import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantView {
  getTemplate() {
    return `
      <section class='content'>
        <h1 class='content__label'>Favorite Restaurant</h1>
        <input id="query" class="query" type="text" placeholder="Searching...">
        <div class='posts' id='posts'></div>
      </section>
    `;
  }

  getFavoriteRestaurantTemplate() {
    return `
      <section class='content'>
        <h1 class='content__label'>Favorite Restaurant</h1>
        <div class='posts' id='posts'></div>
      </section>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurants(restaurants) {
    this.showFavoriteRestaurants(restaurants);
  }

  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }
    document.getElementById('posts').innerHTML = html;

    document.getElementById('posts').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant-item__not__found">
        Tidak ada restaurant untuk ditampilkan
      </div>
    `;
  }
}

export default FavoriteRestaurantView;
