import UserProfile from '../models/UserProfile';
import BackendLogic from './BackendLogic';

class BackendAPI {
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
            var unfilteredCards = BackendLogic.fetchCards(numCards);

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
     * Get the current user's user profile card, by using a globall stored UID for the session.
     * 
     * @return {UserProfile} the user's profile card.
     */
    static getMyCard() {
        // TODO: get locally stored uid
        uid = 1;
        // TODO: implement get card from firebase
        return BackendLogic.fetchCardByUID(uid);
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
}

export default BackendAPI