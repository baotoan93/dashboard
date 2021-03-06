(function() {
    'use strict';

    angular
        .module('app.application.classes')
        .controller('ClassesController', function($scope, $http, $cookies, $window, $state, $stateParams,
            $mdDialog, $document, $rootScope, msSchemasService, ClassesService) {

            var schemaObj = msSchemasService.getSchema($stateParams.index);
            var accessToken = $cookies.get('accessToken');
            if (!accessToken) {
                $state.go('app.pages_auth_login');
            }

            if (!schemaObj) {
                $state.go('app.managements_applications');
            }

            $scope.className = schemaObj.className;
            $scope.fields = Object.getOwnPropertyNames(schemaObj.fields);

            for(var index in $scope.fields){
                if($scope.fields[index]==='ACL'){
                    $scope.fields.splice(index, 1);
                }
            }
            $scope.appId = msSchemasService.getAppId();
            $scope.columnName = '';

            ClassesService.getDocuments($scope.className, $scope.appId, function(result) {
                $scope.documents = result;
            });

            $rootScope.$on('fields-change', function(event, args) {
                $scope.fields = Object.getOwnPropertyNames(args.fields);
                for(var index in $scope.fields){
                    if($scope.fields[index]==='ACL'){
                        $scope.fields.splice(index, 1);
                    }
                }
            });
            // $scope.addColumn = function() {
            // ClassesService.addColumn($scope.className, $scope.appId, accessToken, $scope.columnName,
            //     function(result) {
            //         msSchemasService.updateFields($scope.className, result.fields);
            //         $scope.fields.push($scope.columnName);
            //     });

            // var key = $scope.Key;
            // var count = 0;

            // for (var k in $scope.classes[0]) {
            //     if (key === k) {
            //         alert("Column already exists!!");
            //         count++;
            //     }
            // }

            // if (count == 0 && key != "" && key != null) {
            //     $('#table thead tr').append($("<th>"));
            //     $('#table thead tr>th:last').html(key);
            //     $('#table tbody tr').append($("<td>"));
            //     for (var i = 0; i < $scope.classes.length; i++) {
            //         $scope.classes[i][key] = null;
            //         var index = i + 1;
            //         $('#table tbody tr:eq(' + i + ')').children('td:last')
            //             .append("<input type='text' id='" + index + "txtVal' name='" + index +
            //                 "txtVal' ng-model='Val' placeholder='Value'>");
            //     }
            // }
            // $scope.Key = '';
            // var keys = [];
            // for (var k in $scope.classes[0]) {
            //     if (k != "id" && k != "CreateAt" && k != "UpdateAt") {
            //         keys.push(k);
            //     }
            // }

            // var strVal = [];
            // for (var i = 0; i < $scope.classes.length; i++) {
            //     var index = i + 1;
            //     $('input[name="' + index + 'txtVal"]').each(function() {
            //         strVal.push($(this).val());
            //     });
            // }

            // for (var j = 0; j < $scope.classes.length; j++) {
            //     for (var i = 0; i < keys.length; i++) {
            //         $scope.classes[j][keys[i]] = strVal.shift();
            //     }
            // }
            // console.log($scope.classes);
            // };

            $scope.showDialog = function(ev) {
                $mdDialog.show({
                    controller: 'DialogController',
                    controllerAs: 'vm',
                    templateUrl: 'app/main/application/classes/dialogs/dialog.html',
                    parent: angular.element($document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                });
            };

            $scope.showAddColumnDialog = function(ev) {
                $mdDialog.show({
                    controller: 'DialogController',
                    controllerAs: 'vm',
                    templateUrl: 'app/main/application/classes/dialogs/addColumnDialog.html',
                    parent: angular.element($document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                });
            }

            $scope.showDelColumnDialog = function(ev) {
                $mdDialog.show({
                    controller: 'DialogController',
                    controllerAs: 'vm',
                    templateUrl: 'app/main/application/classes/dialogs/delColumnDialog.html',
                    parent: angular.element($document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                });
            }
        });
})();
