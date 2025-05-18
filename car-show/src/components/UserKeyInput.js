import { useState } from "react";
import { Button, Form } from "react-bootstrap";
//import "../styles/user-key-input.css";

function UserKeyInput() {
  let keyData = "";
  const saveKeyData = "MYKEY";
  const prevKey = localStorage.getItem(saveKeyData);
  if (prevKey !== null) {
    keyData = JSON.parse(prevKey);
  }

  const [key, setKey] = useState(keyData);

  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  }

  function changeKey(event) {
    setKey(event.target.value);
  }

  return (
    <div id="user-key-input-wrapper">
      <Form>
        <Form.Label>API Key:</Form.Label>
        <Form.Control
          id="user-key-input-box"
          type="password"
          placeholder="Insert API Key Here"
          onChange={changeKey}
        />
        <br />
        <Button className="Submit-Button" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UserKeyInput;

