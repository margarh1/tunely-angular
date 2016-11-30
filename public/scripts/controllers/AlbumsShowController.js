angular
  .module('tunely')
  .controller('AlbumsShowController', AlbumsShowController);

function AlbumsShowController($http, $routeParams) {
  var vm = this;

  $http({
    method: 'GET',
    url: '/api/albums/' + $routeParams.id
  }).then(onSuccess, onError);

  function onSuccess(album) {
    vm.album = album.data;
  };

  function onError(err) {
    console.log(err);
  };
}