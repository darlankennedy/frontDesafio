import React, { useEffect, useState, Fragment } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import ReadOnlyRowCompras from "./../components/ReadOnlyRowCompras";
import EditFormDataCompras from "../components/EditFormDataCompras";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const [compras, setCompras] = useState([]);
  const [showModal, setShow] = useState(false);
  const [title, seTTitle] = useState("");
  const [editFormData, setEditFormData] = useState({
    total: "",
    tipo_pagamento: "",
    status: "",
  });

  useEffect(() => {
    api.get("compras", {}).then((response) => {
      setCompras(response.data);
    });
  }, []);

  const toggle = () => {
    setShow(!showModal);
  };
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };

    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditClick = (event, compra) => {
    event.preventDefault();

    seTTitle("Editar Compra");
    const formValues = {
      id: compra.id,
      total: compra.total == null ? "" : compra.total,
      tipo_pagamento:
        compra.tipo_pagamento == null ? "" : compra.tipo_pagamento,
      status: compra.status == null ? "" : compra.status,
    };

    setEditFormData(formValues);

    setShow(true);
  };

  async function handleDeleteClick(event, compra) {
    event.preventDefault();

    const newContacts = [...compras];

    const index = compras.findIndex((contact) => contact.id === compra.id);

    newContacts.splice(index, 1);

    const res = await api
      .delete(`compras/${compra.id}`, {})
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    setCompras(newContacts);
  }

  function abrirModal() {
    seTTitle("adicionar Compra");

    const formValues = {
      nome: "",
      descricao: "",
      preco: "",
    };

    setEditFormData(formValues);

    toggle();
  }

  async function handleEditFormSubmit(event, prop) {
    event.preventDefault();

    const editedCompra = {
      id: editFormData.id,
      total: editFormData.total,
      tipo_pagamento: editFormData.tipo_pagamento,
      status: editFormData.status,
    };

    const newCompra = [...compras];

    const index = newCompra.findIndex(
      (produto) => produto.id === editedCompra.id
    );

    newCompra[index] = editedCompra;

    console.log(newCompra, index, editedCompra);

    try {
      if (editedCompra.id == undefined) {
        const res = await api
          .post(`/compras`, editedCompra, {})
          .then((response) => {
            newCompra.push(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        seTTitle("Editar Compra");
        const res = await api
          .put(`/compras/${editedCompra.id}`, editedCompra, {})
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      alert("erro ao cadastrar");
    }

    setShow(false);
    setCompras(newCompra);
  }

  const navigate = useNavigate();

  return (
    <div className="container-md">
      <Button style={{ margin: "20px" }} onClick={() => navigate("/")}>
        Produtos
      </Button>
      <Button onClick={abrirModal} style={{ margin: "20px" }}>
        Adicionar Compra
      </Button>
      <Table dark bordered>
        <thead>
          <tr>
            <th>Id#</th>
            <th>Total</th>
            <th>Tipo de Pagamento</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra, index) => (
            <Fragment key={index}>
              <ReadOnlyRowCompras
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                compra={compra}
              />
            </Fragment>
          ))}
        </tbody>
      </Table>
      <EditFormDataCompras
        show={showModal}
        toggle={toggle}
        tile={title}
        handleEditFormChange={handleEditFormChange}
        editFormData={editFormData}
        setProps={handleEditFormSubmit}
      />
    </div>
  );
};
