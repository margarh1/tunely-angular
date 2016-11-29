/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */

angular
  .module('tunely', [])
  .controller('AlbumsIndexController', AlbumsIndexController);

function AlbumsIndexController($http) {
  var vm = this;
  vm.newAlbum = {};

  vm.newAlbum = {
    name: 'Licensed to Ill',
    artistName: 'Beastie Boys'
  };

  vm.albumsList

  $http({
    method: 'GET',
    url: '/api/albums'
  }).then(onGetSuccess, onError);

  vm.createAlbum = function() {
    console.log(vm.newAlbum)
    $http({
      method: 'POST',
      url: '/api/albums',
      data: vm.newAlbum
    }).then(onPostSuccess, onError);
  };

  function onGetSuccess(albums) {
    vm.albumsList = albums.data;
  };

  function onPostSuccess(album) {
    vm.albumsList.push(album.data);
    vm.newAlbum = {};
  };

  function onError(err) {
    console.log(err)
  };

  // vm.albumsList = [
  //   {
  //     name: 'Coming Home',
  //     artistName: 'Leon Bridges'
  //   },
  //   {
  //     name: 'Are We There',
  //     artistName: 'Sharon Van Etten'
  //   },
  //   {
  //     name: 'The Queen is Dead',
  //     artistName: 'The Smiths'
  //   }
  // ];
}