(function() {
  angular
    .module('strategery.board')
    .controller('BoardController', BoardController);

  function BoardController($state, $ionicPopup, strategery) {
    var $ctrl = this;

    $ctrl.promptExit = promptExit;

    init();

    /**
     * Initialize and load the board
     */
    function init() {
      if (!$state.params.id) {
        $state.go('home');
        return;
      }

      $ctrl.loading = true;
      $ctrl.game = strategery.getGame($state.params.id);

      // After we've gotten a response from the server, make sure this is a legit game
      $ctrl.game.$loaded()
        .then(function(data) {
          if (!data.name || !data.rows) {
            $ctrl.errorText = 'Oops, you\'re somewhere you don\'t belong';
          }
          $ctrl.loading = false;
        })
        .catch(function(error) {
          $ctrl.errorText = 'We\'re having troubles connecting to our database, try again?';
          console.log(error);
        });
    }

    function promptExit() {
      $ionicPopup.confirm({
        title: 'LEAVE GAME?',
        template: '<div class="text-center">Are you sure you want to leave this game?</div>',
        cancelText: 'CANCEL',
        okText: 'LEAVE',
        okType: 'button-dark'
      }).then(function (shouldLeave) {
        if (shouldLeave) {
          $state.go('home');
        }
      });
    }
  }
})();
