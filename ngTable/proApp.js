var myModule=angular.module('myApp',['ngRoute']);
var i=2;
myModule.factory('productFactory', function() {
	var factoryObj = {};
	
	
	factoryObj.products = [{id:1,name: 'Tom', qty: 111,price:123}];
	
	factoryObj.add = function (pro) {

		console.log(pro);
		factoryObj.products.push(pro);
	}
	factoryObj.delprod = function (pro) {
		var index = factoryObj.products.indexOf(pro);
		factoryObj.products.splice(index, 1);
    }
	
	
	factoryObj.updata=function(eval)
	{
		var index;
		for(var j=0;j< factoryObj.products.length;j++){
			if(factoryObj.products[j].id==eval.id)
				{
			index=j;
			break;
				}
		}
		factoryObj.products[index]=eval;
	}
	
	return factoryObj;
});


function proController($scope, productFactory,$location)
{
	$scope.products=productFactory.products;
	$scope.add_product=function(){
		
	var pro= {id:i++, name:$scope.name,qty:$scope.qty,price:$scope.price};
	productFactory.add(pro);
	}
	$scope.pdelete = function(pro){
		productFactory.delprod(pro);
	}
	$scope.edit = function(pro){
		
		$location.path('/editPage/' + pro.id+"/" +pro.name+"/"+pro.qty+"/"+pro.price);	
		
	
	}
	$scope.updatedata=function(pro)
	{
		var eval={id:$scope.eid,name:$scope.ename,qty:$scope.eqty,price:$scope.eprice};
		console.log(eval);
		productFactory.updata(eval);
		$location.path('/');
	}
	
	
	}

myModule.controller('ProController', proController);
myModule.config(function($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'ProController',
			templateUrl: 'ProApp.html'
		})
		.when('/editPage/:id/:name/:qty/:price', {
			controller:function($scope,$routeParams)
			{
				$scope.eid=parseInt($routeParams.id);
				$scope.ename=$routeParams.name;
				$scope.eqty=$routeParams.qty;
				$scope.eprice=$routeParams.price;
				},
		templateUrl: 'edit.html'
		})
		
		.otherwise({redirectTo: '/'})
});





