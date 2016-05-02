/////////////////////////////////////////////////////

app.controller('LoginController', function($scope, $state, Fluro, FluroTokenService) {

    //Create credentials defaulting to local storage
    $scope.credentials = {
        remember: true,
    };

    ////////////////////////////////////////////

    $scope.processing = false;

    ////////////////////////////////////////////

    $scope.switchSession = function(accountId) {
        var request = FluroTokenService.getTokenForAccount(accountId);

        request.error(function(res) {
            console.log('Error switching session', res);
        });

        request.success(function(res) {
            $state.go('counter');
        });
    }




////////////////////////////////////////////

$scope.login = function() {

    $scope.processing = true;

    if ($scope.credentials.remember) {
        //Use localStorage for tokens
        Fluro.sessionStorage = false;
    } else {
        //Use sessionStorage
        Fluro.sessionStorage = true;
    }

    //////////////////////////////////

    //Use the token service to authenticate
    var request = FluroTokenService.login($scope.credentials);

    /**/
    //On success redirect to the next page
    request.success(function(res) {
        console.log('Login Successful!', res);
        $scope.processing = false;
    })

    //If we failed then tell the user
    request.error(function(res) {
        console.log('Error', res);
        $scope.processing = false;
    })

}

////////////////////////////////////////////

$scope.logout = function() {

    //Delete the session etc
    FluroTokenService.logout();
}

});