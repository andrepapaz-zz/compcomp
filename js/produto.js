var produtoModel = angular.module('produtoModel', []);

produtoModel.controller("produtoController", function ($scope) {

	original = undefined;
	urlProduto = 'rs/produto';

	$scope.pesquisaMarca = function() {
		marcas = [
			{
				id:1,
				nome:'Yoki'
			},
			{
				id:2,
				nome:'Omo'
			}
		];

		$scope.marcas = marcas;
	};

	$scope.pesquisaSetorTipo = function() {
		setorTipos = [
			{
				id:1,
				nome:'Higiene'
			},
			{
				id:2,
				nome:'Hortifuti'
			}
		];

		$scope.setorTipos = setorTipos;
	};

	$scope.pesquisaProduto = function () {
		produtos = [
			{
				id:1,
				nome:'Yoki prod',
				usadoEstatistica:true,
				mantemProxMes:true,
				marca: {
					id:1,
					nome:'Yoki'
				},
				setorTipo: {
					id:1,
					nome:'Higiene'
				}
			},
			{
				id:2,
				nome:'Omo',
				usadoEstatistica:false,
				mantemProxMes:false,
				marca: {
					id:2,
					nome:'Omo'
				},
				setorTipo: {
					id:2,
					nome:'Hortifuti'
				}
			}
		]

		//$http.get(urlProduto).success(function(produtos) {
			$scope.produtos = produtos;
		//}).error(function(erro) {
		//	$scope.errorMessage = erro;
		//	$('#myModal').modal('show');
		//});
	};


	$scope.edditing = false;

	$scope.selecionaProduto = function(produto) {
		original = angular.copy(produto);
		$scope.produto = produto;
		$scope.edditing = true;
		$scope.textSubmit = 'Alterar';
	};

	$scope.cancel = function() {
		if (original != undefined) {
			angular.copy(original, $scope.produto);
		}
		$scope.edditing = false;
	};

	$scope.novo = function() {
		$scope.mainForm.$setPristine();
		$scope.produto = {};
		$scope.edditing = true;
		$scope.textSubmit = 'Incluir';
	};

	$scope.incluir = function(produto) {
		if (produto.id == undefined) {
			//$http.post(urlProduto, produto).success(function (produto) {
				$scope.produtos.push(produto);
				$scope.edditing = false;
			//}).error(function (erro) {
			//	$scope.errorMessage = erro;
			//	$('#myModal').modal('show');
			//})
		} else {
			//$http.put(urlProduto, produto).success(function (produto) {
				$scope.pesquisaProduto();
				$scope.edditing = false;
			//}).error(function (erro) {
			//	$scope.errorMessage = erro;
			//	$('#myModal').modal('show');
			//})
		}
	};

	$scope.deletar = function(produto) {
		if (produto.id == undefined) {
			$scope.errorMessage = 'Selecione um produto';
			$('#myModal').modal('show');
		} else {
			urlExluir = urlProduto + "/" + produto.id;
			//$http.delete(urlExluir).success(function () {
				$scope.pesquisaProduto();
				$scope.errorMessage = 'Item Excluido!';
				$('#myModal').modal('show');
			//}).error(function (erro) {
			//	$scope.errorMessage = erro;
			//	$('#myModal').modal('show');
			//})
		}
	};

	$scope.pesquisaMarca();
	$scope.pesquisaSetorTipo();
	$scope.pesquisaProduto();
})
;