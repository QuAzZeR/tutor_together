angular.module('Service',[]).factory('UserLoginService',function(){
	var UserLoginService={};

	UserLoginService.getInfoForRegister = function(){
		return UserLoginService.Info;
	}
	UserLoginService.setInfo = function(info){
		UserLoginService.Info = info;
	}
	UserLoginService.clearData = function(){
		UserLoginService = {}
	}
	return UserLoginService;
});
angular.module('RegisterService',[]).factory('UserRegisterService',function(){
	var UserRegisterService={};

	UserRegisterService.getInfoForRegister = function(){
		return UserRegisterService.Info;
	}
	UserRegisterService.setInfo = function(info){
		UserRegisterService.Info = info;
	}
	UserRegisterService.clearData = function(){
		UserRegisterService = {}
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
		MySchedule.schedule=[]
		count=0;
	}
	return MySchedule;
})
angular.module('dataService',[]).factory('UserInfoService',function(){
	var UserInfoService={};
	UserInfoService.setInfo = function(info){
		UserInfoService.data = info;
	}
	UserInfoService.getInfo = function(){
		return UserInfoService.data;
	}
	UserInfoService.clearData = function(){
		UserInfoService = {}
	}
	return UserInfoService;
	
})
angular.module('lessonService',[]).factory('lessonInfoService',function(){
	var lessonInfoService={};
	lessonInfoService.setLesson=function(lesson){
		lessonInfoService.lesson = lesson;	
	}
	lessonInfoService.getLesson = function() {
		return lessonInfoService.lesson;
	}
	return lessonInfoService;
})
angular.module('locationService',[]).factory('latlngService',function(){
	var latlngService={};
	latlngService.setLatLng=function(latlng){
		latlngService.latLng = latlng;
	}
	latlngService.getLatLng=function(){
		return latlngService.latLng;
	}
	return latlngService;
})
angular.module('teacherdetailservice',[]).factory('teacherDetailService',function(){
	var teacherDetailService={};
	teacherDetailService.setTeacher = function(teacher){
		teacherDetailService.Data = teacher;
	}
	teacherDetailService.getTeacher = function(){
		return teacherDetailService.Data;
	}
	return teacherDetailService;
})
angular.module('teacherlessondetailservice',[]).factory('teacherLessonDetailService',function(){
	var teacherLessonDetailService={};
	teacherLessonDetailService.setData = function(lesson,teacher){
		teacherLessonDetailService.Data={Teacher:teacher,Lesson:lesson};
	}
	teacherLessonDetailService.getData =  function(){
		return teacherLessonDetailService.Data;
	}
	return teacherLessonDetailService;
})