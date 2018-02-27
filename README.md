# Maksha

* [https://alvarez.tech](https://alvarez.tech)
* [https://maksha-41f4f.firebaseapp.com](https://maksha-41f4f.firebaseapp.com)

## Used technologies

### Angular CLI

* [cli.angular.io](https://cli.angular.io/)
* [github.com/angular/angular-cli](https://github.com/angular/angular-cli)

### Angular Material

* [material.angular.io](https://material.angular.io/)
* [github.com/angular/material2](https://github.com/angular/material2)

### AngularFire2

* [github.com/angular/angularfire2](https://github.com/angular/angularfire2)

## Angular CLI commands

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Requirements

The project requires a file with Firebase keys called `src/app/keys.ts`.

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