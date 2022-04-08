import React from "react";
import { Button } from "reactstrap";

const ReadOnlyRow = (props) => {
  return (
    <tr key={props.compra.id}>
      <td>{props.compra.id}</td>
      <td>{props.compra.total}</td>
      <td>{props.compra.tipo_pagamento}</td>
      <td>{props.compra.status}</td>
      <td>
        <Button
          style={{ margin: "2px" }}
          color="success"
          onClick={(event) => props.handleEditClick(event, props.compra)}
        >
          Edit
        </Button>
        <Button
          style={{ margin: "2px" }}
          color="danger"
          onClick={(event) => props.handleDeleteClick(event, props.compra)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};
export default ReadOnlyRow;
