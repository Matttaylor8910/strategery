(function() {
  angular
    .module('strategery.home')
    .config(homeConfig);

  function homeConfig($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/components/home/home.tpl.html',
        controller: 'HomeController',
        controllerAs: '$ctrl'
      });
  }
})();
