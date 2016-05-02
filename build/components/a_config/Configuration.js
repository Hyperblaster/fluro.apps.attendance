var app = angular.module('fluro', [
    'ngAnimate',
    'ngResource',
    'ui.router',
    'ngTouch',
    'fluro.config',
    'fluro.content',
    'ui.bootstrap',
])


/////////////////////////////////////////////////////////////////////

app.config(function($stateProvider, $httpProvider, FluroProvider, $urlRouterProvider, $locationProvider) {

    //Set the Fluro API URL
    //var apiURL = 'http://v2.api.fluro.dev:3000';
    var apiURL = 'https://apiv2.fluro.io';

    //Setup Defaults
    FluroProvider.set({
        apiURL: apiURL,    
        sessionStorage:false, //Set this to true if you want to use sessionStorage instead of localStorage
    });

    ///////////////////////////////////////////

    //Add the fluro interceptor to handle tokens and timezones etc
    $httpProvider.interceptors.push('FluroAuthentication');

    ///////////////////////////////////////////

    //$locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");

    ///////////////////////////////////////////

    $stateProvider.state('auth', {
        url: '/',
        templateUrl: 'routes/auth/login.html',
        controller: 'LoginController',
    })


    ///////////////////////////////////////////

    $stateProvider.state('counter', {
        url: '/counter',
        templateUrl: 'routes/counter/counter.html',
        controller: 'CounterController',
        resolve:{
            events:function(EventService) {
                return EventService.refresh().$promise;

                
            }
        }
    })



    ///////////////////////////////////////////

    $urlRouterProvider.otherwise("/");

});

/////////////////////////////////////////////////////////////////////

//We include FluroTokenService as a dependency so that it can automatically recall
//saved tokens, it does this on init()

app.run(function($rootScope, Asset, FluroTokenService, $state) {

    $rootScope.asset = Asset;
    $rootScope.$state = $state;

    //////////////////////////////////////////////////////////////////

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        console.log('state change error', error)
        if(error.status == 401) {
            FluroTokenService.deleteSession();
            $state.go('auth');
        }
        throw error;
    });

    //////////////////////////////////////////////////////

    //Make touch devices more responsive
    FastClick.attach(document.body);

});