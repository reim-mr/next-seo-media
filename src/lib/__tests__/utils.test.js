/**
 * サンプルテスト - Jest動作確認用
 */

describe('Sample Test', () => {
  it('should pass basic test', () => {
    expect(true).toBe(true);
  });

  it('should handle string operations', () => {
    const str = 'Hello World';
    expect(str.toLowerCase()).toBe('hello world');
    expect(str.length).toBe(11);
  });

  it('should handle array operations', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(arr).toHaveLength(5);
    expect(arr).toContain(3);
    expect(arr.filter(n => n > 3)).toEqual([4, 5]);
  });
});
