const formValidator = require('../src/form_validator');

describe('isValidStoryCount(value)', () => {
  test('should return true for valid count', () => {
    const storyCount = '10';
    expect(formValidator.isValidStoryCount(storyCount)).toBe(true);
  });

  test('should return false for a non numeric value', () => {
    const storyCount = 'all';
    expect(formValidator.isValidStoryCount(storyCount)).toBe(false);
  });

  test('should return false for a value less than 1', () => {
    const storyCount = '0';
    expect(formValidator.isValidStoryCount(storyCount)).toBe(false);
  });

  test('should return false for a value higher than 50', () => {
    const storyCount = '100';
    expect(formValidator.isValidStoryCount(storyCount)).toBe(false);
  });
});

describe('isValidStoryType(value)', () => {
  test('should return true for valid storyType "best"', () => {
    const storyType = 'best';
    expect(formValidator.isValidStoryType(storyType)).toBe(true);
  });

  test('should return true for valid storyType "top"', () => {
    const storyType = 'top';
    expect(formValidator.isValidStoryType(storyType)).toBe(true);
  });

  test('should return true for valid storyType "new"', () => {
    const storyType = 'new';
    expect(formValidator.isValidStoryType(storyType)).toBe(true);
  });

  test('should return false for invalid storyType', () => {
    const storyType = 'jobs';
    expect(formValidator.isValidStoryType(storyType)).toBe(false);
  });
});

describe('hasValidAPIParams(storyType, storyCount)', () => {
  test('should return true for valid params', () => {
    const storyCount = '5';
    const storyType = 'best';
    expect(formValidator.hasValidAPIParams(storyType, storyCount)).toBe(true);
  });

  test('should return false for invalid story count', () => {
    const storyCount = '100';
    const storyType = 'best';
    expect(formValidator.hasValidAPIParams(storyType, storyCount)).toBe(false);
  });

  test('should return false for invalid story type', () => {
    const storyCount = '5';
    const storyType = 'all';
    expect(formValidator.hasValidAPIParams(storyType, storyCount)).toBe(false);
  });
});
