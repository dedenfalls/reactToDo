import * as firebase from 'firebase';
import 'firebase/firestore';

const dbCredentials = require('./appDBCredentials');

const firebaseApp = firebase.initializeApp({
  type: dbCredentials.type,
  projectId: dbCredentials.projectId,
  private_key_id: dbCredentials.private_key_id,
  private_key: dbCredentials.private_key,
  client_email: dbCredentials.client_email,
  client_id: dbCredentials.client_id,
  auth_uri: dbCredentials.auth_uri,
  token_uri: dbCredentials.token_uri,
  auth_provider_x509_cert_url: dbCredentials.auth_provider_x509_cert_url,
  client_x509_cert_url: dbCredentials.client_x509_cert_url,
  databaseURL: dbCredentials.databaseURL,
});

const db = firebaseApp.firestore();
export default db;
