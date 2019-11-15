import UserProfile from '../models/UserProfile';
import BackendLogic from './BackendLogic';

/** Class that handles interfacing with the backend */
class BackendAPI {
    /**
     * Retrieve all data relevant to the Card class
     *
     * @param {string} uid The user's unique identifier.
     * @return {Object} A formatted JSON object that describes the user.
     */
    static fetchCards(uid){
        visited = db.collection('users').doc(uid).get('unlikes')
            .concat(
                db.collection('users').doc(uid).get('likes')
            )
        query = db.collection('users').where('id', "!=", visited).limitToLast(30);
    }
    /**
     * Get a list of user profile cards that match the user's profile filter/skills.
     *
     * @param {Integer} numCards the number of filtered cards to be retrieved.
     * @return {Array.<UserProfile>} an array of user profiles of length numCards that match the user's filter.
     */
    static getFilteredCards(numCards) {
        foundCards = 0;
        var filteredCards = [];
        while (foundCards < numCards)
        {
            //var unfilteredCards = fetchCards(numCards);
            var unfilteredCards = ['1', '2', '3']
            myUserCard = this.getMyCard();

            unfilteredCards.forEach(element => {
                // TODO: check if element matches with filter of myUserCard
                // if so:
                filteredCards.push(element);
                foundCards++;
                //else:
                // continue
                console.log("unfiltered foreach");
            });
        }
        return filteredCards;
    }

    /**
     * Get a list of mock user profile cards.
     *
     * @param {Integer} numCards the number of cards to be retrieved.
     * @return {Array.<UserProfile>} an array of user profiles of length numCards.
     */
    static getMockCards(numCards) {
      var mockCards = [];
      for (var i = 0; i < numCards; ++i) {
        mockCards.push(this.getMockProfile(i));
      }
      return mockCards;
    }

    /**
     * Get a mock user profile.
     *
     * @param {Integer} uid the user ID of the profile.
     * @return {Array.<UserProfile>} an array of user profiles of length numCards.
     */
    static getMockProfile(uid) {
      return new UserProfile(
          name="Joe Bruin",
          uid=uid,
          bIsRecruiter=false,
          photos=[
            "https://i.imgur.com/cMFc42W.png",
            "https://i.imgur.com/6B55OIA.png"
          ],
          location="University of California, Los Angeles",
          skills=[
            "C++",
            "Python",
            "Machine Learning",
            "Distributed Computing",
            "Computer Vision"
          ],
          description="Yo, my name is Bob and I am looking for full-time work as a software engineer. Outside of work, I enjoy swinging across trees and skateboarding with my friends."
      );
    }

    /**
     * Get the current user's user profile card, by using a globall stored UID for the session.
     *
     * @return {UserProfile} the user's profile card.
     */
    static getMyCard() {
        // TODO: get locally stored uid
        uid = 1;
        // TODO: implement get card from firebase
        return null //BackendLogic.fetchCardByUID(uid);
    }

    /**
     * Get a list of user profile cards that the user has matched with mutually.
     *
     * @return {Array.<UserProfile>} an array of user profiles that the user has mutually matched with.
     */
    static getMatchedCards() {
        var matchedUIDs = BackendLogic.getMatchBucketByUID();
        var matchedCards = [];
        matchedUIDs.forEach(element => {
            matchedCards.push(BackendLogic.fetchCardByUID(element));
        });

        //TODO: get rid of this:
        matchedCards = this.getFilteredCards(10);

        return matchedCards;
    }
}

export default BackendAPI
