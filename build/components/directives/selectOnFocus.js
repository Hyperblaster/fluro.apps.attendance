app.directive('selectOnFocus', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var focusedElement = null;

            element.on('focus', function() {
                var self = this;
                if (focusedElement != self) {
                    focusedElement = self;
                    $timeout(function() {
                        self.select();
                    }, 10);
                }
            });

            element.on('blur', function() {
                focusedElement = null;
            });
        }
    }
});



app.directive('autofocus', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $timeout(function() {
                element.focus();
            });
        }
    }
});


