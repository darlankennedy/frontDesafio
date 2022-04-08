import React from "react";
import {
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const EditFormData = (props) => {
  return (
    <Modal isOpen={props.show} toggle={props.toggle}>
      <Form>
        <ModalHeader toggle={props.toggle}>{props.tile}</ModalHeader>
        <ModalBody>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label for="nome">Nome</Label>
                <Input
                  id="nome"
                  name="nome"
                  placeholder="nome a placeholder"
                  type="text"
                  value={props.editFormData.nome}
                  onChange={props.handleEditFormChange}
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Label for="descricao">Descrição</Label>
                <Input
                  id="descricao"
                  name="descricao"
                  value={props.editFormData.descricao}
                  placeholder="Descrição placeholder"
                  type="text"
                  onChange={props.handleEditFormChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={2}>
              <FormGroup>
                <Label for="preco">Preço</Label>
                <Input
                  id="preco"
                  name="preco"
                  type="number"
                  value={props.editFormData.preco}
                  onChange={props.handleEditFormChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={(e) => props.setProps(e, props.editFormData)}
          >
            OK
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
export default EditFormData;
