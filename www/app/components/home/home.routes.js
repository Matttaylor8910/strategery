(function() {
  angular
    .module('strategery.home')
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
