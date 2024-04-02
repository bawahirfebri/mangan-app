const assert = require('assert');

Feature('Review Restaurants');

Before(async ({ I }) => {
  I.amOnPage('/');
});

Scenario('Reviewing restaurant', async ({ I }) => {
  I.seeElement('.posts');

  I.seeElement('.post-item a');
  const firstRestaurant = locate('.post-item__title a').first();
  I.click(firstRestaurant);

  I.seeElement('.review__form');
  I.seeElement('#name');
  I.fillField('#name', 'Bambang');
  I.seeElement('#review');
  I.fillField('#review', 'Makanannya Enak');
  I.seeElement('#review__form-button');
  I.click('#review__form-button');

  I.seeElement('.review-item');
  const reviewerRestaurantName = (await I.grabTextFrom('.review-item__top h5')).trim();
  const reviewerRestaurantReview = (await I.grabTextFrom('.review-item__bottom')).trim();

  assert.strictEqual(reviewerRestaurantName, 'Bambang');
  assert.strictEqual(reviewerRestaurantReview, 'Makanannya Enak');
});
