# hireStarter
A human approach to talent search

# Development Setup
We are using Expo (https://expo.io/learn).
Once Expo is in place, navigate to the hireStarter directory and type `npm install`, then `expo start`.

# Structure
- /android: Contains Android-specific configuration files
- /api: Logic for interfacing with Firebase backend
- /assets: Contains static assets such as images for logos, backgrounds, etc
- /components: Reusable React UI elements
- /config/Firebase: Configuration files for Firebase
- /models: Contains JavaScript objects that describe the outline of our actors, such as the user
- /navigation: Routing logic for page-to-page navigation
- /out: Auto-generated JSDoc web pages
- /screens: Contains different pages that can be accessed throughout the app, such as the login page, the home page, the edit profile page, etc

# Testing
`npm run test` to run all tests

When updating a React component, remember to update its snapshot: `npm test -- --updateSnapshot`
