// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAwm7vXYEh7jxpBTWEVQubX42GallXKZJA",
    authDomain: "teamdagarna-5fb26.firebaseapp.com",
    databaseURL: "https://teamdagarna-5fb26.firebaseio.com",
    projectId: "teamdagarna-5fb26",
    storageBucket: "teamdagarna-5fb26.appspot.com",
    messagingSenderId: "720945040252"
  },
  algolia: {
   appId: 'app-id',
   apiKey: 'search-only-key'
 }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
