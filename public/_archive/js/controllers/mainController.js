//Define our Main application controller
angular.module('todoController', [])
.controller('mainController', function($scope, $http, Todos){
	//Dictionary to hold our form Data!
	$scope.formData = {}
	$scope.loading = true;

	//When we hit the page get all the todos and show them
	Todos.get()
		.success(function(data){
			//Assign all the returned data to a scope variable called todos
			$scope.todos = data;
			console.log(data);
			$scope.loading = false;
		})

	$scope.createTodo = function(){
		$scope.loading = true;
		//Validate the Form!
		if($scope.formData.text != undefined){
			Todos.create($scope.formData)
			.success(function(data){
				$scope.formData = {}; // Reset the form data after the post#
				$scope.todos = data; // Set the new list with the return from the API
				console.log(data); //Log the out put list of data
				$scope.loading = false;
			})
		}
	};

	$scope.deleteTodo = function(id){
		$scope.loading = true;
		Todos.delete(id)
			.success(function(data){
				$scope.todos = data; //Reassign data based on return
				console.log(data); //output the data
				$scope.loading = false;
			})
	}; 
});