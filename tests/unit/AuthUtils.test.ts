import { parseBearerToken } from '@/utils/AuthUtils';
import { expect } from 'chai';

describe('Auth utils test', () => {
  describe('Parse bearer token', () => {
    it('should parse correctly', () => {
      const bearer = 'Bearer XXXXXX';
      const token = parseBearerToken(bearer);
      expect(token).to.be.eq('XXXXXX');
    });
    it('should throw an error', () => {
      const bearer = 'XXXXXX';
      expect(() => {
        parseBearerToken(bearer);
      }).to.throw('Invalid token');
    });
  });
});
