(function() {
  angular
    .module('strategery.home')
    .controller('HomeController', HomeController);

  function HomeController($firebaseArray) {
    var $ctrl = this;

    var ref = firebase.database().ref().child("rows");
    $ctrl.rows = $firebaseArray(ref);

    $ctrl.add = add;

    function add() {
      $ctrl.rows.$add({
        cols: [
          {
            color: 'purple',
            value: $ctrl.one || 0
          },
          {
            color: 'grey',
            value: $ctrl.two || 0
          }
        ]
      });
    }
  }
})();
