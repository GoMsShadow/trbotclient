import "./App.css";
import ParamsView from "./components/ParamsView";

import { ConfigProvider, theme, Layout, Row, Col, Grid } from "antd";
import PriceTracker from "./components/PriceTracker";
import OrderList from "./components/OrderList";
import { FC } from "react";

const { Content, Sider } = Layout;
const { useBreakpoint } = Grid;

const App: FC = () => {
  const screen = useBreakpoint();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        components: { Layout: { bodyBg: "#16171a" } },
      }}
    >
      <Layout className="root-container">
        <Row>
          <Col md={24} lg={16}>
            <Content>
              <ParamsView />
              <OrderList />
            </Content>
          </Col>
          {screen.lg && (
            <Col lg={8}>
              <Sider
                width={"100%"}
                style={{ background: "none", padding: "10px 0 0 20px" }}
              >
                <PriceTracker />
              </Sider>
            </Col>
          )}
        </Row>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
