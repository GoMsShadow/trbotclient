import { Input, Select, Table, Tabs } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiGetSearches } from "../api";
import { DebounceSelect } from "../utils/custom";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";

const API_URL = "https://api.binance.com/api/v3/ticker/24hr";

const symbols = ["USDT", "USDC", "ETH", "BTC", "TUSD", "EUR"];

const PriceTracker = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(symbols[0]);
  const [dataSource, setDataSource] = useState([]);
  const [allPrices, setAllPrices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [hotSearches, setHotSearches] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);

  useEffect(() => {
    fetchData();
    // const interval = setInterval(fetchData, 2000);
    // return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!searchTerm || !searchTerm.length) {
      setDataSource(
        allPrices.filter(
          ({ symbol }) =>
            symbol.slice(-selectedSymbol.length) === selectedSymbol
        )
      );
    } else {
      debouncedSearch(searchTerm);
      return () => {
        debouncedSearch.cancel();
      };
    }
  }, [selectedSymbol, allPrices, searchTerm]);

  useEffect(() => {
    setSearchTerm("");
  }, [selectedSymbol]);

  const fetchHotSearches = async () => {
    try {
      const {
        data: { searches },
      } = await apiGetSearches();
      setSearchOptions(
        searches.map(({ id, symbol }) => ({ value: id, label: symbol }))
      );
    } catch (error) {}
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setAllPrices(
        data
          .filter(({ lastPrice }) => +lastPrice)
          .map((item) => ({
            symbol: item.symbol,
            price: +item.lastPrice,
            change: +item.priceChangePercent,
          }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedSearch = debounce((term) => {
    setDataSource(
      allPrices.filter(({ symbol }) =>
        symbol.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, 300);

  const columns = [
    {
      key: "pair",
      dataIndex: "symbol",
      title: "Pair",
      render: (_, item) => (
        <div>
          <span style={{ color: "white" }}>
            {item.symbol.slice(0, -selectedSymbol.length)}
          </span>
          <span>/{item.symbol.slice(-selectedSymbol.length)}</span>
        </div>
      ),
    },
    {
      key: "price",
      dataIndex: "price",
      title: "Price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      key: "change",
      dataIndex: "change",
      title: "Change",
      render: (_, item) => (
        <span style={{ color: item.change >= 0 ? "#0ECB81" : "#F6465D" }}>
          {item.change}%
        </span>
      ),
      sorter: (a, b) => a.change - b.change,
    },
  ];

  return (
    <div>
      {/* <DebounceSelect
        placeholder="Search symbol"
        fetchOptions={fetchUserList}
        onChange={(value) => {
          setValue(newValue);
        }}
        style={{
          width: "100%",
        }}
      /> */}
      <Input
        placeholder="Search"
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Tabs
        defaultActiveKey="tether"
        items={symbols.map((symbol) => ({ key: symbol, label: symbol }))}
        onChange={(value) => {
          setSelectedSymbol(value);
        }}
      ></Tabs>
      <div style={{ maxHeight: "calc(100vh - 164px)", overflowY: "auto" }}>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          className="price-table"
          scroll={{ y: "calc(100vh - 196px)" }}
        />
      </div>
    </div>
  );
};

export default PriceTracker;
