(function() {
  angular
    .module('strategery', [
      'ionic',
      'ionic.utils',

      'strategery.home'
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
      });
    })

    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
      // setup an abstract state for the tabs directive
        .state('tab', {
          abstract: true,
          templateUrl: 'app/common/components/tabs/tabs.tpl.html',
          controller: function () {}
        });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/home');
    });
})();
