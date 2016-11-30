/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */

angular
  .module('tunely', ['ngRoute'])
  .config(config)

function config($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/templates/albums',
      controllerAs: 'albums',
      controller: 'AlbumsIndexController'
    })
    .when('/albums/:id', {
      templateUrl: '/templates/albums-show',
      controllerAs: 'oneAlbum',
      controller: 'AlbumsShowController'
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}
