import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  //function to handle submit
  const handleSubmit = () => {
    const payload = {
      email: email,
      pass: pass
    };
    console.log(payload);
    fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    //if I am trying to make a fetch request initiall i will get cors error to resolve this install cors in backend and use it inside index.js
  };
  return (
    <div>
      {/* what are different thing we need */}
      <h1>Registration Page</h1>
      Email:{" "}
      <input
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      Password:{" "}
      <input
        type="password"
        value={pass}
        placeholder="Enter password"
        onChange={(e) => setPass(e.target.value)}
      />
    
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export { Login };
//now add this inside app.js
