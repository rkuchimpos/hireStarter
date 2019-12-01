import UserProfile from '../models/UserProfile';
import BackendLogic from './BackendLogic';
import { skills } from "../data/skills";
import { mockNames } from "../data/mockNames";
import { mockProfilePhotos } from "../data/mockProfilePhotos";

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
      var randomName = mockNames[Math.floor((Math.random() * mockNames.length))];
      var randomPhoto = mockProfilePhotos[Math.floor((Math.random() * mockProfilePhotos.length))];
      var randomSkills = [];
      for (var i = 0; i < 3; i++) {
        var randomSkill = skills[Math.floor((Math.random() * skills.length))];
        if (!randomSkills.includes(randomSkill)) {
          randomSkills.push(randomSkill);
        }
      }
      return new UserProfile(
          randomName,
          uid,
          false,
          [
            randomPhoto,
            "https://i.imgur.com/hRDnzhH.jpg" // Same secondary profile photo
          ],
          "University of California, Los Angeles",
          randomSkills,
          "Yo, I am looking for full-time work as a software engineer. Outside of work, I enjoy making music and skateboarding with my friends."
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
