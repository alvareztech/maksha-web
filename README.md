# Maksha project

This is the first version of ALVAREZ.tech website: [https://alvarez.tech](https://alvarez.tech)

## Technologies

### Firebase

* Firebase Realtime Database
* Firebase Authentication
* Firebase Cloud Funcions
* Firebase Hosting

> Something more...

### Angular

* Angular CLI
 * [cli.angular.io](https://cli.angular.io/)
 * [github.com/angular/angular-cli](https://github.com/angular/angular-cli)

* Angular Material
 * [material.angular.io](https://material.angular.io/)
 * [github.com/angular/material2](https://github.com/angular/material2)

* AngularFire2
 * [github.com/angular/angularfire2](https://github.com/angular/angularfire2)

> Something more...

## For your own version 

0. Clone the repository
1. `npm install`
2. Create your Firebase project and prepare the services: [console.firebase.google.com](https://console.firebase.google.com)
3. Create the file `/src/app/keys.ts` with your Firebase project information:

```typescript
export const FIREBASE_CONFIG = {
  apiKey: 'API_KEY_HERE',
  authDomain: 'DOMAIN_HERE',
  databaseURL: 'URL_HERE',
  projectId: 'PROJECT_ID_HERE',
  storageBucket: 'STORAGE_BUCKET_HERE',
  messagingSenderId: 'SENDER_ID_HERE'
};
```

4. `ng serve`
5. Enjoy! XD

Soon more information and new version. You can write me to: daniel@alvarez.tech