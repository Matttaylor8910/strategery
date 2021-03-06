(function() {
  angular
    .module('strategery', [
      'ionic',
      'ionic.utils',

      'firebase',

      'strategery.home',
      'strategery.board'
    ])

    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.disableScroll(true);
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }

        // Initialize Firebase
        var config = {
          apiKey: "AIzaSyCZqWSO0Gi6r47CBaKZ3-P-IsWeJrhNETM",
          authDomain: "strategery-2006d.firebaseapp.com",
          databaseURL: "https://strategery-2006d.firebaseio.com",
          projectId: "strategery-2006d",
          storageBucket: "strategery-2006d.appspot.com",
          messagingSenderId: "760038573177"
        };
        firebase.initializeApp(config);
      });
    })

    .config(function($stateProvider, $urlRouterProvider) {
      // if no states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/home');
    });
})();
