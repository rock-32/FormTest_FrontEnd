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
      if(nameRef.current.value == ""){
        alert("Please Fill The Name")
        return false;
      }
      else if(AgeRef.current.value ==""){
        alert("Please Fill The Age")
        return false;
      }
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
      <div style={{width:"90%",maxWidth:"500px",backgroundColor:"lightgray",display:"flex",flexDirection:"column",height:"500px",alignItems:"center",justifyContent:"center",borderRadius:"10px"}}>
        <input type="text" ref={nameRef} placeholder="Name" style={{width:"300px",borderRadius:"5px"}}/>
        <input type="text" ref={AgeRef} placeholder="Age" style={{width:"300px",borderRadius:"5px",marginTop:"5px"}}/>
        <button style={{borderRadius:"5px",padding:"5px 10px",marginTop:"5px",border:"none",backgroundColor:"black",color:"white"}} onClick={() => submit()}>Submit</button>
      </div>
    </div>
  );
}

export default UserForm;
