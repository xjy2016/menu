angular.module('myApp1',[])
.controller('fn',['$scope',function($scope){
	$scope.myRemove = function(){
		localStorage.removeItem("list")
	}
}])
