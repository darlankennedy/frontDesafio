import React from "react";
import { Button } from "reactstrap";

const ReadOnlyRow = (props) => {
  return (
    <tr key={props.id}>
      <td>{props.produto.id}</td>
      <td>{props.produto.nome}</td>
      <td>{props.produto.descricao}</td>
      <td>{props.produto.preco}</td>
      <td>
        <Button
          style={{ margin: "2px" }}
          color="success"
          onClick={(event) => props.handleEditClick(event, props.produto)}
        >
          Edit
        </Button>
        <Button
          style={{ margin: "2px" }}
          color="danger"
          onClick={(event) => props.handleDeleteClick(event, props.produto)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};
export default ReadOnlyRow;
