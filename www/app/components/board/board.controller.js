(function() {
  angular
    .module('strategery.board')
    .controller('BoardController', BoardController);

  function BoardController($state, $stateParams, strategery) {
    var $ctrl = this;

    init();

    /**
     * Initialize and load the board
     */
    function init() {
      if (!$stateParams.id) {
        $state.go('tab.home');
        return;
      }

      $ctrl.game = strategery.getGame($stateParams.id);

      // After we've gotten a response from the server, make sure this is a legit game
      $ctrl.game.$loaded()
        .then(function(data) {
          if (!data.name || !data.rows) {
            $ctrl.errorText = 'Oops, you\'re somewhere you don\'t belong';
          }
        })
        .catch(function(error) {
          $ctrl.errorText = 'We\'re having troubles connecting to our database, try again?';
          console.log(error);
        });
    }
  }
})();
