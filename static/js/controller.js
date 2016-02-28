/**
 * Created by RADWY on 2016-02-09.
 */

var app = angular.module('myApp', ['angularUtils.directives.dirPagination', 'chart.js']);

app.controller('myCtrl', function($scope, $http, $interval){
    $http.get('/cpus').
    success(function(data, status, headers, config) {
      $scope.cpus = data;
              $scope.selectcss = function(data){
            if (data >= 70 && data <= 90) {
                return 'progress-bar progress-bar-warning';
            }else if (data > 90){
                return 'progress-bar progress-bar-danger';
        }else
            {
                return 'progress-bar progress-bar-success';
            }
        };

    }).
    error(function(data, status, headers, config) {


    });
    $interval(function(){$http.get('/cpus').
    success(function(data, status, headers, config) {

      $scope.cpus = data;
              $scope.selectcss = function(data){
            if (data >= 70 && data <= 90) {
                return 'progress-bar progress-bar-warning';
            }else if (data > 90){
                return 'progress-bar progress-bar-danger';
        }else
            {
                return 'progress-bar progress-bar-success';
            }
        };

    }).
    error(function(data, status, headers, config) {

    });
        }, 5000);

});

app.controller('testCtrl', function($scope, $http, $interval){
   $scope.labels = [];
    $scope.series = ['Load'];
  
  $scope.data = [
  ];
    
    $http.get('/cpus').
    success(function(data, status, headers, config) {
      $scope.cpus = data;
      var dataset = []
      data.forEach(function(element) {
          dataset.push(element['cpu']);
          $scope.labels.push('CPU');
          
      }, this);
      $scope.data.push(dataset);

     

    }).
    error(function(data, status, headers, config) {


    });
    $interval(function(){$http.get('/cpus').
    success(function(data, status, headers, config) {
          $scope.data = [
  ];

      $scope.cpus = data;
      var dataset = []
      data.forEach(function(element) {
          dataset.push(element['cpu']);
          console.log(element['cpu']);
      }, this);
      $scope.data.push(dataset);
      

    }).
    error(function(data, status, headers, config) {

    });
        }, 5000);

});



app.controller('memCtrl', function($scope, $http, $interval){
    $http.get('/memory').
    success(function(data, status, headers, config) {
      $scope.memory = data;
        $scope.selectcss = function(data){
            if (data >= 70 && data <= 90) {
                return 'progress-bar progress-bar-warning';
            }else if (data > 90){
                return 'progress-bar progress-bar-danger';
        }else
            {
                return 'progress-bar progress-bar-success';
            }
        };

    }).
    error(function(data, status, headers, config) {

    });
    $interval(function(){$http.get('/memory').
    success(function(data, status, headers, config) {
      $scope.memory = data;
        $scope.selectcss = function(data){
            if (data >= 70 && data <= 90) {
                return 'progress-bar progress-bar-warning';
            }else if (data > 90){
                return 'progress-bar progress-bar-danger';
        }else
            {
                return 'progress-bar progress-bar-success';
            }
        };

    }).
    error(function(data, status, headers, config) {

    });
        }, 2000);

});
app.controller('diskCtrl', function($scope, $http, $interval){
    $http.get('/disks').
    success(function(data, status, headers, config) {
      $scope.disks = data;
        $scope.selectcss = function(data){
            if (data >= 70 && data <= 90) {
                return 'progress-bar progress-bar-warning';
            }else if (data > 90){
                return 'progress-bar progress-bar-danger';
        }else
            {
                return 'progress-bar progress-bar-success';
            }
        };

    }).
    error(function(data, status, headers, config) {

    });
    $interval(function(){$http.get('/disks').
    success(function(data, status, headers, config) {
      $scope.disks = data;
        $scope.selectcss = function(data){
            if (data >= 70 && data <= 90) {
                return 'progress-bar progress-bar-warning';
            }else if (data > 90){
                return 'progress-bar progress-bar-danger';
        }else
            {
                return 'progress-bar progress-bar-success';
            }
        };

    }).
    error(function(data, status, headers, config) {

    });
        }, 10000);

});

app.controller('procCtrl', function($scope, $http, $interval){
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    };
    $scope.killprocess = function(pid, name){

    $http.post('/processes/'+ pid).success(function (data,status,headers,config){
    $('#info').removeClass('hidden').text("Process "+ name + " killed.").fadeOut(2000);
    $('#search').val(' ');}).error(function(data, status, headers, config) {
     $('#info').removeClass('hidden').text("Unable to kill process: "+ name ).fadeOut(2000)
    })};


    $http.get('/processes').
    success(function(data, status, headers, config) {
      $scope.processes = data;

    }).
    error(function(data, status, headers, config) {

    });
    $interval(function(){$http.get('/processes').
    success(function(data, status, headers, config) {
      $scope.processes = data;



    }).
    error(function(data, status, headers, config) {

    });
        }, 10000);

});


app.controller('uptimeCtrl', function($scope, $http, $interval){

    $http.get('/uptime').
    success(function(data, status, headers, config) {
      $scope.uptime = data;


    }).
    error(function(data, status, headers, config) {

    });
    $interval(function(){$http.get('/uptime').
    success(function(data, status, headers, config) {
      $scope.uptime = data;


    }).
    error(function(data, status, headers, config) {

    });
        }, 1000);

});