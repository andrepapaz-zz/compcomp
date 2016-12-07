var listacomprasModel = angular.module('listacomprasModel', ['myModule']);

angular.module('myModule', [])
    .filter('numberFixedLen', function () {
        return function (n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) {
                return n;
            }
            num = ''+num;
            while (num.length < len) {
                num = '0'+num;
            }
            return num;
        };
    });


listacomprasModel.controller("listacomprasController", function ($scope) {

	originalListaCompras = undefined;
	urlListacompras = 'rs/listacompras';
	$scope.edditing = false;
	$scope.edditingItem = false;
	$scope.edittingLine = -1;
	$scope.bnewLine = false;
	$scope.item = {};

	$scope.pesquisaMes = function() {
		meses = [
			{
				id: 0,
				nome: 'Janeiro'
			},
			{
				id: 1,
				nome: 'Fevereiro'
			},
			{
				id: 2,
				nome: 'Março'
			},
			{
				id: 3,
				nome: 'Abril'
			},
			{
				id: 4,
				nome: 'Maio'
			},
			{
				id: 5,
				nome: 'Junho'
			},
			{
				id: 6,
				nome: 'Julho'
			},
			{
				id: 7,
				nome: 'Agosto'
			},
			{
				id: 8,
				nome: 'Setembro'
			},
			{
				id: 9,
				nome: 'Outubro'
			},
			{
				id: 10,
				nome: 'Novembro'
			},
			{
				id: 11,
				nome: 'Dezembro'
			}
		];

		$scope.meses = meses;
	}

	$scope.pesquisaProduto = function() {
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

	$scope.pesquisaSupermercado = function() {
		supermercados = [
			{
				id:1,
				nome:'Sonda'
			},
			{
				id:2,
				nome:'Extra'
			}
		];

		$scope.supermercados = supermercados;
	};

	$scope.pesquisaListacompras = function () {
		listacompras = [
			{
				id:1,
				nome:'Yoki',
				supermercado: {
					id: 1,
					nome: 'America'
				},
				mes: {
					id: 0
				},
				ano: 2016,
				itens:[
					{
						id:1,
						produto: {
							id:1,
							nome:'Yoki prod'
						},
						quantidade:2,
						preco:2.4
					},
					{
						id:2,
						produto: {
							id:2,
							nome:'Omo'
						},
						quantidade:5,
						preco:18.4
					}
				]
			},
			{
				id:2,
				nome:'Omo',
				supermercado: {
					id: 1,
					nome: 'America'
				},
				mes: {
					id: 1
				},
				ano: 2017,
				itens:[
					{
						id:3,
						produto: {
							id:1,
							nome:'Yoki prod'
						},
						quantidade:2,
						preco:89
					},
					{
						id:4,
						produto: {
							id:2,
							nome:'Omo'
						},
						quantidade:5,
						preco:111.99
					}
				]
			}
		]

		//$http.get(urlListacompras).success(function(listacomprass) {
			$scope.listacompras = listacompras;
		//}).error(function(erro) {
		//	$scope.errorMessage = erro;
		//	$('#myModal').modal('show');
		//});
	};

	$scope.selecionaListacompras = function(listacompras) {
		original = angular.copy(listacompras);
		$scope.listacompras = listacompras;
		$scope.edditing = true;
		$scope.textSubmit = 'Alterar';
	};

	$scope.cancel = function() {
		if (original != undefined) {
			angular.copy(original, $scope.listacompras);
		}
		$scope.edditing = false;
	};

	$scope.novo = function() {
		$scope.mainForm.$setPristine();
		$scope.listacompras = {};
		$scope.edditing = true;
		$scope.textSubmit = 'Incluir';
	};

	$scope.incluir = function(listacompras) {
		if (listacompras.id == undefined) {
			//$http.post(urlListacompras, listacompras).success(function (listacompras) {
				$scope.listacompras.push(listacompras);
				$scope.edditing = false;
			//}).error(function (erro) {
			//	$scope.errorMessage = erro;
			//	$('#myModal').modal('show');
			//})
		} else {
			//$http.put(urlListacompras, listacompras).success(function (listacompras) {
				$scope.pesquisaListacompras();
				$scope.edditing = false;
			//}).error(function (erro) {
			//	$scope.errorMessage = erro;
			//	$('#myModal').modal('show');
			//})
		}
	};

	$scope.deletar = function(listacompras) {
		if (listacompras.id == undefined) {
			$scope.errorMessage = 'Selecione uma listacompras';
			$('#myModal').modal('show');
		} else {
			urlExluir = urlListacompras + "/" + listacompras.id;
			//$http.delete(urlExluir).success(function () {
				$scope.pesquisaListacompras();
				$scope.errorMessage = 'Item Excluido!';
				$('#myModal').modal('show');
			//}).error(function (erro) {
			//	$scope.errorMessage = erro;
			//	$('#myModal').modal('show');
			//})
		}
	};

	$scope.newLine = function() {
		$scope.item = {};
		$scope.bnewLine = true;
	};

	$scope.alterLine = function (index, item) {
		if ($scope.edditingItem == false) {
			original = angular.copy(item);
			$scope.edditingItem = true;
			$scope.edittingLine = index;
		} else {
			$scope.edditingItem = false;
			$scope.edittingLine = -1;
		}
	};

	$scope.cancelLine = function (item) {
		if ($scope.edditingItem == true) {
			angular.copy(original, item);
			$scope.edditingItem = false;
			$scope.edittingLine = -1;
		} else {
			$scope.listacompras.itens.splice($scope.listacompras.itens.indexOf(item), 1);
		}
	};

	$scope.saveNewLine = function(item) {
		item.total = item.quantidade * item.valor;
		if ($scope.listacompras.itens == undefined) {
			$scope.listacompras.itens = [];
		}
		$scope.listacompras.itens.push(item);
		$scope.bnewLine = false;
	};

	$scope.cancelNewLine = function (index, item) {
		$scope.bnewLine = false;
	};

	$scope.getTotalCompra = function() {
		var total = 0;
		if ($scope.listacompras != undefined) {
			angular.forEach($scope.listacompras.itens, function(value, key) {
				total += value.quantidade * value.preco;
			});
			$scope.listacompras.valor = total;
		}

		return total;
	};

	$scope.pesquisaMes();
	$scope.pesquisaProduto();
	$scope.pesquisaSupermercado();
	$scope.pesquisaListacompras();
})
;