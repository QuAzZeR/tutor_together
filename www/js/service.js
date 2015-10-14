angular.module('Service',[]).factory('UserRegisterService',function(){
	var UserRegisterService={};

	UserRegisterService.getInfoForRegister = function(){
		return UserRegisterService.Info;
	}
	UserRegisterService.setInfo = function(info){
		UserRegisterService.Info = info;
	}
	return UserRegisterService;
});

angular.module('scheduleService',[]).factory('MySchedule',function(){
	var MySchedule={};
	MySchedule.schedule=[]
	count = 0;
	MySchedule.addSchedule = function(time){

		MySchedule.schedule[count] = time;
		count+=1;
	}
	MySchedule.getSchedule = function(){
		return MySchedule.schedule ;
	}
	MySchedule.clearSchedule = function(){
		count=0;
	}
	return MySchedule;
})