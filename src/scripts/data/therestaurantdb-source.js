import CONFIG from "../globals/config"

class TheRestaurantDbSource {
  static async restaurantList() {
    const response = await fetch(CONFIG.BASE_URL)
    const responseJson = await response.json()
    return responseJson.restaurants
  }
}

export default TheRestaurantDbSource