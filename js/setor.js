var setortipoModel = angular.module('setortipoModel', []);

setortipoModel.controller("setortipoController", function ($scope) {

	original = undefined;
	urlSetortipo = 'rs/setortipo';

	$scope.pesquisaSetortipo = function () {
		setortipos = [
			{
				id:1,
				nome:'Higiene'
			},
			{
				id:2,
				nome:'Hortifuti'
			}
		]

		//$http.get(urlSetortipo).success(function(setortipos) {
			$scope.setortipos = setortipos;
		//}).error(function(erro) {
		//	$scope.errorMessage = erro;
		//	$('#myModal').modal('show');
		//});
	};


	$scope.edditing = false;

	$scope.selecionaSetortipo = function(setortipo) {
		original = angular.copy(setortipo);
		$scope.setortipo = setortipo;
		$scope.edditing = true;
		$scope.textSubmit = 'Alterar';
	};

	$scope.cancel = function() {
		if (original != undefined) {
			angular.copy(original, $scope.setortipo);
		}
		$scope.edditing = false;
	};

	$scope.novo = function() {
		$scope.mainForm.$setPristine();
		$scope.setortipo = {};
		$scope.edditing = true;
		$scope.textSubmit = 'Incluir';
	};

	$scope.incluir = function(setortipo) {
		if (setortipo.id == undefined) {
			//$http.post(urlSetortipo, setortipo).success(function (setortipo) {
				$scope.setortipos.push(setortipo);
				$scope.edditing = false;
			//}).error(function (erro) {
			//	$scope.errorMessage = erro;
			//	$('#myModal').modal('show');
			//})
		} else {
			//$http.put(urlSetortipo, setortipo).success(function (setortipo) {
				$scope.pesquisaSetortipo();
				$scope.edditing = false;
			//}).error(function (erro) {
			//	$scope.errorMessage = erro;
			//	$('#myModal').modal('show');
			//})
		}
	};

	$scope.deletar = function(setortipo) {
		if (setortipo.id == undefined) {
			$scope.errorMessage = 'Selecione um setor/tipo';
			$('#myModal').modal('show');
		} else {
			urlExluir = urlSetortipo + "/" + setortipo.id;
			//$http.delete(urlExluir).success(function () {
				$scope.pesquisaSetortipo();
				$scope.errorMessage = 'Item Excluido!';
				$('#myModal').modal('show');
			//}).error(function (erro) {
			//	$scope.errorMessage = erro;
			//	$('#myModal').modal('show');
			//})
		}
	};

	$scope.pesquisaSetortipo();
})
;