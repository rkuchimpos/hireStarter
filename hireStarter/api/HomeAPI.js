import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const HomeAPI = {
    /**
     * Add a like to the card that was swiped right.
     *
     * @param {String} id1 The user_id of swiping user.
     * @param {String} id2 The user_id that user swiped right on.
     * @return {Boolean} Whether API call succeeded.
     */
    addPotential: async (id1, id2) => {
        status = await firebase.firestore().collection('users').doc(`${id1}`).update({
            likes: firebase.firestore.FieldValue.arrayUnion([`${id1}`])
        });
        return true;
    },

    /**
     * Check if a user has a connection (mutual like).
     *
     * @param {String} user_id1 The main user.
     * @param {String} user_id2 The user_id potentially in connection with user_id1.
     * @return {Boolean} Whether API call succeeded.
     */
    checkConnection: async (user_id1, user_id2) => {
        var query = firebase.firestore().collection('users').doc(user_id2).where('likes', "==", user_id1);
        if (query.length == 0) {
            return false;
        }
        return true;
    },

    /**
    * Save that a user has established a connection (mutual like).
    *
    * @param {String} user_id1 The main user.
    * @param {String} user_id2 The user_ids th
    * @return {Boolean} Whether API call succeeded.
    */
    addMatches: async (user_id1, user_id2) => {
        status = await firebase.firestore().collection('users').doc(id1).update({
            connections: firebase.firestore.FieldValue.arrayUnion([id2])
        });
        status = await firebase.firestore().collection('users').doc(id2).update({
            cnonections: firebase.firestore.FieldValue.arrayUnion([id1])
        });
        return true;
    },


    /**
     * Retrieve all data relevant to the Card class
     *
     * @param {string} uid The user's unique identifier.
     * @return {Object} A formatted JSON object that describes the user.
     */
    fetchCards: async (uid) => {
        collection = firebase.firestore().collection('users')
        own_profile  = await collection.doc(`${uid}`).get()
        own_data = own_profile.data()
        prof_type = own_data.recruiter;
        likes = own_data.potentials;
        docs = await collection.get();
        
        card_ids = [];
        docs.forEach(doc => {
          const data = doc.data()
          if (! likes.includes(data.uid) && (data.recruiter != prof_type)){
            card_ids.push(data.uid)
          }
        });
        // collection.get().then(function (querySnapshot){
        //     querySnapshot.forEach(function(doc){
        //         data = doc.data()
        //         // if (! likes.includes(doc.uid) && (doc.recruiter !=  prof_type)){
        //         //     card_ids.push(doc.uid);
        //         // }
        //         card_ids.push(data.uid)
        //     });
        // });
        return card_ids; 
    }    
}

export default HomeAPI