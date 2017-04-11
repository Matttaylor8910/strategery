(function() {
  angular
    .module('lunchin.home')
    .config(homeConfig);

  function homeConfig($stateProvider) {
    $stateProvider
      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'app/components/home/home.tpl.html',
            controller: 'HomeController',
            controllerAs: '$ctrl'
          }
        }
      });
  }
})();
