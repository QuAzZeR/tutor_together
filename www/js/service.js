angular.module('Service',[]).factory('UserRegisterService',function(){
	var UserRegisterService={};
	UserRegisterService.getInfo = function(){
		return UserRegisterService.Info;
	}
	UserRegisterService.setInfo = function(info){
		UserRegisterService.Info = info;
	}
	return UserRegisterService;
});