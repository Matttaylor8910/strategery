(function() {
  angular
    .module('strategery.home')
    .controller('HomeController', HomeController);

  function HomeController($scope, $state, $ionicModal, strategery) {
    var $ctrl = this;

    $ctrl.addGame = addGame;

    init();

    /**
     * Initialize the
     */
    function init() {
      $ctrl.loading = true;
      $ctrl.games = strategery.getGames();

      $ctrl.games.$loaded().then(function(data) {
        $ctrl.loading = false;
        console.log('loaded');
      });

      // load the modal
      $ionicModal.fromTemplateUrl('app/components/home/create-game/create-game-modal.tpl.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $ctrl.modal = modal;
        $scope.$ctrl = $ctrl;
      });
    }

    /**
     * Add a game from the modal then nav to that game
     * @param name
     * @param gridSize
     * @param numPlayers
     */
    function addGame(name, gridSize, numPlayers) {
      $ctrl.modal.hide();
      strategery.addGame(name, gridSize, numPlayers).then(function (ref) {
        $state.go('board', { id: ref.key });
      });
    }
  }
})();
