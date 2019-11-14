import UserProfile from '../models/UserProfile';

class BackendLogic {
    static fetchCards(numCards) {
        // TODO: make this actually access the backend
        var userProfiles = [];
        // This should probably either be a single call numCards, or a numCards loop of random profiles
        // make sure no duplicate cards pushed
        for (i = 0; i < numCards; ++i)
        {
          userProfiles.push(
            new UserProfile(
              (name="Joe Bruin"),
              (uid=i),
              (bIsRecruiter=true),
              (photos=[
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
        }
        return userProfiles;
    }
    
    static fetchCardByUID(uid) {
        // TODO: fill uidUserProfile with backend call
        var uidUserProfile = new UserProfile(
            name="Joe Bruin",
            uid=1,
            bIsRecruiter=false,
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
        return uidUserProfile;
    }
    
    static getMatchBucketByUID(uid) {
        // TODO: get match bucket list from firebase
        var matchedUIDs = [];
        // matchedUIDs = firebase function TODO
        return matchedUIDs;
    }
}

export default BackendLogic