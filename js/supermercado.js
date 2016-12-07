var supermercadoModel = angular.module('supermercadoModel', []);

supermercadoModel.controller("supermercadoController", function ($scope) {

	original = undefined;
	urlSupermercado = 'rs/supermercado';

	$scope.pesquisaSupermercado = function () {
		supermercados = [
			{
				id:1,
				nome:'Sonda'
			},
			{
				id:2,
				nome:'Extra'
			}
		]

		//$http.get(urlSupermercado).success(function(supermercados) {
			$scope.supermercados = supermercados;
		//}).error(function(erro) {
		//	$scope.errorMessage = erro;
		//	$('#myModal').modal('show');
		//});
	};


	$scope.edditing = false;

	$scope.selecionaSupermercado = function(supermercado) {
		original = angular.copy(supermercado);
		$scope.supermercado = supermercado;
		$scope.edditing = true;
		$scope.textSubmit = 'Alterar';
	};

	$scope.cancel = function() {
		if (original != undefined) {
			angular.copy(original, $scope.supermercado);
		}
		$scope.edditing = false;
	};

	$scope.novo = function() {
		$scope.mainForm.$setPristine();
		$scope.supermercado = {};
		$scope.edditing = true;
		$scope.textSubmit = 'Incluir';
	};

	$scope.incluir = function(supermercado) {
		if (supermercado.id == undefined) {
			//$http.post(urlSupermercado, supermercado).success(function (supermercado) {
				$scope.supermercados.push(supermercado);
				$scope.edditing = false;
			//}).error(function (erro) {
			//	$scope.errorMessage = erro;
			//	$('#myModal').modal('show');
			//})
		} else {
			//$http.put(urlSupermercado, supermercado).success(function (supermercado) {
				$scope.pesquisaSupermercado();
				$scope.edditing = false;
			//}).error(function (erro) {
			//	$scope.errorMessage = erro;
			//	$('#myModal').modal('show');
			//})
		}
	};

	$scope.deletar = function(supermercado) {
		if (supermercado.id == undefined) {
			$scope.errorMessage = 'Selecione um supermercado';
			$('#myModal').modal('show');
		} else {
			urlExluir = urlSupermercado + "/" + supermercado.id;
			//$http.delete(urlExluir).success(function () {
				$scope.pesquisaSupermercado();
				$scope.errorMessage = 'Item Excluido!';
				$('#myModal').modal('show');
			//}).error(function (erro) {
			//	$scope.errorMessage = erro;
			//	$('#myModal').modal('show');
			//})
		}
	};

	$scope.pesquisaSupermercado();
})
;