'use strict';

angular.module('lemur')

  .config(function config($stateProvider) {
    $stateProvider.state('logs', {
      url: '/logs',
      templateUrl: '/angular/logs/view/view.tpl.html',
      controller: 'DomainsViewController'
    });
  })

  .controller('DomainsViewController', function ($scope, $uibModal, DomainApi, DomainService, ngTableParams) {
    $scope.filter = {};
    $scope.logsTable = new ngTableParams({
      page: 1,            // show first page
      count: 10,          // count per page
      sorting: {
        id: 'desc'     // initial sorting
      },
      filter: $scope.filter
    }, {
      total: 0,           // length of data
      getData: function ($defer, params) {
        DomainApi.getList(params.url()).then(function (data) {
            params.total(data.total);
            $defer.resolve(data);
          });
      }
    });
  });
