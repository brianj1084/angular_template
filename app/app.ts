/// <reference path="_references.ts" />

namespace app {
    'use strict';

    var app = angular.module('app', ['ui.router', 'ui.bootstrap']);

    app.config(($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider, $locationProvider: ng.ILocationProvider) => {
        $stateProvider.state('app', {
            url: '',
            abstract: true,
            templateUrl: 'views/app.html',
            controller: 'AppController',
            controllerAs: 'ctrl'
        });

        $stateProvider.state('app.home', {
            url: '/home',
            views: {
                'content': {
                    templateUrl: 'views/home.html',
                    controller: 'HomeController',
                    controllerAs: 'ctrl'
                }
            }
        });

        $urlRouterProvider.otherwise('/home');
        
        $locationProvider.html5Mode(true);
    });
    
    app.controller('AppController', controllers.AppController);
    app.controller('HomeController', controllers.HomeController);
}