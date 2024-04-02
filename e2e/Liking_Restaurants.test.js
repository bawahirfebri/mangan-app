const assert = require('assert');

Feature('Liking Restaurants');
 
Before(({ I }) => {
  I.amOnPage('/#/favorite');

});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('.posts');
  I.seeElement('#query');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.post-item__title a');
  const firstRestaurant = locate('.post-item__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.post-item');
  const likedRestaurantTitle = (await I.grabTextFrom('.post-item__title')).trim();

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.post-item__title a');

  const titles = [];
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.post-item__title a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    titles.push((await I.grabTextFrom('.restaurant__name')));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.post-item');
  assert.strictEqual(titles.length, visibleLikedRestaurants);

  const searchQuery = titles[1].substring(1, 3);
  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const matchingRestaurants = titles.filter((title) => title.indexOf(searchQuery) !== -1);
  const visibleSearchedLikedRestaurants = await I.grabNumberOfVisibleElements('.post-item');

  assert.strictEqual(matchingRestaurants.length, visibleSearchedLikedRestaurants);

  for (let i = 0; i < matchingRestaurants.length; i++) {
    const visibleTitle = (await I.grabTextFrom(locate('.post-item__title').at(i + 1))).trim();
    assert.strictEqual(matchingRestaurants[i], visibleTitle);
  }
});
