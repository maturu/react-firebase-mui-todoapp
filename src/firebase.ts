import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const config = {
  apiKey: 'AIzaSyAFEx24xhqFewdk-5CcpHvBcXPqz_1is44',
  authDomain: 'react-firebase-mui-todoapp.firebaseapp.com',
  databaseURL: 'https://react-firebase-mui-todoapp-default-rtdb.firebaseio.com',
  projectId: 'react-firebase-mui-todoapp',
  storageBucket: 'react-firebase-mui-todoapp.appspot.com',
  messagingSenderId: '94912600953',
  appId: '1:94912600953:web:d6f40ac093d7a02f0deda8',
};
const app = firebase.initializeApp(config);

export default firebase;
export const db = firebase.database(app);
