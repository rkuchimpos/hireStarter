import Firebase from './firebase'
import AuthAPI from '../../api/AuthAPI'
import ProfileAPI from '../../api/ProfileAPI'
import HomeAPI from '../../api/HomeAPI'
import LoadAPI from '../../api/LoadAPI'
import { FirebaseProvider, withFirebaseHOC } from './context'

export default Firebase

export { FirebaseProvider, withFirebaseHOC, AuthAPI, ProfileAPI, HomeAPI, LoadAPI }