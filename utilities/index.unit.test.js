const path = require('path');
const { getObjectValue, reqAbsolutePath } = require('./index');

describe('getObjectValue', () => {
  test('parse path string', () => {
    const object = { a: { b: 1 } };
    expect(getObjectValue(object, 'a.b')).toBe(1);
  });
  test('path string array', () => {
    const object = { a: { b: 1 } };
    expect(getObjectValue(object, ['a', 'b'])).toBe(1);
  });
  test('wrong path', () => {
    const object = { a: { b: 1 } };
    expect(getObjectValue(object, 'a.b.c')).toBe(undefined);
    expect(getObjectValue(object, 'a.c')).toBe(undefined);
  });
  test('default value', () => {
    const object = { a: { b: 1 } };
    expect(getObjectValue(object, 'a.b', 2)).toBe(1);
    expect(getObjectValue(object, 'a.b.c', 2)).toBe(2);
    expect(getObjectValue(object, 'a.c', 2)).toBe(2);
  });
});

describe('reqAbsolutePath', () => {
  test('relative path', () => {
    const expected = path.join(process.cwd(), 'path');
    expect(reqAbsolutePath('path')).toBe(expected);
    expect(reqAbsolutePath('./path')).toBe(expected);
  });
  test('absolute path', () => {
    expect(reqAbsolutePath('/path')).toBe('/path');
  });
});

