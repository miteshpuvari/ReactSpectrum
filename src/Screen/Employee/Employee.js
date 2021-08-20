import React, { useState, useEffect } from "react";
import {
  Form,
  TextField,
  Button,
  Dialog,
  DialogTrigger,
  ActionButton,
  ButtonGroup,
  Content,
  Divider,
  Heading,
  Checkbox,
} from "@adobe/react-spectrum";
import {
  Cell,
  Column,
  Row,
  TableView,
  TableBody,
  TableHeader,
} from "@react-spectrum/table";
import "../Employee/Employee.css";
<link
  rel="stylesheet"
  href="node_modules/@spectrum-css/vars/dist/spectrum-global.css"
></link>;

// get the data from local storage
const grtLocalItems = () => {
  let list = localStorage.getItem("lists");
  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Employee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const [items, setItems] = useState(grtLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  console.log("here is item data", items);

  const Add = () => {
    console.log("items is here :", number);
    if (!name) {
      alert("Name can not blank!!!");
      return false;
    } else if (name && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return {
              ...elem,
              name: name,
              email: email,
              number: number,
              address: address,
            };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setName("");
      setIsEditItem(null);
    }

    if (!email) {
      alert("Email can not blank!!!");
      return false;
    } else if (email && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return {
              ...elem,
              name: name,
              email: email,
              number: number,
              address: address,
            };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setEmail("");
      setIsEditItem(null);
    }
    if (!number) {
      alert("Number can not Blank!!");
      return false;
    } else if (number && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return {
              ...elem,
              name: name,
              email: email,
              number: number,
              address: address,
            };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setNumber("");
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: name,
        email: email,
        number: number,
        address: address,
      };
      setItems([...items, allInputData]);
    }
  };

  let columns = [
    { name: "Name", uid: "name" },
    { name: "Email", uid: "email" },
    { name: "Contact", uid: "number" },
    { name: "Address", uid: "address" },
    { name: "Action", uid: "action" },
  ];

  // add data in local storage
  useEffect(
    () => {
      localStorage.setItem("lists", JSON.stringify(items));
    },
    [items],
    console.log("All data is:", items)
  );

  //Delete item
  const deleteItem = (index) => {
    console.log("id for delete: ", index);
    const updateditems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updateditems);
  };

  // Edit item
  const editIten = (id) => {
    console.log("edit id here :", id);

    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    setName(newEditItem.name);
    setEmail(newEditItem.email);
    setNumber(newEditItem.number);
    setAddress(newEditItem.address);
    setIsEditItem(id);

    console.log("updated data is:", newEditItem);
  };

  return (
    <div className="inputContainer">
      <div className="formContainer">
        <h1 className="title">Employee Data</h1>
        <Form
          className="form"
          maxWidth="size-3600"
          isRequired
          necessityIndicator="label"
        >
          <TextField
            label="Name"
            placeholder="ab patel"
            value={name}
            onChange={setName}
          />
          <TextField
            label="Email"
            placeholder="abc@adobe.com"
            value={email}
            onChange={setEmail}
          />
          <TextField
            label="Contact"
            placeholder="9745746065"
            value={number}
            onChange={setNumber}
          />
          <TextField
            label="Address"
            placeholder="123 Any Street"
            isRequired={false}
            value={address}
            onChange={setAddress}
          />
          <Button variant="secondary" onPress={Add}>
            Add
          </Button>
        </Form>
      </div>
      <div className="table">
        <Form className="form">
          <TableView
            aria-label="Example table with dynamic content"
            maxWidth="size-8000"
          >
            <TableHeader columns={columns}>
              {(column) => <Column key={column.uid}>{column.name}</Column>}
            </TableHeader>
            <TableBody items={items}>
              {(item) => (
                <Row>
                  {(data) => (
                    <Cell>
                      {item[data]}
                      <DialogTrigger>
                        <ActionButton>Edit</ActionButton>
                        {(items) => (
                          <Dialog>
                            <Heading>Employee Data</Heading>
                            <Divider />
                            <ButtonGroup>
                              <Button
                                autoFocus
                                variant="cta"
                                onPress={() => editIten(item.id)}
                              >
                                Save
                              </Button>
                            </ButtonGroup>
                            <Content>
                              <Form>
                                <TextField
                                  label="Name"
                                  Value={name}
                                  // onChange={setName}
                                />
                                <TextField
                                  label="Email"
                                  Value={email}
                                  // onChange={setEmail}
                                />
                                <TextField
                                  label="Contact"
                                  Value={number}
                                  // onChange={setNumber}
                                />
                                <TextField
                                  label="Address"
                                  Value={address}
                                  // onChange={setAddress}
                                />
                                {/* <Checkbox>Make private</Checkbox> */}
                              </Form>
                            </Content>
                          </Dialog>
                        )}
                      </DialogTrigger>
                      {/* {" "}
                      <button
                        onClick={() => {
                          deleteItem(item.id);
                        }}
                      >
                        Delete
                      </button>{" "} */}
                    </Cell>
                  )}
                </Row>
              )}
            </TableBody>
          </TableView>
        </Form>
      </div>
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default Employee;
