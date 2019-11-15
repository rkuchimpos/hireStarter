import BackendAPI from '../BackendAPI';

test('retrieving n cards', () => {
  var cards = BackendAPI.getFilteredCards(3);
  expect(cards.length).toBe(3)
});
