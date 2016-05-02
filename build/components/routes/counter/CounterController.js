/////////////////////////////////////////////////////

app.controller('CounterController', function($scope, $rootScope, events, EventService, FluroContent) {

    console.log('Events', events);


    $scope.eventService = EventService;

    $scope.counter = {
        count:0,
        status:'ready'
    };

    $scope.refreshing = false;

    /////////////////////////////////////////////

    $scope.reset = function() {
        $scope.counter.count = 0;
        $scope.counter.status = 'ready';
    }

    $scope.add = function() {
        $scope.counter.count++;
    }

    $scope.subtract = function() {
        if($scope.counter.count > 0) {
            $scope.counter.count--;
        }
    }

    /////////////////////////////////////////////

    $scope.quantity = function() {

        var className = '';
        var string = String($scope.counter.count);

        if(string.length > 3) {
            className = 'thousands';
        }

        if(string.length > 4) {
            className = 'ten-thousands';
        }
       

        return className;
    }

    /////////////////////////////////////////////

    $scope.refreshEvents = function() {
        $scope.refreshing = true;
        var promise = $scope.eventService.refresh().$promise;

        promise.then(function() {
            console.log('Refrshed events')
            $scope.refreshing = false;
        }, function() {
            $scope.refreshing = false;
        });

    }

    /////////////////////////////////////////////

    $scope.$watch('eventService.events', function(events) {
        if(!events || !events.length) {
            $scope.counter.event = null;
        }

        if(events.length == 1) {
            $scope.counter.event = events[0]._id;
        }
    })
    
    $scope.submit = function() {

        $scope.counter.status = 'processing';

        if(!$scope.counter.event || !$scope.counter.event.length) {
            return;
        }

        if(!$scope.counter.count) {
            return;
        }

        var data = {}
        data.count = $scope.counter.count;

        if($rootScope.user && $rootScope.user.name) {
            data.title = $rootScope.user.name + "'s report";
        }


        function success(res) {
            $scope.counter.status = 'success';
            console.log('Success!', res);
        }

        function fail(res) {
            $scope.counter.status = 'failed';
            console.log('Failed', res);
        }

        FluroContent.endpoint('attendance/' + $scope.counter.event).save(data, success, fail);

    }


});