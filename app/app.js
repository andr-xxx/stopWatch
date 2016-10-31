// умышленно исспользован контроллер монолит и всего один файл, т.к. маштабирования приложения не будет

var stopWatch = angular.module('stopWatch', []);

stopWatch.controller('stopWatchCtrl', function ($scope, $interval) {
   $scope.settings = {
      startStop: true,
      clearLap: true,
      active: false
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
      $scope.settings.active = true;
      clearTimer();
      startTimer($scope.lap);
      startTimer($scope.timer);
      $scope.settings.startStop = false;
      $scope.settings.clearLap = true;
      $scope.lapArr = [];
   };

   $scope.stop = function () {
      pauseTimer($scope.lap.id);
      pauseTimer($scope.timer.id);
      $scope.settings.startStop = true;
      $scope.settings.clearLap = false;
      $scope.settings.active = false;
   };

   $scope.clear = function () {
      $scope.settings.clearLap = true;
      $scope.lapArr = [];
      clearTimer();
   };
   $scope.lapC = function () {
      if ($scope.settings.active) {
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
      }
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

   var clearTimer = function () {
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

});