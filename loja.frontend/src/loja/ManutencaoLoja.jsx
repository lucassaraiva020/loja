/* eslint-disable no-template-curly-in-string */
import React, { useEffect } from "react";
import "../App.less";
import { Form, Input, Button, Breadcrumb, Tabs, Collapse } from "antd";
import { lojaController } from "../controllers/LojaController";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LojaProduto from "./LojaProduto";
import ButtonGroup from "antd/lib/button/button-group";

const { TabPane } = Tabs;
const { Panel } = Collapse;

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 10,
  },
};
const validateMessages = {
  required: "${label} é Obrigatório!",
  types: {
    number: "${label} Não é um numero válido!",
  },
};
export default function ManutencaoLoja() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    dispatch(lojaController.salvarLoja(values));
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const params = useParams();
  //will mount
  useEffect(() => {
    const id = Number(params.id && params.id > 0 ? params.id : 0);

    dispatch(lojaController.carregarManutencao(id));
  }, [dispatch, params]);

  //Will update
  const lojaR = useSelector((state) => state.loja.entidade);
  useEffect(() => {
    form.setFieldsValue(lojaR);
  }, [form, lojaR]); // Apenas re-execute o efeito quando o lojaR mudar

  return (
    <div>
      <Breadcrumb style={{ margin: "0 0 30px" }} className="breabcrumb">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/loja">Portfólios</Breadcrumb.Item>
        <Breadcrumb.Item>Manutenção Portfólios</Breadcrumb.Item>
      </Breadcrumb>
      <Form
        form={form}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
      >
        <Tabs className="tabs" defaultActiveKey="Manutencao" style={{ margin: 30 }} size="large" >
          <TabPane tab="Manutencao" key="manutencao" style={{ marginTop: 15 }}>

            <div>
              <Form.Item name="id" label="Id" style={{ display: 'none' }}>
                <Input readOnly={true} />
              </Form.Item>
              <Form.Item
                name="nome"
                label="Nome"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

            </div>
            <div>
              <Collapse bordered={false}>
                <Panel header="Opcional">
                  <Form.Item
                    name="cnpj"
                    label="CNPJ">
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="telefone"
                    label="Telefone">
                    <Input />
                  </Form.Item>
                </Panel>
                <Panel header="Endereço">
                    <Form.Item
                      name="bairro"
                      label="Bairro">
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="cep"
                      label="CEP">
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="numero"
                      label="Numero">
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="rua"
                      label="Rua">
                      <Input />
                    </Form.Item>

                  </Panel>
              </Collapse>
            </div>
          </TabPane>
          <TabPane tab="Produto" key="produto" style={{ marginTop: 15 }}>
            <LojaProduto />
          </TabPane>

        </Tabs>


        <ButtonGroup>
          <Button className="botao" shape="round" htmlType="submit" type="submit">
            Salvar
      </Button>
          <Button className="botao" shape="round" href="/loja">
            Retornar
      </Button></ButtonGroup>
      </Form>
    </div>
  );
}
