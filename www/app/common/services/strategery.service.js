(function() {
  angular
    .module('strategery')
    .factory('strategery', strategery);

  function strategery($firebaseObject, $firebaseArray) {
    var playerColors = ['red', 'blue', 'green', 'purple', 'black', 'yellow'];

    var games;

    var service = {
      // reference to the firebase database
      ref       : undefined,

      getGame   : getGame,
      getGames  : getGames,
      addGame   : addGame,
      removeGame: removeGame
    };

    init();

    return service;

    /**
     * Initialize the connection to the firebase database
     */
    function init() {
      service.ref = firebase.database().ref();
      games = $firebaseArray(service.ref.child('games'));
    }

    /**
     * Get a game for given a specific id
     * @param id
     * @returns {*}
     */
    function getGame(id) {
      return $firebaseObject(service.ref.child('games/' + id));
    }

    /**
     * Get a games object from the server
     */
    function getGames() {
      return games;
    }

    /**
     * Generate a game and add it to the database
     * @param name
     * @param gridSize
     * @param numPlayers
     */
    function addGame(name, gridSize, numPlayers) {
      return new Promise(function (resolve) {
        var game = {
          name: name,
          rows: generateGrid(gridSize, numPlayers)
        };
        games.$add(game).then(function (ref) {
          resolve(ref);
        });
      });
    }

    /**
     * Remove a given game from the database
     * @param record
     */
    function removeGame(record) {
      games.$remove(record);
    }

    /**
     * Generate a random grid given the grid size and number of players
     * @param gridSize
     * @param numPlayers
     * @returns {Array}
     */
    function generateGrid(gridSize, numPlayers) {
      var rows = [];
      for (var r = 0; r < gridSize; r++) {
        var cols = [];
        for (var c = 0; c < gridSize; c++) {
          cols.push({
            team: playerColors[_.random(numPlayers - 1)],
            value: _.random(1, 5)
          });
        }
        rows.push({ cols: cols });
      }
      return rows;
    }
  }
})();
