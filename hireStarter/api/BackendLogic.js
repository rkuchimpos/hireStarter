import UserProfile from '../models/UserProfile';
import * from firebase 

db = firestore.collections

class BackendLogic {
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
  * Notify both users who have liked each other.
  *
  * @param {String} user_id1 The main user.
  * @param {String} user_id2 The user_id that user_id1 swiped left on.
  * @return {Boolean} Whether API call succeeded.
  */
  static notifyMatch(user_id1, user_id2){
    const messaging = firebase.messaging();
    messaging.usePublicVapidKey(/* */);
    //TODO
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
export default BackendLogic
