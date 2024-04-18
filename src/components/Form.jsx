import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/form.css";

function UserForm() {
  let nameRef = useRef("");
  let AgeRef = useRef("");
  const navigate = useNavigate();

  async function submit() {
    try {
      let obj = {
        name: nameRef.current.value,
        age: AgeRef.current.value,
        isUpdateneeded: false,
      };
      let isSuccess = await axios.post("http://localhost:5071/api/Form", obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (isSuccess) {
        alert("added");
        navigate("/userdetails");
      } else {
        alert("failed");
      }
    } catch (err) {
      alert("failed");
      console.error(err);
    }
  }

  return (
    <div style={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div style={{width:"90%",minWidth:"300px",backgroundColor:"black",display:"flex",flexDirection:"column",height:"500px",alignItems:"center",justifyContent:"center"}}>
        <input type="text" ref={nameRef} placeholder="Name" style={{width:"300px",borderRadius:"5px"}}/>
        <input type="text" ref={AgeRef} placeholder="Age" style={{width:"300px",borderRadius:"5px"}}/>
        <button style={{width:"200px",borderRadius:"5px"}} onClick={() => submit()}>Submit</button>
      </div>
    </div>
  );
}

export default UserForm;
