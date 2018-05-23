# LIQNET TOKEN
Sample token contract on ERC20 standard. With partial support of ERC223

## Dev
For use tests or check code style firstly run `npm install`

## Tests
For run truffle test and lint code use command `npm run test`

## Merge
In order to merge files(to simplify verification on Etherscan) run `npm run merge`.
The merged contracts will appear in `./merge` folder.

## Code style
We use  [solhint](https://protofire.github.io/solhint/rules.html) for lint Solidity code and ESLint for lint JS code
For check code style use command `npm run lint`


## LIQNET Token Methods
### 1. function totalSupply
Returns the outstanding supply of all tokens.

    uint public totalSupply;
### 2. function balanceOf
Returns the balance of the source address.

    function balanceOf(address src) constant returns (uint)
### 3. function allowance
Returns the amount of tokens that a person can withdraw from the source address via the transferFrom function.

      function allowance(address src, address guy) constant returns (uint)
### 4. function approve
Approves guy to withdraw tokens from msg.sender via the transferFrom function. Throws on uint overflow.

    function approve(address guy, uint wad) returns (bool)
### 5. function transfer
Transfers wad tokens from msg.sender to the dst address. Throws on uint overflow.

    function transfer(address dst, uint wad) returns (bool)
### 6. function transferFrom
Assumes sufficient approval set by the approve function. Transfers wad tokens from the src address to the dst address and decrements
from approvals[src][msg.sender]. Throws on uint overflow.

    function transferFrom(address src, address dst, uint wad) returns (bool)

