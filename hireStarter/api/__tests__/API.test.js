import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../../config/Firebase/firebaseConfig";
import ProfileAPI from "../ProfileAPI";
import HomeAPI from "../HomeAPI";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reserve a subset of the UID space for testing
const testUIDs = [1111, 2222, 3333];
const isRecruiter = {
  1111: true,
  2222: false,
  3333: false
};

function getSkeletonProfile(uid, recruiter) {
  return {
    uid: uid,
    city: "",
    connections: [],
    description: "",
    email: "",
    image1: "",
    image2: "",
    name: "",
    organization: "",
    potentials: [],
    recruiter: recruiter,
    skills: []
  };
}

// Create test user profiles on DB
beforeAll(() => {
  testUIDs.forEach(uid =>
    ProfileAPI.createNewUser(getSkeletonProfile(uid, isRecruiter[uid]))
  );
});

// Delete test user profiles from DB
afterAll(async () => {
  for (uid in testUIDs) {
    const doc = await firebase
      .firestore()
      .collection("users")
      .doc(`${uid}`)
      .delete();
  }
});

// Make sure that each test user was successfully created
describe("User profile creation", () => {
  test("it should write profile on db", () => {
    for (uid in testUIDs) {
      const profile = ProfileAPI.getUserData(uid);
      // Expect that profile is not null or undefined
      expect(profile).toBeTruthy();
    }
  });
});

// Make sure user's info was successfully updateUserData
describe("User profile update", () => {
  test("it should write profile changes on db", () => {
    const testUID = testUIDs[0];
    // Get default profile
    var profile = getSkeletonProfile(uid, isRecruiter[uid]);
    // Change property
    const testEmail = "sample@email.com";
    profile.email = testEmail;
    ProfileAPI.updateUserData(profile);
    // Make sure changes are reflected
    const updatedProfile = ProfileAPI.getUserData(uid);
    expect(profile.email).toEqual(testEmail);
  });
});

// Check if match is recognized when two users like each other
describe("Match functionality", () => {
  test("it should recognize the match of two mutually liked users", () => {
    const testUser0 = testUIDs[0];
    const testUser1 = testUIDs[1];
    // Let test user 0 like test user 1
    HomeAPI.addPotential(testUser0, testUser1);
    // Match should not yet be recognized since this is a one-way like so far
    let match = HomeAPI.checkConnection(testUser0, testUser1);
    expect(match).toEqual(false);
    // Let test user 1 like test user 0
    HomeAPI.addPotential(testUser0, testUser1);
    // The likes are mutual at this point, so the match is established
    match = HomeAPI.checkConnection(testUser0, testUser1);
    expect(match).toEqual(true);
  });
});

// Recruiters should see only job seekers (conversely, job seekers should only see recruiters)
describe("Loading a batch of profiles to swipe on", () => {
  test("it should show job seeker profiles for recruiters to swipe on", () => {
    const recruiterUID = testUIDs[0];
    const jobSeekers = HomeAPI.fetchCards(recruiterUID);
    const allJobSeekers = jobSeekers.every(profile => !profile.recruiter);
    expect(allJobSeekers).toEqual(true);
  });
  test("it should show recruiter profiles for job seekers to swipe on", () => {
    const jobSeekerUID = testUIDs[1];
    const recruiters = HomeAPI.fetchCards(jobSeekerUID);
    const allRecruiters = recruiters.every(profile => profile.recruiter);
    expect(allRecruiters).toEqual(true);
  });
});
