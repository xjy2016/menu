angular.module('myApp',[])
.controller('menuController',['$scope',function($scope){
	$scope.total = 0;
	$scope.totalPrice = 0;
	$scope.list=[];
	if (localStorage.getItem("list")) {
		$scope.list = JSON.parse(localStorage.getItem("list"))
		angular.forEach($scope.list,function(val,i){
			console.log(val.num)
			$scope.total += val.num;
			
		})
	}
	count();
	
	$scope.flag = false;
	$scope.tanchuang = function(){
		if ($scope.flag == false) {
			$scope.flag = true;
		}else{
			$scope.flag = false;
		}
		console.log($scope.flag)
	}
	$scope.add = function(index){
		$scope.total++;
		$scope.list[index].num++;
		localStorage.setItem("list",angular.toJson($scope.list))
		count();
	}
	$scope.reduce = function(index){
		var arr1 = [];
		$scope.total--;
		$scope.list[index].num--;
		if ($scope.list[index].num==0) {
			console.log($scope.list)
			angular.forEach($scope.list,function(val,i){
				console.log(val,i,index)
				if (i != index) {
					arr1.push(val)
				}
			})
			$scope.list = arr1;
			console.log($scope.list)
			localStorage.setItem("list",angular.toJson($scope.list))
			count();
			console.log(localStorage.getItem("list"))
		}
		
	}
	function count(){
		$scope.totalPrice = 0;
		if (localStorage.list) {
			var Price = JSON.parse(localStorage.list) 
			angular.forEach(Price,function(val){
				$scope.totalPrice += val.num*val.price;
			})
			 
		}
	}
	
}])
