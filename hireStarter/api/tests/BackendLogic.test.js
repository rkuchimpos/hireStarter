import BackendLogic from '../BackendLogic';

test('retrieving profile by uid should return matching profile', () => {
  const expectedUid = 12345;
  const profile = BackendLogic.fetchCardByUID(expectedUid);
  expect(profile.uid).toBe(expectedUid)
});
