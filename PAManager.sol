// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity ^0.6.1;

interface ERC20Interface {
    function transfer(address to, uint256 value) external returns (bool);

    function approve(address spender, uint256 value) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address who) external view returns (uint256);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    /* solhint-disable no-simple-event-func-name */
    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract PAManage is ERC20Interface {
    uint256 private constant MAX_UINT256 = 2**256 - 1;
    address Administrator; // 管理员
    address public helpOrganizers; // 帮扶人（组织）
    address Beneficiary; // 受益人
    uint256 DonateNumber; // 拨款总次数
    address ownership = msg.sender;

    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowed;
    uint256 totSupply; // Total number of tokens
    string name; // Descriptive name (i.e. For SupplyChainApp Token)
    uint8 decimals; // How many decimals to use when displaying amounts
    string symbol; // Short identifier for token (i.e. FDT)

    // Create the new token and assign initial values, including initial amount
    // 100, hzf, 8, HETH
    constructor(
        uint256 _initialAmount,
        string memory _tokenName,
        uint8 _decimalUnits,
        string memory _tokenSymbol
    ) public {
        balances[ownership] = _initialAmount; // The creator owns all initial tokens
        totSupply = _initialAmount; // Update total token supply
        name = _tokenName; // Store the token name (used for display only)
        decimals = _decimalUnits; // Store the number of decimals (used for display only)
        symbol = _tokenSymbol; // Store the token symbol (used for display only)
    }

    // 是否就绪
    bool public ifReset;

    //  enum WorkStatus {Certified, Processing, Completed}
    //  定义扶贫群众结构体
    struct poorObject {
        address recipient; // 接收人
        uint256 amount; // 救助金额
        uint256 count; // 救助次数
        uint256 serialNum; // 序列号
        uint256[] poorTrack; // 追踪每笔救助情况
        //  WorkStatus status;
    }

    // 存储贫困户地址
    address[] public poorAddr;
    //  mapping(address => poorTrack) public poorTracks;
    // 映射每个贫困户救助次数
    mapping(address => uint256) public donateCount;

    // 判断是否为贫困对象
    mapping(address => bool) public ifExistPoor;
    //  每个地址映射结构体中信息
    mapping(address => poorObject) poorFamily;
    //  以唯一的id寻找poorObject
    mapping(uint256 => poorObject) public poorObjectById;
    //  存储不同的结构体对象
    poorObject[] public poorCases;
    uint256 public id;
    uint256  index;

    // 定义帮扶人对象结构体
    struct authorizedObject {
        //  address authAddr;
        uint256 authAmount; // 授予帮扶人金额
        address father; //当前父节点（即当前地址）
       address[] child; //当前节点的子节点（用于记录资金调度流向）
     
    }

    // 存储帮扶人地址
    address[] public authAddr;
    // 判断是否为帮扶人
    mapping(address => bool) public ifExistAuth;
    // 当前角色信息与其地址的映射关系
    mapping(address => authorizedObject) authorizedParty;
    // 通过id确定子节点唯一性
    mapping(uint256 => authorizedObject) authorizedChild;

    //   function checkGoalReached(address _auth) public returns (bool reached) {
    //     uint256 menber = authorizedParty[_auth].child.length;
    //       for(uint256 i=0; i<menber; i++){

    //       address  _addrOfPoor = authorizedParty[_auth].child[i];
    //              if(authorizedParty[_auth].authAmount == 0){
    //                   poorFamily[_addrOfPoor].status = WorkStatus.Completed;
    //      ifExistPoor[_addrOfPoor] = false;

    //         } else{
    //             poorFamily[_addrOfPoor].status = WorkStatus.Processing;
    //         }
    //   }
    //         return true;

    //     }

function getAllHelper() public view returns(address[] memory){
    return authAddr;
}

function getAllPoor() public view returns(address[] memory){
    return poorAddr;
}

    // 通过id查询救助情况
    function getRescueCasesById(uint256 _id)
        public
        view
        returns (
        address helper,
            address recipient,
            uint256 amount,
            uint256 count
        )
    {
        return (
            authorizedChild[_id].father,
            poorObjectById[_id].recipient,
            poorObjectById[_id].amount,
            poorObjectById[_id].count
        );
    }

    // 显示该贫困户的所有救助序列号
    function getPoorTract(address _poor)
        public
        view
        returns (uint256[] memory)
    {
        require(ifExistPoor[_poor], "请输入受助人地址查询");
        return poorFamily[_poor].poorTrack;
    }

    // 获取该贫困户余额
    function getPoorAmount(address _poor) public view returns (uint256 amount) {
        require(ifExistPoor[_poor], "请输入受助人地址查询");
        return poorFamily[_poor].amount;
    }

    // 获取帮扶者余额
    function getAuthAmount(address _auth)
        public
        view
        returns (uint256 authAmount)
    {
        require(ifExistAuth[_auth], "请输入帮扶人地址查询");
        return authorizedParty[_auth].authAmount;
    }

    // 显示帮扶人资金流动，帮扶的困难群众地址
    function getAuthAmountTo(address _auth)
        public
        view
        returns (address[] memory _toPoor)
    {
        // address addrOfPoor;
        // for(uint256 i=0; i<authorizedParty[_auth].child.length; i++){
        //  addrOfPoor = authorizedParty[_auth].child[i];
        // }
        return authorizedParty[_auth].child;
    }

    // 总拨款次数
    function getAllDonate() public view returns (uint256 _donateCount) {
        return DonateNumber;
    }

    // 设置系统管理员
    function setPAManager(address _admin) public {
        Administrator = _admin;
        ifReset = true;
    }

    function getPAManager() public view returns (address) {
        return Administrator;
    }

    // 总拨款额
    function getDonateAmount() public view returns (uint256 _total) {
        uint256 totalDonate;
        for (uint256 i = 0; i < poorCases.length; i++) {
            totalDonate += poorCases[i].amount;
        }
        return totalDonate;
    }

    // 定义修饰器(装饰器)
    modifier ownerOnly {
        require(msg.sender == Administrator);
        _; // 代表修饰器所修饰函数中的代码。
    }

    // 修饰器修饰函数。 (先执行修饰器中的代码，再执行函数中的代码)
    function rescueCount() private ownerOnly returns (uint256) {
        DonateNumber += 1;
    }

    // 直接向贫困户账户打钱
    function transfer(address _to, uint256 _value)
        public
        override
        ownerOnly
        returns (bool success)
    {
        require(ifReset == true, "您还没有管理员权限，不得执行合约内容!!");
        assert(ownership == Administrator);
               require(!ifExistAuth[_to], "资金交付目标不能为帮扶人!");
        require(balances[ownership] >= _value, "资金不足，无法转移资金!!");

        id++;

        balances[ownership] -= _value;
        balances[_to] += _value;

        poorFamily[_to].amount += _value;

        if (!ifExistPoor[_to]) {
            poorAddr.push(_to);
            ifExistPoor[_to] = true;
        }

        Beneficiary = _to;

        poorObject memory poor = poorObject({
            recipient: Beneficiary,
            amount: _value,
            count: ++donateCount[Beneficiary],
            serialNum: id,
            poorTrack: poorFamily[_to].poorTrack
        });

        poorCases.push(poor);

        poorObjectById[id] = poorCases[index];
        poorFamily[_to].poorTrack.push(id);

        index++;
        rescueCount();
        emit Transfer(ownership, _to, _value);
        return true;
    }

    // 授权第三方并拨款，代以转账
    function transferFromAuth(
        address _auth,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        uint256 allowance = allowed[Administrator][_auth];
        // require(_to != address(0), "transfer error: 接收地址不能为空");
        require(_auth != _to, "资金交付目标不能为本人");
        require(!ifExistAuth[_to], "资金交付目标不能为帮扶人!");
        require(
            authorizedParty[_auth].authAmount >= _value &&
                balances[msg.sender] >= _value,
            "Insufficient allowed funds for transfer source."
        );

        id++;
        balances[_to] += _value;
        balances[Administrator] -= _value;

        authorizedParty[_auth].authAmount -= _value;
        poorFamily[_to].amount += _value;

       if(!ifExistPoor[_to]){
            poorAddr.push(_to);
        ifExistPoor[_to] = true;
       }
        //确定资金流通的流向关系
        authorizedParty[_auth].child.push(_to);
        authorizedChild[id].father = _auth;

        Beneficiary = _to;

        poorFamily[_to].poorTrack.push(id);

        poorObject memory poor2 = poorObject({
            recipient: _to,
            amount: _value,
            count: ++donateCount[_to],
            serialNum: id,
            poorTrack: poorFamily[_to].poorTrack
        });
        poorCases.push(poor2);
        poorObjectById[id] = poorCases[index];

        if (allowance < MAX_UINT256) {
            allowed[Administrator][_auth] =
                allowed[Administrator][_auth] -
                _value;
        }
        index++;
        rescueCount();
        emit Transfer(_auth, _to, _value); //solhint‐disable‐line indent, no‐unused‐vars
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external override returns (bool success) {
        uint256 allowance = allowed[_from][msg.sender];

        if (allowance < MAX_UINT256) {
            allowed[_from][msg.sender] = allowed[_from][msg.sender] - _value;
        }

        emit Transfer(_from, _to, _value); //solhint‐disable‐line indent, no‐unused‐vars
        return true;
    }

    // Return the current balance (in tokens) of a specified address
    function balanceOf(address _owner)
        public
        override
        view
        returns (uint256 balance)
    {
        return balances[_owner];
    }

    // Set
    function approve(address _spender, uint256 _value)
        public
        override
        returns (bool success)
    {
        require(msg.sender == Administrator, "您还没有管理员权限，不得执行!!");

        allowed[Administrator][_spender] = _value;
        //   authorizedObject memory Auth = authorizedObject(helpOrganizers, _value);
        //           Authorizer.push(Auth);
       
   if(!ifExistAuth[_spender]){
            authAddr.push(_spender);
         ifExistAuth[_spender] = true;
 
   }  
    authorizedParty[_spender].authAmount =
            authorizedParty[_spender].authAmount +
            _value;
        helpOrganizers = _spender;
       
        
        emit Approval(ownership, _spender, _value);
        return true;
    }

    // Return the
    function allowance(address _owner, address _spender)
        public
        override
        view
        returns (uint256 remaining)
    {
        return allowed[_owner][_spender];
    }

    // Return the total number of tokens in circulation
    function totalSupply() public override view returns (uint256 totSupp) {
        return totSupply;
    }
}
