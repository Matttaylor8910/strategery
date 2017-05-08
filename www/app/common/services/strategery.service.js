(function() {
  angular
    .module('strategery')
    .factory('strategery', strategery);

  function strategery($firebaseObject, $firebaseArray) {
    var playerColors = ['red', 'blue', 'green', 'purple', 'black', 'yellow'];

    var games;
    var gamesList;

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
      gamesList = $firebaseArray(service.ref.child('gamesList'));
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
     * Get a list of the games from the server
     */
    function getGames() {
      return gamesList;
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
          gamesList.$add({
            id: ref.key,
            name: name
          });
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
      // set mountains and/or other things
      for (var r = 0; r < gridSize; r++) {
        var cols = [];
        for (var c = 0; c < gridSize; c++) {
          var tile, random = _.random(20);
          if (random === 0) {
            tile = { class: 'city', value: _.random(40, 50) };
          } else if (random > 15) {
            tile = { class: 'mountain' };
          } else {
            tile = { class: 'blank' };
          }
          cols.push(tile);
        }
        rows.push({ cols: cols });
      }
      // set home bases
      for (var p = 0; p < numPlayers; p++) {
        var coordinates = getRandomEmptyLocation(rows);
        rows[coordinates.x].cols[coordinates.y] = {
          class: playerColors[p] + ' home',
          value: 1
        };
      }
      return rows;
    }

    /**
     * Get a random empty location on a grid
     * @param grid
     * @returns {*} - a coordinate
     */
    function getRandomEmptyLocation(grid) {
      var coordinates = {
        x: _.random(grid.length - 1),
        y: _.random(grid.length - 1)
      };
      if (grid[coordinates.x].cols[coordinates.y].class === 'empty') {
        return getRandomEmptyLocation(grid);
      } else {
        return coordinates;
      }
    }
  }
})();
