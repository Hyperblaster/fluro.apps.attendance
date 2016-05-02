app.service('EventService', function(FluroContent) {

    var controller = {};

    ////////////////////////////////////////////////

    controller.refresh = function() {

            //Start date (midnight this morning)
            var start = new Date();
            start.setHours(0, 0, 0, 0);

            //End date (midnight tonight)
            var end = new Date();
            end.setHours(23, 59, 59, 999);

            var request =  FluroContent.resource('event', true, true).query({
                fields: [
                    'title',
                    'startDate',
                    'endDate',
                    'status',
                ],
                allDefinitions: true,
                startDate: start,
                endDate: end,
                sort: 'startDate'
            });

            request.$promise.then(function(res) {
            	console.log('Refreshed event service', res)
            	controller.events = res;
            }, function(res) {
            	console.log('Failed to update event service', res);
            	controller.events= [];
            })

            console.log('REQUEST', request);


            return request;
        }

        ////////////////////////////////////////////////

    return controller;
})