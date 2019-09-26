const got = require('got');

describe('hn public api', () => {
  test('top stories api should return many story ids', () => {
    const apiTest = {
      protocol: 'https:',
      hostname: 'hacker-news.firebaseio.com',
      path: `/v0/beststories.json`,
      timeout: 10000
    };

    return got(apiTest).then(response => {
      expect(response.statusCode).toBe(200);

      const storyFeed = JSON.parse(response.body);
      expect(storyFeed).toBeInstanceOf(Array);
      expect(storyFeed.length).toBeGreaterThan(0);
    });
  });

  test('item api should return story details', () => {
    const storyId = 21015964;
    const apiTest = {
      protocol: 'https:',
      hostname: 'hacker-news.firebaseio.com',
      path: `/v0/item/${storyId}.json`,
      timeout: 10000
    };

    return got(apiTest).then(response => {
      expect(response.statusCode).toBe(200);

      const storyItem = JSON.parse(response.body);
      expect(storyItem.id).toBe(storyId);
      expect(storyItem).toHaveProperty('title');
      expect(storyItem).toHaveProperty('url');
    });
  });
});
