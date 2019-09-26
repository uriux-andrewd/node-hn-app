const formValidator = require('./form_validator');
const storyModel = require('./story_model');

function route(app) {
  app.get('/', (req, res) => {
    const storyType = req.query.storyType;
    const storyCount = req.query.storyCount;

    const ejsLocalVariables = {
      storyCountParameter: storyCount || '10',
      storyTypeParameter: storyType || 'best',
      stories: [],
      searchResults: false,
      invalidParameters: false
    };

    // if no input params are passed in then render the view without querying the api
    if (!storyType && !storyCount) {
      return res.render('index', ejsLocalVariables);
    }

    // validate query parameters
    if (!formValidator.hasValidAPIParams(storyType, storyCount)) {
      ejsLocalVariables.invalidParameters = true;
      return res.render('index', ejsLocalVariables);
    }

    // get photos from flickr public feed api
    return storyModel
      .getStories(storyType, storyCount)
      .then(stories => {
        ejsLocalVariables.stories = stories;
        ejsLocalVariables.searchResults = true;
        return res.render('index', ejsLocalVariables);
      })
      .catch(error => {
        return res.status(500).send({ error });
      });
  });
}

module.exports = route;
