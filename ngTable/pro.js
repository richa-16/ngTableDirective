var myModule=angular.module('myApp',['ngRoute']);
var i=1;


function proController($scope,$location,$http)
{
	// add data
	$scope.add_product=function(){
		
		nm =$scope.name;
		qt =$scope.quantity;
		pr =$scope.price;
		
		
		$http({
			method : 'POST',
			url : 'http://10.20.14.83:9000/product',
			headers : {
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin': 'http://10.20.14.83:9000/product'
			},data : {
				
				name : nm ,
				quantity: qt,
				price: pr
			}
		}).then(function successCallback(response) {
			var data = response.data;
			if (response.data.Product.id != null) {
				alert('product created: ' + response.data.Product.id);
				
				$scope.product = 'Product created:\n' + response.data.Product.id + '\n' + response.data.Product.name + '\n' + response.data.Product.price + '\n' + response.data.Product.quantity;
			} else {
				alert('product NOT created');
			}		
		}, function errorCallback(response) {
			alert("Server Error. Try After Some time: " + response);
		});
		
		$scope.display();
	}
	
	
	//delete data
	
	$scope.pdelete = function(product){
		$http({
		    method : "DELETE",
		    url : 'http://10.20.14.83:9000/product/' + product.id
		}).then( _success, _error );	
	}
$scope.edit = function(product){
		
		$location.path('/editPage/' + product.id+"/" +product.name+"/"+product.quantity+"/"+product.price);	
		
	
	}

//update data
$scope.updatedata = function() {
	
	$http({
		method:'PUT',
		url : 'http://10.20.14.83:9000/product/' + parseInt($scope.eid),
		headers : {
			'Content-Type' : 'application/json','Access-Control-Allow-Origin': 'http://10.20.14.83:9000/product'},
		data:{
			name:$scope.ename,
		quantity:$scope.eqty,
		price:$scope.eprice
		}}).then(function successCallback(response){
			var data=response.data;
			if(response.data.Product.id != null){
				alert('product change : '+response.data.Product.id);
				$scope.display();
				$location.path("/");
			}
			else
				{alert('product not modify');}
		},function errorCallback(response)
		{alert("Server Error. Try After Some time: " + response);});
	}
		

	
	$scope.display=function()
	{
		var url = 'http://10.20.14.83:9000/product';
		$http.get(url).success(function(data, status) {
			$scope.products = [];
			angular.forEach(data, function(value, key) {
				
				angular.forEach(data.Products, function(value, key) {
					//alert("push");
				//	showText += "\nId: " + value.id + "\nName: " + value.name + "\nPrice: " + value.price + "\nQuantity: " + value.quantity + "\n";
					$scope.products.push(value);
				});
			});
		
		});

	};
	
	}


myModule.directive('ngTable', function() {
	return {
		restrict: 'E',//E = element, A = attribute, C = class, M = comment	template: '<h1>Hello Anand</h1>',
		templateUrl: 'table.html',
		link: function(scope, iElement) {
		      //alert("link() function called");
		}
	}
});



myModule.controller('ProController', proController);


myModule.config(function($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'ProController',
			templateUrl: 'ProApp.html'
		})
		.when('/editPage/:id/:name/:quantity/:price', {
			controller:function($scope,$routeParams)
			{
				$scope.eid=parseInt($routeParams.id);
				$scope.ename=$routeParams.name;
				$scope.eqty=$routeParams.quantity;
				$scope.eprice=$routeParams.price;
				},
		templateUrl: 'edit.html'
		})
		
		.otherwise({redirectTo: '/'})
});

