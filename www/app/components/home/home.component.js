(function() {
  angular
    .module('lunchin.home', [])
    .component('lunchinHome', {
      templateUrl: 'app/components/home/home.tpl.html',
      controller: HomeController
    });

  function HomeController() {
    var $ctrl = this;
  }
})();
