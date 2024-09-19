import React from 'react';
import CollectionPages from './components/CollectionPages';
import { AuthProvider } from './context/AuthContext';
import { FirebaseContext } from './context/firebaseContext';
import { auth, db } from './firebase';
import { Api } from './utils/api/api';


const App: React.FC = () => {
  const api: Api = new Api(db, auth);

  return (
    <FirebaseContext.Provider value={{ api }}>
      <AuthProvider>
        <CollectionPages/>
      </AuthProvider>
    </FirebaseContext.Provider>
  );
};

export default App;
