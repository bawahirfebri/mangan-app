const assert = require('assert');

Feature('Unliking Restaurants');
 
Before(async ({ I }) => {
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
});

Scenario('showing liked restaurants', ({ I }) => {
  I.seeElement('.posts');
  I.seeElement('#query');
  I.seeElement('.post-item');
});

Scenario('Unliking one restaurant', async ({ I }) => {
  I.seeElement('.post-item');

  I.seeElement('.post-item__title a');
  const firstRestaurant = locate('.post-item__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.post-item');
  const likedRestaurantTitle = (await I.grabTextFrom('.post-item__title')).trim();

  assert.notStrictEqual(firstRestaurantTitle, likedRestaurantTitle);
});
