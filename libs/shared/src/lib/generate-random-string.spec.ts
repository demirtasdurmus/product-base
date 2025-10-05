import { generateRandomString } from './generate-random-string.js';

describe('generateRandomString', () => {
  it('should generate an id with the given length', () => {
    expect(generateRandomString(1)).toHaveLength(1);
  });

  it('should generate an id with the given length', () => {
    expect(generateRandomString(10)).toHaveLength(10);
  });

  it('should generate an id with the given length', () => {
    expect(generateRandomString(20)).toHaveLength(20);
  });

  it('should generate an id with the given length', () => {
    expect(generateRandomString(34)).toHaveLength(34);
  });

  it('should generate an id with the default length if no length is provided', () => {
    expect(generateRandomString()).toHaveLength(10);
  });

  it('should throw an error if the length is less than 0', () => {
    expect(() => generateRandomString(0)).toThrow('Length must be greater than 0');
  });

  it('should throw an error if the length is greater than 34', () => {
    expect(() => generateRandomString(35)).toThrow('Length must be less than 36');
  });
});
