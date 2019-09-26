function isValidStoryCount(value) {
  const parsedValue = Number.parseInt(value);
  return Number.isInteger(parsedValue) && parsedValue > 0 && parsedValue <= 50;
}

function isValidStoryType(value) {
  return value === 'best' || value === 'top' || value === 'new';
}

function hasValidAPIParams(storyType, storyCount) {
  return isValidStoryCount(storyCount) && isValidStoryType(storyType);
}

module.exports = {
  isValidStoryType,
  isValidStoryCount,
  hasValidAPIParams
};
