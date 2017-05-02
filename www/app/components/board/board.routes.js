(function() {
  angular
    .module('strategery.home')
    .config(homeConfig);

  function homeConfig($stateProvider) {
    $stateProvider
      .state('board', {
        url: '/board/:id',
        templateUrl: 'app/components/board/board.tpl.html',
        controller: 'BoardController',
        controllerAs: '$ctrl'
      });
  }
})();
