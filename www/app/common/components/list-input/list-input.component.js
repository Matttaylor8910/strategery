(function() {
  angular
    .module('lunchin.listInput', [])
    .component('listInput', {
      templateUrl: 'app/common/components/list-input/list-input.tpl.html',
      controller: ListInputController,
      bindings: {
        list        : '=',
        iconClass   : '@',
        placeholder : '@',
        emptyText   : '@'
      }
    });

  function ListInputController($timeout) {
    var $ctrl = this;

    $ctrl.inputText = '';
    $ctrl.identifier = $ctrl.placeholder.replace(/\s/g, '').toLowerCase();

    $ctrl.add = add;
    $ctrl.remove = remove;

    /**
     * Add the input to the list and re-select that input
     * @param name
     */
    function add(name) {
      $ctrl.inputText = '';

      // if name hasn't already been added and isn't blank
      if (!_.includes($ctrl.list, name) && name !== '') {
        $ctrl.list = _.xor($ctrl.list, [name]);
      }

      $timeout(function(){
        $('#add-input-' + $ctrl.identifier).focus();
      }, 0);
    }

    /**
     * Remove an item from the list
     * @param name
     */
    function remove(name) {
      $ctrl.list = _.without($ctrl.list, name);
    }
  }
})();