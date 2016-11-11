angular.module('myApp', [])
.controller('myController', ['$scope','Dinner', function($scope,Dinner){
	var arr = [];
	Dinner.getList();
	$scope.$on('dinnerList', function(event,data){
		$scope.allData = data;
		$scope.dinnerList = data[0].items;  //菜品数据
		$scope.dinnerTitle = data[0].name;  //右侧的标题
		$scope.changeNav(0);
		count();
		if (localStorage.getItem("list")) {
			arr = JSON.parse(localStorage.getItem("list"));
			for(var i=0;i<arr.length;i++){
				for (var j = 0;j<$scope.allData.length;j++) {
					for (var j1 = 0;j1<$scope.allData[j].items.length;j1++) {
						if (arr[i].id == $scope.allData[j].items[j1].id) {
							$scope.allData[j].items[j1].num = arr[i].num;
						}
					}
				}
				$scope.total += arr[i].num;
			};
		}
	});
	$scope.total = 0;
	$scope.totalPrice = 0;
	//菜单点击事件
	$scope.changeNav = function(index){
		angular.forEach($scope.allData,function(val,key){
			val.ifChose = false;
		});
		$scope.allData[index].ifChose = true;
		$scope.dinnerList = $scope.allData[index].items;
		$scope.dinnerTitle = $scope.allData[index].name;
		//点击增加
		$scope.add = function(index1,id){
			var obtn = false;
			$scope.total++;
			$scope.allData[index].items[index1].num++;
			angular.forEach(arr,function(val,i){
				if(val.id == $scope.allData[index].items[index1].id){
					obtn = true;
				}
			})
			if (obtn == false) {
				arr.push($scope.allData[index].items[index1])
			}
			localStorage.setItem("list",JSON.stringify(arr))
			count();
		}
		//点击减少
		$scope.reduce = function(index1,id){
			var arr1 = [];
			var obtn = false;
			$scope.total--;
			$scope.allData[index].items[index1].num--;
			if ($scope.allData[index].items[index1].num==0) {
				angular.forEach(arr,function(val,i){
					if (val.id != $scope.allData[index].items[index1].id) {
						arr1.push(val)
					}
				})
				arr = arr1;
			}
			localStorage.setItem("list",angular.toJson(arr))
			count()
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
.service('Dinner', ['$http','$rootScope', function($http,$rootScope){
	return {
		"getList" : function(){
			$http.get('json/groups.json', {})
			.then(function(response){
				$rootScope.$broadcast('dinnerList', response.data)
			},function(error){
				console.log(error)
			})
		}
	}
}])