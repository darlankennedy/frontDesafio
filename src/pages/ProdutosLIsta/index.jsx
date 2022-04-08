import React, { useEffect, useState, Fragment } from "react";
import { Table, Button } from "reactstrap";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import ReadOnlyRow from "./../components/ReadOnlyRow";
import EditFormData from "../components/EditFormData";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const [produtos, setProdutos] = useState([]);
  const [showModal, setShow] = useState(false);
  const [title, seTTitle] = useState("");

  const [editFormData, setEditFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
  });

  useEffect(() => {
    api.get("produto", {}).then((response) => {
      setProdutos(response.data);
    });
  }, []);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
  };

  const toggle = () => setShow(!showModal);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };

    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditClick = (event, produto) => {
    event.preventDefault();
    seTTitle("Editar Produto");

    const formValues = {
      id: produto.id,
      nome: produto.nome == null ? "" : produto.nome,
      descricao: produto.descricao == null ? "" : produto.descricao,
      preco: produto.descricao == null ? "" : produto.preco,
    };

    setEditFormData(formValues);

    setShow(true);
  };

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
    console.log(event, prop);

    const editedProduct = {
      id: editFormData.id,
      nome: editFormData.nome,
      descricao: editFormData.descricao,
      preco: editFormData.preco,
    };

    const newProduto = [...produtos];

    const index = produtos.findIndex(
      (produto) => produto.id === editedProduct.id
    );

    newProduto[index] = editedProduct;

    console.log(newProduto, index, editedProduct);

    try {
      if (editedProduct.id == undefined) {
        const res = await api
          .post(`produto`, editedProduct, {})
          .then((response) => {
            console.log(response.data);
            newProduto.push(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const res = await api
          .put(`produto/${editedProduct.id}`, editedProduct, {})
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
    setProdutos(newProduto);
  }

  async function handleDeleteClick(event, produto) {
    event.preventDefault();

    const newContacts = [...produtos];

    const index = produtos.findIndex((contact) => contact.id === produto.id);

    newContacts.splice(index, 1);

    const res = await api
      .delete(`produto/${produto.id}`, {})
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    setProdutos(newContacts);
  }
  const navigate = useNavigate();
  return (
    <>
      <div className="container-md">
        <Button style={{ margin: "20px" }} onClick={() => navigate("/compras")}>
          Compras
        </Button>
        <Button onClick={abrirModal} style={{ margin: "20px" }}>
          Adicionar Produto
        </Button>
        <Table dark bordered>
          <thead>
            <tr>
              <th>Id#</th>
              <th>nome</th>
              <th>descricao</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto, index) => (
              <Fragment key={index}>
                <ReadOnlyRow
                  produto={produto}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                />
              </Fragment>
            ))}
          </tbody>
        </Table>

        <EditFormData
          show={showModal}
          toggle={toggle}
          tile={title}
          handleEditFormChange={handleEditFormChange}
          editFormData={editFormData}
          setProps={handleEditFormSubmit}
        />
      </div>
    </>
  );
};
