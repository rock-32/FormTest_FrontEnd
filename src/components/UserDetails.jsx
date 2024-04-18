import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";

function UserDetails() {
  const [state, setState] = useState([]);
  let nameRef = useRef("");
  let ageRef = useRef("");

  useEffect(() => {
    getuserdata();
  });

  async function getuserdata() {
    try {
      var datas = await axios.get("http://localhost:5071/api/Form", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setState(datas.data);
      console.log(datas.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function removeUser(id) {
    try {
      await axios.delete(`http://localhost:5071/api/Form/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      getuserdata();
    } catch (err) {
      console.log(err);
    }
  }

  async function UpdateUser(obj, condition) {
    var updating;
    if (condition == "edit") {
      updating = {
        name: obj.name,
        age: obj.age,
        isUpdateneeded: true,
      };
    } else {
      updating = {
        name: nameRef.current.value,
        age: ageRef.current.value,
        isUpdateneeded:false,
      };
    }
    let isupdated = await axios.put(
      `http://localhost:5071/api/Form/${obj.id}`,
      updating,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if(isupdated == false){
        alert("fail")
    }
    getuserdata();
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Age</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.map((x) => (
            <tr>
              <td>{x.id}</td>
              <td>{!x.isUpdateneeded ? x.name : <input ref={nameRef} defaultValue={x.name} type="text" />}</td>
              <td>{!x.isUpdateneeded ? x.age : <input ref={ageRef} defaultValue={x.age} type="text" />}</td>

              <td>
                {!x.isUpdateneeded ? (
                  <button onClick={() => UpdateUser(x, "edit")}>Edit</button>
                ) : (
                  <button onClick={() => UpdateUser(x, "update")}>
                    Update
                  </button>
                )}
              </td>
              <td>
                <button onClick={() => removeUser(x.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserDetails;
