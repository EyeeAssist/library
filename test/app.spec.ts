function sum(op1: number, op2: number) {
  return op1 + op2
}

describe('sum function', () => {
  it('should add two numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
