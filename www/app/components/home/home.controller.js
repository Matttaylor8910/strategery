(function() {
  angular
    .module('lunchin.home')
    .controller('HomeController', HomeController);

  function HomeController($timeout, $location, $ionicScrollDelegate, localStorage) {
    var $ctrl = this;

    $ctrl.numGroups = 2;
    $ctrl.peeps = localStorage.getArray('peeps');
    $ctrl.places = localStorage.getArray('places');
    $ctrl.hasRolled = false;

    $ctrl.roll = roll;
    $ctrl.reset = reset;

    /**
     * Form groups and enter rolled state
     */
    function roll() {
      $ctrl.groups = formGroups(_.shuffle($ctrl.peeps), _.shuffle($ctrl.places), $ctrl.numGroups);
      $ctrl.hasRolled = true;

      localStorage.setArray('peeps', $ctrl.peeps);
      localStorage.setArray('places', $ctrl.places);

      $timeout(function() {
        $location.hash('groups');
        $ionicScrollDelegate.anchorScroll(true);
      }, 0);
    }

    /**
     * Reset to a clear state
     */
    function reset() {
      $ctrl.numGroups = 2;
      $ctrl.peeps = [];
      $ctrl.places = [];
      $ctrl.hasRolled = false;
      $ctrl.groups = [];

      $ionicScrollDelegate.scrollTop(true);
    }

    /**
     * Form some groups given a list of people, list of places, and number of groups to form
     * Assume: the lists passed in are already in a shuffled or prioritized order
     * @param peeps
     * @param places
     * @param numGroups
     * @returns {Array}
     */
    function formGroups(peeps, places, numGroups) {
      // form the n groups
      var groups = _.map(_.take(places, numGroups), function(place) {
        return { place: place, peeps: [] };
      });

      // evenly distribute peeps into groups
      _.each(peeps, function(peep, index) {
        groups[index % groups.length].peeps.push(peep);
      });

      return groups;
    }
  }
})();
