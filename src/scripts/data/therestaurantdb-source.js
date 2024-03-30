import API_ENDPOINT from '../globals/api-endpoint';

class TheRestaurantDbSource {
  static async restaurantList() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static async addReview(customerReview) {
    const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': 'BUWUNG_PUYUH',
      },
      body: JSON.stringify(customerReview),
    });
    const responseJson = await response.json();
    return responseJson;
  }
}

export default TheRestaurantDbSource;
