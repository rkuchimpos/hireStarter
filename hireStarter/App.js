import React from 'react'
import AppContainer from './navigation/AppContainer'
import Firebase, { FirebaseProvider } from './config/Firebase'

export default function App() {
  // Supress warnings
  console.disableYellowBox = true;
  return (
    <FirebaseProvider value={Firebase}>
      <AppContainer />
    </FirebaseProvider>
  )
}
