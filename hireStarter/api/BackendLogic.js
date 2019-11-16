import UserProfile from '../models/UserProfile'
import { withFirebaseHOC } from '../config/Firebase'

/** Logic for working with Firestore */
class BackendLogic {
  db = firebase.firestore()

  // Used for testing; remove when db is fully set up
  likesByUid = {}

  /*
    static fetchCardByUID(uid) {
        // TODO: fill uidUserProfile with backend call
        var uidUserProfile = new UserProfile(
            name="Joe Bruin",
            uid=uid,
            bIsRecruiter=false,
            photos=[
              "https://i.imgur.com/cMFc42W.png",
              "https://i.imgur.com/6B55OIA.png"
            ]),
            (location="University of California, Los Angeles"),
            (skills=[
              "C++",
              "Python",
              "Machine Learning",
              "Distributed Computing",
              "Computer Vision"
            ]),
            (description=
              "Yo, my name is Bob and I am hiring for full-time software engineers. Outside of work, I enjoy swinging across trees and skateboarding with my friends."
            )
          )
        );
        return userProfiles;
      }


  static fetchCardByUID(uid) {
      // TODO: fill uidUserProfile with backend call
      var uidUserProfile = new UserProfile(
          name="Joe Bruin",
          uid=1,
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
          (description="Yo, my name is Bob and I am looking for full-time work as a software engineer. Outside of work, I enjoy swinging across trees and skateboarding with my friends.")
      );
      return uidUserProfile;
  }

  static getMatchBucketByUID(uid) {
    // TODO: get match bucket list from firebase
    var matchedUIDs = [];
    // matchedUIDs = firebase function TODO
    return matchedUIDs;
  }
*/
  /**
   * Fetch all UIDs found in the user's Matches array
   *
   * @param {string} uid The user's unique identifier.
   * @return {Object} A JSON object containing all UIDs in the user's Matches array.
   */
  static fetchMatches(uid){
    query = db.collection('users').doc(user_id2).get('matches');
    return query
  }

  /**
   * Add a like to the card that was swiped right.
   *
   * @param {String} id1 The user_id of swiping user.
   * @param {String} id2 The user_id that user swiped right on.
   * @return {Boolean} Whether API call succeeded.
   */
  static addLike(id1, id2){
    var status = db.collection('users').doc(id1).update({
      likes: firebase.firestore.FieldValue.arrayUnion([id2])
    });
    return true;
  }

  /**
   * Add a like to the card that was swiped right.
   *
   * @param {String} id1 The user_id of swiping user.
   * @param {String} id2 The user_id that user swiped right on.
   * @return {Boolean} Whether API call succeeded.
   */
  static addLikeMock(id1, id2) {
    // Add id2 to id1's list of matches
    if (id1 in likesByUid) {
      likesByUid[id1].push(id2);
    } else {
      likesByUid[id1] = [id2];
    }
    // Add id1 to id2's list of Matches
    if (id2 in likesByUid) {
      likesByUid[id2].push(id1);
    } else {
      likesByUid[id2] = [id1];
    }
    return true;
  }

  /**
  * Check if a user has a connection (mutual like).
  *
  * @param {String} user_id1 The main user.
  * @param {String} user_id2 The user_id potentially in connection with user_id1.
  * @return {Boolean} Whether there is a match
  */
  static checkConnectionMock(user_id1, user_id2) {
    return likesByUid[user_id1].includes(user_id2) && likesByUid[user_id2].includes(user_id1);
  }

  /**
  * Add a like to the card that was swiped left.
  *
  * @param {String} id1 The user_id of swiping user.
  * @param {String} id2 The user_id that user swiped left on.
  * @return {Boolean} Whether API call succeeded.
  */
  static addUnlike(id1, id2){
    var status = db.collection('users').doc(id1).update({
      likes: firebase.firestore.FieldValue.arrayUnion([id2])
    });
    return true;
  }

  /**
  * Check if a user has a connection (mutual like).
  *
  * @param {String} user_id1 The main user.
  * @param {String} user_id2 The user_id potentially in connection with user_id1.
  * @return {Boolean} Whether API call succeeded.
  */
  static checkConnection(user_id1, user_id2){
    query = db.collection('users').doc(user_id2).where('likes', "==", user_id1);
    if(query.length == 0){
      return false;
    }
    return true;
  }

  /**
  * Save that a user has established a connection (mutual like).
  *
  * @param {String} user_id1 The main user.
  * @param {String} user_id2 The user_ids that have connected.
  * @return {Boolean} Whether API call succeeded.
  */
  static addMatches(user_id1, user_id2){
    var status = db.collection('users').doc(id1).update({
      likes: firebase.firestore.FieldValue.arrayUnion([id2])
    });
    var status = db.collection('users').doc(id2).update({
      matches: firebase.firestore.FieldValue.arrayUnion([id1])
    });
    return true;
  }
}
export default withFirebaseHOC(BackendLogic)
