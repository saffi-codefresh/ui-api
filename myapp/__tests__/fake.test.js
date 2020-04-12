function suma(a, b) {
    return a + b;
}
test('1+2 is 3', () => {
    expect(suma(1, 2)).toBe(3);
});
