import Form from './form'
import './App.css'
import firebase from 'firebase'

function App() {
  const firebaseConfig = {
    apiKey: 'AIzaSyC1L3kLmp7t_Z5IE56cCm8U2XYH5Ko5ZRA',
    authDomain: 'valdera-tests.firebaseapp.com',
    projectId: 'valdera-tests',
    storageBucket: 'valdera-tests.appspot.com',
    messagingSenderId: '61061709641',
    appId: '1:61061709641:web:ed142d216f141ef4512498',
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  return (
    <div className='App'>
      <Form />
    </div>
  )
}

export default App
