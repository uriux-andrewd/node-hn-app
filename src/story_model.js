const got = require('got');

function getStories(storyType, storyCount) {
  const feedOptions = {
    protocol: 'https:',
    hostname: 'hacker-news.firebaseio.com',
    path: `/v0/${storyType}stories.json`,
    timeout: 10000
  };

  return got(feedOptions)
    .then(response => {
      const storyFeed = JSON.parse(response.body).slice(0, storyCount);
      return Promise.all(
        storyFeed.map(storyId => {
          return got({
            protocol: 'https:',
            hostname: 'hacker-news.firebaseio.com',
            path: `/v0/item/${storyId}.json`,
            timeout: 10000
          });
        })
      );
    })
    .then(responses => responses.map(response => JSON.parse(response.body)));
}

module.exports = {
  getStories
};
