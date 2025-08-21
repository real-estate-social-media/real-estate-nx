import { sharedServices } from './shared-services';

describe('sharedServices', () => {
  it('should work', () => {
    expect(sharedServices()).toEqual('shared-services');
  });
});
