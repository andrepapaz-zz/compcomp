var marcaModel = angular.module('marcaModel', []);

marcaModel.controller("marcaController", function ($scope) {

	original = undefined;
	urlMarca = 'rs/marca';

	$scope.pesquisaMarca = function () {
		marcas = [
			{
				id:1,
				nome:'Yoki'
			},
			{
				id:2,
				nome:'Omo'
			}
		]

		//$http.get(urlMarca).success(function(marcas) {
			$scope.marcas = marcas;
		//}).error(function(erro) {
		//	$scope.errorMessage = erro;
		//	$('#myModal').modal('show');
		//});
	};


	$scope.edditing = false;

	$scope.selecionaMarca = function(marca) {
		original = angular.copy(marca);
		$scope.marca = marca;
		$scope.edditing = true;
		$scope.textSubmit = 'Alterar';
	};

	$scope.cancel = function() {
		if (original != undefined) {
			angular.copy(original, $scope.marca);
		}
		$scope.edditing = false;
	};

	$scope.novo = function() {
		$scope.mainForm.$setPristine();
		$scope.marca = {};
		$scope.edditing = true;
		$scope.textSubmit = 'Incluir';
	};

	$scope.incluir = function(marca) {
		if (marca.id == undefined) {
			//$http.post(urlMarca, marca).success(function (marca) {
				$scope.marcas.push(marca);
				$scope.edditing = false;
			//}).error(function (erro) {
			//	$scope.errorMessage = erro;
			//	$('#myModal').modal('show');
			//})
		} else {
			//$http.put(urlMarca, marca).success(function (marca) {
				$scope.pesquisaMarca();
				$scope.edditing = false;
			//}).error(function (erro) {
			//	$scope.errorMessage = erro;
			//	$('#myModal').modal('show');
			//})
		}
	};

	$scope.deletar = function(marca) {
		if (marca.id == undefined) {
			$scope.errorMessage = 'Selecione uma marca';
			$('#myModal').modal('show');
		} else {
			urlExluir = urlMarca + "/" + marca.id;
			//$http.delete(urlExluir).success(function () {
				$scope.pesquisaMarca();
				$scope.errorMessage = 'Item Excluido!';
				$('#myModal').modal('show');
			//}).error(function (erro) {
			//	$scope.errorMessage = erro;
			//	$('#myModal').modal('show');
			//})
		}
	};

	$scope.pesquisaMarca();
})
;