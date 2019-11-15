import BackendLogic from '../BackendLogic';

test('retrieving profile by uid should return matching profile', () => {
  const expectedUid = 12345;
  const profile = BackendLogic.fetchCardByUID(expectedUid);
  expect(profile.uid).toBe(expectedUid)
});

// TODO: Replace mock calls with actual calls
test('two mutual likes should be recognized as a match', () => {
  const user1 = 1;
  const user2 = 2;
  BackendLogic.addLikeMock(user1, user2);
  BackendLogic.addLikeMock(user2, user1);
  const isMatch = Backend.checkConnectionMock(user1, user2);
  expect(isMatch).toBe(true);
});

// TODO: Replace mock calls with actual calls
test('unreciprocated match should not be recognized as a match', () => {
  const user1 = 3;
  const user2 = 4;
  BackendLogic.addLikeMock(user1, user2);
  const isMatch = Backend.checkConnectionMock(user1, user2);
  expect(isMatch).toBe(false);
});
