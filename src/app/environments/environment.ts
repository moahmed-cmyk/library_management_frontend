// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  // ? NODE BASE URL
  RESTBASEURL: 'http://localhost:3005',
  // ? BASE URL
  BASEURL: ' http://localhost:4200',

  // ? LOCAL SERVER
  // RESTBASEURL: 'https://bitenode.ahsan.cloud/',
  // BASEURL: 'https://biteadmin.ahsan.cloud/',

  // ? STAGING SERVER
  // RESTBASEURL: 'https://testnode.tryrouh.com/',
  // BASEURL: 'https://test.tryrouh.com/',

  // ? PRODUCTION SERVER
  // RESTBASEURL: 'https://rservice.tryrouh.com/',
  // BASEURL: 'https://admin.tryrouh.com/',

  // ? SECRET KEY FOR ENCRYPTION & DECRYPTION
  SECRETKEY: 'be4671fca118a2eac9db6b81e89d078bd1a259c6f8d20ed291946235a12e46ad0d0046059e434d2ab42dbb032aec02f153bfa9e65644ad75691a2653a2ad7602'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
//  * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
