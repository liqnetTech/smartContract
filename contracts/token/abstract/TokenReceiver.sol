pragma solidity  ^0.4.21;

contract TokenReceiver {
  function tokenFallback(address _sender, address _origin, uint _value) public returns (bool ok);
}
