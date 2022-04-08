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
            <Col md={3}>
              <FormGroup>
                <Label for="nome">total</Label>
                <Input
                  id="nome"
                  name="total"
                  placeholder="total a placeholder"
                  type="text"
                  value={props.editFormData.total}
                  onChange={props.handleEditFormChange}
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Label for="descricao">tipo pagamento</Label>
                <Input
                  id="descricao"
                  name="tipo_pagamento"
                  value={props.editFormData.tipo_pagamento}
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
                <Label for="preco">status</Label>
                <Input
                  id="preco"
                  name="status"
                  type="text"
                  value={props.editFormData.status}
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
