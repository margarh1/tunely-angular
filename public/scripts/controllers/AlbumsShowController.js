angular
  .module('tunely')
  .controller('AlbumsShowController', AlbumsShowController);

function AlbumsShowController($http, $routeParams) {
  var vm = this;
  vm.newSong = {};

  $http({
    method: 'GET',
    url: '/api/albums/' + $routeParams.id
  }).then(onSuccess, onError);

  vm.addSong = function(album) {
    $http({
      method: 'POST',
      url: '/api/albums/' + album._id + '/songs',
      data: vm.newSong
    }).then(onNewSongSuccess, onError);
  };

  vm.editSong = function(song) {
    $http({
      method: 'PUT',
      url: '/api/albums/' + vm.album._id + '/songs/' + song._id,
      data: song
    }).then(onEditSongSuccess, onError);
  };

  vm.deleteSong = function(song) {
    $http({
      method: 'DELETE',
      url: '/api/albums/' + vm.album._id + '/songs/' + song._id
    }).then(onDeleteSongSuccess, onError);
  };

  function onSuccess(album) {
    vm.album = album.data;
  };

  function onNewSongSuccess(song) {
    vm.album.songs.push(song.data);
    vm.newSong = {};
  };

  function onEditSongSuccess(editedSong) {
    console.log(editedSong)
    var editedSongIdx = vm.album.songs.indexOf(editedSong.config.data);
    vm.album.songs.splice(editedSongIdx, 1, editedSong.data);
  };

  function onDeleteSongSuccess(deletedSong) {
    for (var idx = 0; idx < vm.album.songs.length; idx++) {
      if (vm.album.songs[idx].name === deletedSong.data.name) {
        vm.album.songs.splice(idx, 1);
      };
    };
  };

  function onError(err) {
    console.log(err);
  };
}