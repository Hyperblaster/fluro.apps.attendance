angular.module('fluro').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('routes/auth/login.html',
    "<div class=wrapper><div class=container ng-if=!$root.user><div class=text-wrap><h1>Fluro</h1><div class=form-group><label>Email Address</label><input class=form-control ng-disabled=processing ng-model=credentials.username placeholder=\"Email Address\"></div><div class=form-group><label>Password</label><input type=password class=form-control ng-disabled=processing ng-model=credentials.password placeholder=\"Password\"></div><div class=form-group><div class=checkbox><label><input type=checkbox ng-disabled=processing ng-model=\"credentials.remember\"> Remember me on this device</label></div></div><a class=\"btn btn-primary\" ng-disabled=processing ng-click=login()><span>Continue</span> <i class=fa ng-class=\"{'fa-sign-in':!processing, 'fa-spinner fa-spin':processing}\"></i></a></div></div><div class=container ng-if=$root.user><div class=text-wrap><div class=clearfix><h1 class=\"pull-left title\">Hi {{$root.user.name}}</h1><a class=\"btn btn-primary pull-right\" ng-click=logout()><span>Logout</span> <i class=\"fa fa-sign-out\"></i></a></div><p>Select an account to login to</p><hr><div class=btn-list><a class=\"btn btn-default btn-block\" ng-click=switchSession(account._id) ng-repeat=\"account in $root.user.availableAccounts | orderBy:'title'\"><span>{{account.title}}</span> <i class=\"fa fa-sign-in pull-right\"></i></a></div></div></div></div>"
  );


  $templateCache.put('routes/counter/counter.html',
    "<div class=wrapper ng-switch=counter.status><div class=\"container text-center\" ng-switch-when=processing><i class=\"fa fa-spinner fa-spin\"></i><h3>Sending</h3></div><div class=\"container text-center\" ng-switch-when=failed><i class=\"fa fa-warning\"></i><h3>Failed!</h3><p>Sorry there was an issue sending your report, please try again</p><a class=\"btn btn-primary\" ng-click=\"counter.status = 'ready'\"><i class=\"fa fa-angle-left\"></i> <span>Back</span></a></div><div class=\"container text-center\" ng-switch-when=success><i class=\"fa fa-check\"></i><h3>Success</h3><p>Thanks {{$root.user.name}}. Your attendance report has been submitted successfully!</p><a class=\"btn btn-primary\" ng-click=reset()><span>Back</span> <i class=\"fa fa-chevron-right\"></i></a></div><div class=\"container text-center\" ng-switch-default><div class=row><div class=col-xs-4><a class=\"btn btn-circle btn-circle-default\" style=\"border:none !important\" ng-click=reset()><i class=\"fa fa-rotate-right\"></i></a></div><div class=col-xs-8><input type=tel class=\"total {{quantity()}}\" pattern=[0-9]* select-on-focus ng-model=counter.count inputmode=numeric></div></div><hr><div class=row><div class=col-xs-6><a class=\"btn btn-circle btn-circle-primary btn-xl\" ng-click=add()>+</a></div><div class=col-xs-6><a class=\"btn btn-circle btn-circle-danger btn-lg\" ng-click=subtract()>-</a></div></div><hr><div class=row><div class=\"form-group col-xs-9\"><select class=form-control ng-model=counter.event><option value=\"\">Select Event</option><option value={{event._id}} ng-repeat=\"event in eventService.events\">{{event.title}} - {{event.startDate| formatDate:'g:ia'}}</option></select></div><div class=col-xs-3><a class=\"btn btn-default btn-block\" ng-click=refreshEvents()><i class=fa ng-class=\"{'fa-refresh':!refreshing, 'fa-spinner fa-spin':refreshing}\"></i></a></div></div><a class=\"btn btn-primary btn-block\" ng-click=submit() ng-disabled=\"!eventService.events.length || !counter.count||!counter.event.length\"><span>Submit</span> <i class=\"fa fa-angle-right\"></i></a></div></div>"
  );

}]);