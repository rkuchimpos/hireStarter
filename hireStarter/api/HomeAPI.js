import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

/**
 * Wrapper for Tinder functionality (e.g., match checking).
 * @class
 */
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
			potentials: firebase.firestore.FieldValue.arrayUnion(`${id2}`)
		});
		return true;
	},

	/**
	 * Check if a user has a connection (mutual like).
	 *
	 * @param {String} user_id1 The main user.
	 * @param {String} user_id2 The user_id2 potentially in connection with user_id1.
	 * @return {Boolean} Whether API call succeeded.
	 */
	checkConnection: async (user_id1, user_id2) => {
		collection = firebase.firestore().collection('users')
		query = await collection.doc(`${user_id2}`).get()
		potential_list = query.data().potentials
		if (potential_list.includes(user_id1)) {
			return true;
		}
		return false;
	},

	/**
	* Save that a user has established a connection (mutual like).
	*
	* @param {String} id1 The main user.
	* @param {String} id2 The user_ids th
	* @return {Boolean} Whether API call succeeded.
	*/
	addMatches: async (id1, id2) => {
		collection = firebase.firestore().collection('users')
		status1 = await firebase.firestore().collection('users').doc(id1).update({
			connections: firebase.firestore.FieldValue.arrayUnion(`${id2}`)
		});
		status2 = await firebase.firestore().collection('users').doc(id2).update({
			connections: firebase.firestore.FieldValue.arrayUnion(`${id1}`)
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
		thresholdMin = 0.5
		collection = firebase.firestore().collection('users')
		own_profile = await collection.doc(`${uid}`).get()
		own_data = own_profile.data()
		own_skills = own_data.skills
		pref_type = !own_data.recruiter;

		likes = own_data.potentials;
		docs = await collection.where("recruiter", "==", pref_type).limit(50).get();

		card_ids = [];
		docs.forEach(doc => {
			const data = doc.data()
			intersection = own_skills.filter(x => data.skills.includes(x))
			threshold = intersection.length/own_skills.length
			console.log(threshold)
			if (!(likes.includes(data.uid)) && (threshold >= thresholdMin)) {
				card_ids.push(data.uid)
			}
		});
		console.log(card_ids.length)
		return card_ids;
	}
}

export default HomeAPI
