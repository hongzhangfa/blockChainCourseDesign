# BlockChain-Application for Targeted poverty alleviation

#####    										基于区块链的精准扶贫信息管理技术方案



#### ***开发本套系统的智能合约说明使用***

1. #####  实验环境搭建

   - ###### Solidity安装 （强烈建议新手使用 [Browser-Solidity](https://link.zhihu.com/?target=https%3A//ethereum.github.io/browser-solidity/)来进行开发）

   - ###### Geth 安装      （各类平台安装参考：[geth官方安装指引](https://link.zhihu.com/?target=https%3A//github.com/ethereum/go-ethereum/wiki/Building-Ethereum)）

   - ###### 启动环境          (准备、创建账户/解锁账户/账户间转账等命令)

     

2. #####  安装操作工具

   - ###### Solidity 集成开发环境——   [官方Remix在线编辑](https://remix.ethereum.org/#version=soljson-v0.4.15+commit.bbb8e64f.js)

     ###### 该项目智能合约是在本地中编译部署 （[本地安装Remix](https://github.com/ethereum/remix)）

   - ###### Visual Studio Extension  ([官方Solidity插件](https://marketplace.visualstudio.com/items?itemName=ConsenSys.Solidity)) 

     ###### 支持Microsoft Visual Studio Code编译Solidity的插件

   - ###### Dapp ([官方文档](https://dapp.readthedocs.io/en/latest/))

     ###### Dapp（去中心化应用）是一个构建工具，包管理器和Solidity的部署助手

     

3. #####  合约代码编写

   ```	javascript
   // SPDX-License-Identifier: MIT 
    	pragma solidity^0.6.1;
   ```

   

   1.    首行为什么这样写， 引用官方文档的一段来说明：

      > Trust in smart contract can be better established if their source code is available. Since making source code available always touches on legal problems with regards to copyright, the Solidity compiler encourages the use of machine-readable [SPDX license identifiers](https://spdx.org/). Every source file should start with a comment indicating its license:
      >
      > // SPDX-License-Identifier: MIT
      
   2.  第二行 关键字 `pragma` 版本标识指令，用来启用某些编译器检查

      > 版本标识使用如下:
      >
      > ```
      > pragma solidity ^0.5.2;
      > ```
      >
      > 这样，源文件将既不允许低于 0.5.2 版本的编译器编译，也不允许高于（包含）0.6.0版本的编译器编译（因使用 `^` ）

      

   3. 

      > ```	js
      >contract PAManage is ERC20Interface {
      >      uint256 private constant MAX_UINT256 = 2**256 - 1;
      >    address Administrator; // 管理员
      >     address public helpOrganizers; // 帮扶人（组织）
      >    address public Beneficiary; // 受益人
      >     uint256 DonateNumber; // 拨款总次数
      >    address ownership = msg.sender;
      > 
      >    mapping(address => uint256) balances;
      >     mapping(address => mapping(address => uint256)) allowed;
      >```
      > 
      >​			
      
      
      
      ​     `PAManage` 是合约名称，继承于   `ERC20Interface.sol` 规范标准合约。
      
      其中定义了该扶贫系统中一些主要的变量和涉及的相关方法，另外是采用代币化形式来模拟，因此还有些基于代币属性的定义，以便下面的构造方法和相关方法实现。
      
   ------
      

      
   4. 

      ```  js
       bool public ifReset;
      // 设置系统管理员
      function setPAManager(address _admin) public{
         Administrator = _admin;
         ifReset = true;
      }
      ```

      接下来抽取几个合约方法片段，言简意赅地表述其实现与作用吧。首先，我写了个`setPAManager` 方法，就是将你传入的地址（部署合约地址）作为执行该系统的管理员账户地址，类似权限交付，只有这样，你才能操控整个系统。否则，你会得到如下提示信息： 

      > <img src="https://i.loli.net/2020/12/27/OlasV54UzSG29RI.png" alt="image-20201201211840158" style="zoom:67%;" />

      

      ------

      5.

      ```	js
      function transfer(address _to, uint256 _value) public override returns (bool success){
      	    require(ifReset == true, "您还没有管理员权限，不得执行合约内容!!");
              assert(ownership == Administrator);
              require( balances[ownership] >= _value, "资金不足，无法转移资金!!" );
              Beneficiary = _to;
              balances[ownership] -= _value;
              balances[Beneficiary] += _value;
              rescueCount();
              emit Transfer(ownership, _to, _value); 
              return true;
      }
      ```

      

      这个名为`transfer` 方法，英文不错的读者应该能猜出个大概吧，顾名思义，它也是重写方法（看`override` 关键字），作用是在两个账户间进行转账交易的，也就是由系统从扶贫资金库直接向贫困户拨款（有点草率了）。 调用结果如图:

      > ![image-20201201214844248](https://i.loli.net/2020/12/03/pAKVyle2dt36z5W.png)
      >
      > ![image-20201201215000646](https://i.loli.net/2020/12/03/igvObnD7asXoYjG.png)

---

6.

```js
// Transfer tokens from one specified address to another specified address
    function transferFrom(address _from, address _to, uint256 _value) public override returns (bool success) {
        uint256 allowance = allowed[_from][ownership];
        require(balances[_from] >= _value && allowance >= _value,
        "Insufficient allowed funds for transfer source.");
```





```	js
// Set up or authorize a client/helpOrganizers
        function approve(address _spender, uint256 _value) public override returns (bool success){
        require(msg.sender == Administrator, "您还没有管理员权限，不得执行!!");

        allowed[Administrator][_spender] = _value;
        authorizedParty[_spender].authAmount =
        authorizedParty[_spender].authAmount +  _value;
 // 判断授权账户是否已在列表中
   if(!ifExistAuth[_spender]){
            authAddr.push(_spender);
         ifExistAuth[helpOrganizers] = true;
 } 
```



​	   `transferFrom` 方法同样用于转账交易，名曰委托转账。所以要想调用此方法，前提是必须委托或授权一个中间人（帮扶人），作为保举贫困户入库的人员或组织，且其也需承担一定的风险（具体参见攥写的方案）。 ` ifExistAuth[_spender]`  这是个条件判断，将新授权的账户地址存储起来，而对于已被授权了的，则可略过，方便后期管理，以免误判。

---

7.

```	js
function RescueCase(address _poor) payable public returns (uint256 amount) {
    assert(ownership == Administrator);
    Beneficiary = _poor;
 	... ...    
}
```

  

   `RescueCase`  方法部分所示，既然前面有了两种交易途径，那么对于上述方法产生的结果如何一一呈现呢，此方法用于回执相关信息的（做的比较简陋，如拨款金额，受益者等），并且是有代价的查询。与此关联的内容如下，不再详述了。调用结果如图：

```	js
//  定义一个扶贫对象结构体，用于存储相关信息（贫困户地址和救助资金）
 struct poorObject {
     address addr;
     uint  amount;
 }
 poorObject[] public poorCases;
 uint256 public totalAmount;  // 拨款总额
```



> ![image-20201227201034019](https://i.loli.net/2020/12/27/SaKYpRD7twzQ5eH.png)

---

8.

```	js
  // 修饰器修饰函数 (先执行修饰器中的代码，再执行函数中的代码)
        function rescueCount() private ownerOnly returns (uint) {
          DonateNumber += 1;
   	}
```

然后再简单说说`rescueCount` 方法，本身没什么特别，就一普通的计数器，用于在执行完转账交易后捕捉每次调用动作的。效果如图所示：

> <img src="https://i.loli.net/2020/12/03/juLw9F6NAtYVQnS.png" alt="image-20201202010839082" style="zoom:67%;" />

------



**新增功能**：

1、 

```	js
  // 显示该贫困户的所有救助序列号
    function getPoorTract(address _poor) public view returns (uint256[] memory){
        require(ifExistPoor[_poor], "请输入受助人地址查询");
        return poorFamily[_poor].poorTrack;
    }
```

​	`getPoorTract`  该方法用于扶贫群众救助溯源，显示指定贫困户账户在整个扶贫链上受助记录的所有ID号。如图：

> ![image-20201227115053845](https://i.loli.net/2020/12/27/3JzSGqgEXmR6IcD.png)

2、 那么有了这些交易ID，我们就可以按图索骥，查询各个ID对应的相关救助数据。于是据自己的业务逻辑，写了个 `getRescueCasesById`  方法:

```	js
  // 通过id查询救助情况
    function getRescueCasesById(uint256 _id) public view returns (
        address helper, address recipient, uint256 amount, uint256 count){
        return (
            authorizedChild[_id].father,
            poorObjectById[_id].recipient,
            poorObjectById[_id].amount,
            poorObjectById[_id].count
        );
    }
```

效果图如下：

> ![image-20201227120045227](https://i.loli.net/2020/12/27/p2JsZ4hlkBgjiNw.png)

> ![image-20201227120138518](https://i.loli.net/2020/12/27/vH6Y4NsIhyTaZ2b.png)

**注意：** 稍微细心的读者可能会发现上面两幅图里的猫腻，其中一个 `address: helper`  账户地址为空，咋回事啊？小老弟，你这有bug啊。我丝毫不慌：），前面文字已经叙述了本系统有两种资助方式：一是直接转账（也就是 `helper: 0x000...` 的情况）；二是间接转账（ `helper` !=addr(0)时）。其实我也是再调试时，无意中发现此bug，琢磨了下才修改成这样的。（有点小傲娇哦：）



3、当然咯，我们也可以从第三方（帮扶人）维度去核实溯源结果。比如这有个简单明了的数据回显方法 `getAuthAmountTo` 。

```	js
  // 显示帮扶人资金流动，帮扶的困难群众地址
    function getAuthAmountTo(address _auth)
        public view returns (address[] memory _toPoor){
        // address addrOfPoor;
        // for(uint256 i=0; i<authorizedParty[_auth].child.length; i++){
        //  addrOfPoor = authorizedParty[_auth].child[i];
        // }
        return authorizedParty[_auth].child;
    }
```

效果图：

> ![image-20201227122929695](https://i.loli.net/2020/12/27/73sXLZWzNUumHRP.png)

看，是不是一目了然（emm），将指定帮扶人账户地址所救助对象的账户以列表形式展示。开始调这个也是有问题的，就是没有解决数据去重（已解决），因此以上新增功能，可以说是经过本人深思熟虑、绞尽脑汁而最终设计的一个比较完整的方案了。



4. #####  总结与体会

   ​		本系统设计目的是让扶贫中真实的身份信息得以安全存证，通过对合约的编写与操作，让我收获很多，其中受益最大的莫过于动手编码及整合能力。即使这个过程中，你会犯各种（低级）错误亦或代码每每编译失败，也不要灰心丧气而就此止步，因为这些都将成为你以后工作中的家常便饭，只有慢慢地适应它，并乐观面对坦诚接受，相信皇天不负有心人，你终将直挂云帆济沧海，驶向更美好的远方。

   另外，个人觉得该合约的细节部分还有待完善，功能亦尚未完备，业务逻辑结构需大幅度改进，希望对此项目感兴趣的读者或开发经验丰富的程序猿，能给予些许有效提议和技术上的支持。你们的鼓励是我前进路上的无限动力。











​	









