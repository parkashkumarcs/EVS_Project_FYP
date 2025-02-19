function Message() {
  const name = "Name";
  function callName() {
    return name;
  }
  return <h1>Hello {callName()}</h1>;
}

export default Message;