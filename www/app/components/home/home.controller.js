(function() {
  angular
    .module('strategery.home')
    .controller('HomeController', HomeController);

  function HomeController() {
    var $ctrl = this;

    $ctrl.rows = [
      {
        cols: [
          {
            color: 'red',
            value: 8
          },
          {
            color: 'red',
            value: 4
          }
        ]
      },
      {
        cols: [
          {
            color: 'blue',
            value: 7
          },
          {
            color: 'blue',
            value: 6
          }
        ]
      }
    ];

    firebase.database().ref('rows').set($ctrl.rows);
  }
})();
