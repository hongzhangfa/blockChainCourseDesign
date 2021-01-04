// console.log("Hello")
// let Web3 = require('web3')

ethereum.autoRefreshOnNetworkChange = false;
let accounts = [];

$(".enableEthereumButton").click(function () {
	// alert('enableEthereumButton')
	//Will Start the metamask extension
	// ethereum.request({ method: 'eth_requestAccounts' });
	getAccount();
})

async function getAccount() {
	accounts = await ethereum.request({ method: 'eth_requestAccounts' });
	const account = accounts[0];
	// showAccount.innerHTML = account;
	$(".showAccount").html(account);
}

ethereum.on('accountsChanged', function (accounts) {
	console.log('accountsChanged');
	getAccount()
});

ethereum.on('chainChanged', (chainId) => {
	console.log("chainId=> " + chainId);
});



let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
console.log("web3 => " + web3);

// abi
let jsonInterface = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_initialAmount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_tokenName",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_decimalUnits",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_tokenSymbol",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			}
		],
		"name": "setPAManager",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_auth",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFromAuth",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "remaining",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "authAddr",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Beneficiary",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "donateCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllDonate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_donateCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllHelper",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllPoor",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_auth",
				"type": "address"
			}
		],
		"name": "getAuthAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "authAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_auth",
				"type": "address"
			}
		],
		"name": "getAuthAmountTo",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_toPoor",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDonateAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_total",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPAManager",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_poor",
				"type": "address"
			}
		],
		"name": "getPoorAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_poor",
				"type": "address"
			}
		],
		"name": "getPoorTract",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getRescueCasesById",
		"outputs": [
			{
				"internalType": "address",
				"name": "helper",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "helpOrganizers",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "id",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "ifExistAuth",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "ifExistPoor",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ifReset",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "index",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "poorAddr",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "poorCases",
		"outputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "serialNum",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "poorObjectById",
		"outputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "serialNum",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totSupp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];



// 0x68fe9F17b9B44bF10452a3d9BB40D7f8CfB022f6 
// Creates a new contract instance
var contract = new web3.eth.Contract(jsonInterface, "0x89916e1658fA12ac637c56a56F4DDC7316D9544A");
console.log("contract==> " + contract);



$(".setPAManager").click(function () {
	$("#load_ci_img").show();
	console.log($("#_admin").val());
	alert("setPAManager is called" + $("#_admin").val());
	let _administrator = $("#_admin").val();
	contract.methods.setPAManager(_administrator).send({ from: accounts[0] }).then(
		function (result) {
			console.log("调用 setPAManager()==> " + result);

			if (result.status) {
				$(".txt_setPAManager").html("设置成功")
			} else {
				hide
				$(".txt_setPAManager").html("设置失败")
				$("#load_ci_img").hide();
			}
			$("#load_ci_img").hide();
		}
	)
})

$(".getPAManager").click(function () {

	contract.methods.getPAManager().call({ from: accounts[0] }).then(
		function (result) {
			console.log("调用 getPAManager()==> " + result);
			$(".showPAManager").html(result)

		},
	)
})

// 0x00598f19466D4d08606E94596b246a9E77a12ca3 acc[1]
$(".transfer").click(function () {
	// alert("transfer() is called");

let _to = $("#_to").val();
let _amount = $("#_amount").val();
console.log(_to);	
console.log(_amount);


if(($("#_to").val().length != 0) && (_amount>0 && _amount<= 1)){
		$("#load_img2").show();
		// alert("Success ");
		contract.methods.transfer(_to, _amount).send({ from: accounts[0] }).then(
			function (result) {
				console.log("result==>", result);
				if (result.status) {
					$(".txt_transfer").html("交易成功")

					$(".blockNumber").html(result.blockNumber)
					$(".from").html(result.from)
					$(".blockHash").html(result.blockHash)
					$(".transactionHash").html(result.transactionHash)
		
				} else {
					
					$(".txt_transfer").html("交易失败")
				}
				$("#load_img2").hide();
			}
		)
	} else {
		alert("Warning!!");
	}
})


// 0x7EfDC95699fA8B842462912D0c90bd9B726d5040 acc[1]
// 0x00598f19466D4d08606E94596b246a9E77a12ca3 acc[2]
$(".approve").click(function() {
	// alert('approve');
	let _approve = $("#txt_approve").val();
	let _approveValue = $("#txt_approveValue").val();
	console.log(_approve); console.log(_approveValue);
	contract.methods.approve(_approve, _approveValue).send({ from: accounts[0] }).then(
		function (result) {
			console.log("调用approve()==> " + result);
if(result.status){
	$(".showApprove").html("授权成功,已下拨"+ _approveValue +"ether 于"+ _approve.slice(0,6)+'...'+ _approve.substring(38)+ "账户");

}
		},
	)
})

$(".getPoorAmount").click(function() {
	// alert('getPoorAmount');
	let _balanceOf = $("#txt_Poor").val();
console.log(_balanceOf);
	contract.methods.getPoorAmount(_balanceOf).call({ from: accounts[0] }).then(
		function (result) {
			console.log("调用 getPoorAmount()==> " + result);
			$(".showPoorAmount").html(result)

		},
	)
})

$(".getAuthAmount").click(function() {
	let _balanceOf = $("#txt_auth").val();
console.log(_balanceOf); 
	contract.methods.getAuthAmount(_balanceOf).call({ from: accounts[0] }).then(
		function (result) {
			console.log("调用 getAuthAmount()==> " + result);
			$(".showAuthAmount").html(result)

		},
	)
})

$(".getBalance").click(function() {
	let _balanceOf = $("#_balanceOf").val();
console.log(_balanceOf); 
	alert('balanceOf called');
	contract.methods.balanceOf(_balanceOf).call({ from: accounts[0] }).then(
		function (result) {
			console.log("调用balanceOf()==> " + result);
			$(".showBalance").html(result)

		},
	)
})

$(".transferFromAuth").click(function () {
	// alert("transfer() is called");

let _from = $("#_from").val();
let _to = $("#_receiver").val();
let _amount = $("#_value").val();

alert(_from+ _to+ _amount);
if((_from.length != 0 && _to.length !=0) && (_amount>0 && _amount<= 1)){
		$("#load_ci_img").show();
		// alert("Success ");
		contract.methods.transferFromAuth(_from, _to, _amount).send({ from: accounts[0] }).then(
			function (result) {
				console.log("result==>", result);
				if (result.status) {
					$(".txt_transfer").html("交易成功")

					$(".s-blockNumber").html(result.blockNumber)
					$(".s-from").html(result.from)
					$(".s-blockHash").html(result.blockHash)
					$(".s-transactionHash").html(result.transactionHash)
		
				} else {
					
					$(".txt_transfer").html("交易失败")
				}
				$("#load_ci_img").hide();
			}
		)
	} else {
		alert("Warning!!");
	}
})


$(".getAuthAmountTo").click(function() {
	// alert('getRescueAmount called');
	let auth = $("#txt_AuthAmountTo").val();
	contract.methods.getAuthAmountTo(auth).call({ from: accounts[0] }).then(
		function (result) {
			console.log(result);
result.forEach(element => {
	$(".showAuthAmountTo").append('<li>'+ element + '</li>');

})
		},
	)
})

$(".getPoorTract").click(function(){
	let _poor = $("#txt_PoorTract").val();
	console.log(_poor);
	contract.methods.getPoorTract(_poor).call({ from: accounts[0] }).then(
		function (result) {
			console.log("调用 getPoorTract()==> " + result);
			// $(".showPoorTract").html(result)
			result.forEach(element => {
				console.log(element);
				$(".showPoorTract").append('['+ '<span>' + element + '</span>'+ ']');
			})
		}
	)
})

$(".getRescueCasesById").click(function() {
	let _id = $("#txt_id").val();
	console.log(_id); 
	contract.methods.getRescueCasesById(_id).call({ from: accounts[0] }).then(
		function (result) {
			console.log(result);
			var jsonObject = JSON.stringify(result)
			var data = eval('('+ jsonObject +')');
			console.log("recipient: "+ data.recipient);
			console.log(data);
				
	// $(".showRescueCasesById").append('<li>'+"recipient: "+ data.recipient+ '</li>'+
	// '<li>'+"amount: "+ data.amount + '</li>'+'<li>'+"count: "+ data.count+ '</li>');
	// var addr =  web3.utils.isAddress(data.helper);
	if(data.helper != 0){
		$(".helper").html(data.helper);
	}else{
		$(".helper").html("无帮扶人，由系统直接救助~");
	}

	$(".recipient").html(data.recipient);
	$(".amount").html(data.amount);
	$(".count").html(data.count);

		var len = Object.keys(data).length;
		console.log(len);
		},
	)
})



$('.getEventTansfer').click(function(){
	contract.events.Transfer({
		// filter: {from: '0xf0fd5854ebaee2652a8250bdb2933334a3dc73b1'}, 
		fromBlock: 0,
		toBlock: 'latest'
	}, function(error, event){ 
		console.log("-------------------------------------");
		let returnValues = event.returnValues;
		var result = JSON.stringify(returnValues);
	console.log(result);
		var data = eval('('+ result +')');
	console.log("from: "+ data.from);
	$(".showEventTansfer").prepend(
		"<p>"+ "发送人: "+ data.from + " 受益人：" + data.to.slice(0,6) + "..." + data.to.substring(38) +
		"金额: "+ data.value + "ETH"+ "</p>" 
	);


	// event.forEach(element => {
	// 	var jsonData = JSON.stringify(element.returnValues);
	// 	console.log(jsonData);
	// 		var json = JSON.parse(jsonData);
	// 		console.log(json);

	// 		var json = eval("(" + jsonData + ")");
	// 		var json = (new Function("return " + jsonData))();

	// 		console.log("Event Transfer：",json);
	// })
		
	})

})

$('.getEventApproval').click(function(){
	contract.events.Approval({
		// filter: {from: '0xf0fd5854ebaee2652a8250bdb2933334a3dc73b1'}, 
		fromBlock: 0,
		toBlock: 'latest'
	}, function(error, event){ 
		console.log("-------------------------------------");
		let returnValues = event.returnValues;
		var result = JSON.stringify(returnValues);
	console.log(result);
		var data = eval('('+ result +')');
	console.log("owner: "+ data.owner);

	$(".showEventApproval").prepend(
		"<p>"+ "授权人: "+ data.owner + " 帮扶人：" + data.spender.slice(0,6) + "..." + data.spender.substring(38) +
		" 委托金额: "+ data.value + "ETH"+ "</p>" 
	);

	})
})

$(".getAllDonate").click(function() {
	// alert('getRescueAmount called');
	contract.methods.getAllDonate().call({ from: accounts[0] }).then(
		function (result) {
			console.log("调用 getAllDonate()==> " + result);
			$(".showAllDonate").html(result)

		},
	)
})

$(".getDonateAmount").click(function() {
	// alert('getRescueAmount called');
	contract.methods.getDonateAmount().call({ from: accounts[0] }).then(
		function (result) {
			console.log("调用 getDonateAmount()==> " + result);
			$(".showDonateAmount").html(result+ " ether")

		},
	)
})




