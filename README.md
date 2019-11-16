# hireStarter
A human approach to talent search

# Development Setup
We are using Expo (https://expo.io/learn).
Once Expo is in place, navigate to the hireStarter directory and type `npm install`, then `expo start`.

# Structure
- /android: Contains Android-specific configuration files
- /api: Logic for interfacing with Firebase backend
  - /api/tests: Jest tests for backend logic
- /assets: Contains static assets such as images for logos, backgrounds, etc
- /components: Reusable React UI elements
  - /components/tests: Snapshot tests for React components
- /config/Firebase: Configuration files for Firebase
- /models: Contains JavaScript objects that describe the outline of our actors, such as the user
- /navigation: Routing logic for page-to-page navigation
- /out: Auto-generated JSDoc web pages
- /screens: Contains different pages that can be accessed throughout the app, such as the login page, the home page, the edit profile page, etc

# Testing
`npm run test` to run all tests

When updating a React component, remember to update its snapshot: `npm test -- --updateSnapshot`

When creating a test for a JS file, create a `test` folder in the same directory and name it `myFile.test.js`

The existing tests so far include:
1) Ensure that if we request N profiles, we receive N profiles from the backend.
2) When retrieving a profile by its user ID (UID), ensure that the returned profile has a matching UID.
3) Expect a match when two users 'like' each other.
4) Snapshot tests for Skill and ProfileCard components.
