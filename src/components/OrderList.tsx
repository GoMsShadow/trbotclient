import {
  Button,
  Row,
  Select,
  Space,
  Table,
  DatePicker,
  Spin,
  Grid,
} from "antd";
import { useEffect, useState } from "react";
import { UndoOutlined } from "@ant-design/icons";
import { dummyData } from "../utils/constants";
import { apiCancelAllOpenOrders, apiCancelOrder } from "../api";
import { ColumnsType } from "antd/es/table";
const { RangePicker } = DatePicker;
const { useBreakpoint } = Grid;

const SIDES = [
  { value: "all", label: "All" },
  { value: "BUY", label: "BUY" },
  { value: "SELL", label: "SELL" },
];

const TYPES = [
  { value: "all", label: "All" },
  { value: "LIMIT", label: "Limit" },
  { value: "MARKET", label: "Market" },
];

const ALL_ORDERS = 0;
const OPEN_ORDERS = 1;

const OrderList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [historyType, setHistoryType] = useState(ALL_ORDERS);

  const [orders, setOrders] = useState<any[]>([]);

  const [selectedSide, setSelectedSide] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [ordersShown, setOrdersShown] = useState(orders);

  const screen = useBreakpoint();

  useEffect(() => {
    loadAllOrders();
  }, []);

  useEffect(() => {
    setOrdersShown(orders);
  }, [orders]);

  useEffect(() => {
    setOrdersShown(
      orders.filter(
        ({ side, type }) =>
          (selectedSide === "all" || selectedSide === side) &&
          (selectedType === "all" || selectedType === type)
      )
    );
  }, [selectedSide, selectedType]);

  const loadAllOrders = async () => {
    setOrders([
      ...dummyData,
      ...dummyData,
      ...dummyData,
      ...dummyData,
      ...dummyData,
    ]);
    // setIsLoading(true);
    // try {
    //   const {
    //     data: { data },
    //   } = await apiLoadAllOrders();
    //   setIsLoading(false);
    //   setOrders(data);
    // } catch (error) {
    //   console.error(error);
    //   setIsLoading(false);
    // }
  };

  const onCancelOrder = async (params: {
    symbol: string;
    orderId?: string;
    origClientOrderId?: string;
  }) => {
    try {
      const { data } = await apiCancelOrder(params);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onCancelAllOrders = async () => {
    try {
      const { data } = await apiCancelAllOpenOrders();
      console.log(data);
      await loadAllOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const columns: ColumnsType = [
    {
      key: "side",
      dataIndex: "side",
      title: "Side",
      width: 70,
      ...(!screen.md && { fixed: "left" }),
    },
    {
      key: "quantity",
      dataIndex: "quantity",
      title: "Quantity",
      width: 80,
    },
    { key: "type", dataIndex: "type", title: "Type", width: 90 },
    { key: "orderId", dataIndex: "orderId", title: "Order Id" },
    { key: "status", dataIndex: "status", title: "Status", width: 90 },
    {
      key: "action",
      dataIndex: "action",
      title: "Action",
      render: (_: any, { symbol, orderId, origClientOrderId, type }: any) =>
        type === "LIMIT" && (
          <Button
            onClick={() =>
              onCancelOrder({ symbol, orderId, origClientOrderId })
            }
          >
            Cancel
          </Button>
        ),
      width: 100,
      align: "center",
      ...(!screen.md && { fixed: "right" }),
    },
  ];

  const dataSource = ordersShown.map((order, index) => {
    const { cummulativeQuoteQty, executedQty, ...rest } = order;

    return {
      ...rest,
      index,
      quantity: +executedQty
        ? (+cummulativeQuoteQty / +executedQty).toFixed(2)
        : 0,
    };
  });

  return (
    <>
      <Row
        justify={"space-between"}
        align={"middle"}
        style={{ marginBottom: 24, marginTop: 24 }}
      >
        <Space>
          <Button
            color="default"
            variant={historyType === ALL_ORDERS ? "filled" : "text"}
            onClick={() => setHistoryType(ALL_ORDERS)}
            style={{ height: 40 }}
          >
            Orders History
          </Button>
          <Button
            color="default"
            variant={historyType === OPEN_ORDERS ? "filled" : "text"}
            onClick={() => setHistoryType(OPEN_ORDERS)}
            style={{ height: 40 }}
          >
            Open Orders
          </Button>
        </Space>
        <Button type="link" onClick={() => loadAllOrders()}>
          <UndoOutlined /> Refresh
        </Button>
      </Row>
      <Row justify={"space-between"}>
        {historyType === ALL_ORDERS && (
          <Space style={{ marginRight: 12, marginBottom: 16 }}>
            <span style={{ color: "white" }}>Time</span>
            <RangePicker />
          </Space>
        )}
        <Space style={{ marginBottom: 16 }}>
          <Space style={{ marginRight: 12 }}>
            <span style={{ color: "white" }}>Side</span>
            <Select
              defaultValue={"all"}
              options={SIDES}
              style={{ width: 100 }}
              onChange={(value) => setSelectedSide(value)}
            />
          </Space>
          <Space>
            <span style={{ color: "white" }}>Type</span>
            <Select
              defaultValue={"all"}
              options={TYPES}
              style={{ width: 100 }}
              onChange={(value) => setSelectedType(value)}
            />
          </Space>
        </Space>
        {historyType === OPEN_ORDERS && (
          <Button
            color="default"
            variant="filled"
            onClick={() => onCancelAllOrders()}
          >
            Cancel All
          </Button>
        )}
      </Row>
      {isLoading ? (
        <Row justify={"center"}>
          <Spin />
        </Row>
      ) : (
        <div
          {...(screen.lg && {
            style: { maxHeight: "calc(100vh - 302px)", overflowY: "auto" },
          })}
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey={"index"}
            className="orders-table"
            pagination={false}
            {...(screen.lg && {
              scroll: { y: "calc(100vh - 406px)" },
            })}
            {...(!screen.md && { scroll: { x: "max-content" } })}
          />
        </div>
      )}
    </>
  );
};

export default OrderList;
