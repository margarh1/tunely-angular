/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */

angular
  .module('tunely', ['ngRoute'])
  .config(config)
  .controller('AlbumsIndexController', AlbumsIndexController);

config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      template: '/templates/albums',
      controllerAs: 'albums',
      controller: 'AlbumsIndexController'
    })
    .when('/albums/:id', {
      template: 'This template will show an album!',
      controllerAs: 'oneAlbum',
      controller: 'AlbumsShowController'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}

function AlbumsIndexController($http) {
  var vm = this;
  vm.newAlbum = {};
  vm.albumsList

  $http({
    method: 'GET',
    url: '/api/albums'
  }).then(onGetSuccess, onError);

  vm.createAlbum = function() {
    $http({
      method: 'POST',
      url: '/api/albums',
      data: vm.newAlbum
    }).then(onPostSuccess, onError);
  };

  vm.deleteAlbum = function(album) {
    $http({
      method: 'DELETE',
      url: '/api/albums/' + album._id,
    }).then(onDeleteSuccess, onError);
  };

  vm.editAlbum = function(album) {
    $http({
      method: 'PUT',
      url: '/api/albums/' + album._id,
      data: album
    }).then(onEditSuccess, onError);
  };

  function onGetSuccess(albums) {
    vm.albumsList = albums.data;
  };

  function onPostSuccess(newAlbum) {
    vm.albumsList.push(newAlbum.data);
    vm.newAlbum = {};
  };

  function onDeleteSuccess(deletedAlbum) {
    var deletedAlbumIdx = vm.albumsList.indexOf(deletedAlbum);
    vm.albumsList.splice(deletedAlbumIdx, 1);
  };

  function onEditSuccess(editedAlbum) {
    var editedAlbumIdx = vm.albumsList.indexOf(editedAlbum.config.data);
    vm.albumsList.splice(editedAlbumIdx, 1, editedAlbum.data);
  }

  function onError(err) {
    console.log(err)
  };
}
