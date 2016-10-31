// умышленно исспользован контроллер монолит и всего один файл, т.к. маштабирования приложения не будет

var stopWatch = angular.module('stopWatch', []);

stopWatch.controller('stopWatchCtrl', function ($scope, $interval) {
   $scope.visible = {
      startStop: true,
      clearLap: true
   };
   $scope.lap = {
      ms: '00',
      sec: '00',
      min: '00'
   };
   $scope.timer = {
      ms: '00',
      sec: '00',
      min: '00'
   };
   $scope.lapArr = [];

   $scope.start = function () {
      startTimer($scope.lap);
      startTimer($scope.timer);
      $scope.visible.startStop = false;
      $scope.visible.clearLap = true;
      $scope.lapArr = [];
   };

   $scope.stop = function () {
      stopTimer();
      $scope.visible.startStop = true;
      if ($scope.lapArr.length > 0) {
         $scope.visible.clearLap = false;
      }
   };

   $scope.clear = function () {
      $scope.visible.clearLap = true;
      $scope.lapArr = [];
   };
   $scope.lapC = function () {
      if (!$scope.timer.id) {
         return
      }
      var tempObj = {
         ms: $scope.lap.ms,
         sec: $scope.lap.sec,
         min: $scope.lap.min
      };
      $scope.lap = {
         ms: '00',
         sec: '00',
         min: '00'
      };
      startTimer($scope.lap)
      $scope.lapArr.push(tempObj)
   };


   var startTimer = function (obj) {
      obj.id = $interval(function () {
         if (+obj.ms >= 99) {
            obj.ms = '00';
            obj.sec = +obj.sec + 1;
            if (+obj.sec < 10) {
               obj.sec = '0' + obj.sec
            }
         } else if (+obj.sec > 59) {
            obj.sec = '00';
            obj.ms = '00';
            obj.min = +obj.min + 1;
            if (+obj.min < 10) {
               obj.min = '0' + obj.min
            }
         } else if (+obj.min > 59) {
            stopTimer();
         } else {
            obj.ms = +obj.ms + 1;
            if (+obj.ms < 10) {
               obj.ms = '0' + obj.ms
            }
         }
      }, 10)
   };

   var pauseTimer = function (id) {
      $interval.cancel(id)
   };

   var stopTimer = function () {
      pauseTimer($scope.lap.id);
      pauseTimer($scope.timer.id);
      $scope.lap = {
         ms: '00',
         sec: '00',
         min: '00'
      };
      $scope.timer = {
         ms: '00',
         sec: '00',
         min: '00'
      };
   };
   var clearTimer = function (obj) {
      obj = {
         ms: '00',
         sec: '00',
         min: '00'
      };
   }
});