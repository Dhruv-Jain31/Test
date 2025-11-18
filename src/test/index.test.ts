import { sum, multiply } from '../index';
import { describe, it, expect } from 'vitest';

// supposed to add a bunch of tests for sum function
//describe : grouping related tests
// it : individual test case
//expect : assertion library that checks if the output matches expected value
//toBe : matcher that checks for exact equality
describe('sum', () => {
    it('should return the sum of two numbers', () => {
        expect(sum(2, 3)).toBe(5);
        expect(sum(-1, 1)).toBe(0);
        expect(sum(0, 0)).toBe(0);
    });
});

// add more tests for multiply function
describe('multiply', () => {
    it('should return the product of two numbers', () => {
        expect(multiply(2, 3)).toBe(6);
        expect(multiply(-1, 1)).toBe(-1);
        expect(multiply(0, 5)).toBe(0);
    });
});