// Install dependencies: npm install react-router-dom recharts tailwindcss

import Panel from "./components/Panel";
import Header from "./components/Header";
import Table from "./components/Table";
import DateTime from "./components/DateTime";
import MerchPieChart from "./components/MerchPieChart";
import MerchBarChart from "./components/MerchBarChart";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./index.css";

const mockStockData = [
    { date: "2024-02-10", price: 20 },
    { date: "2024-02-11", price: 50 },
    { date: "2024-02-12", price: 121 },
    { date: "2024-02-13", price: 110 },
    { date: "2024-02-14", price: 128 },
    { date: "2024-02-15", price: 20 },
    { date: "2024-02-16", price: 50 },
    { date: "2024-02-17", price: 121 },
    { date: "2024-02-18", price: 110 },
    { date: "2024-02-19", price: 128 }
];

const sampleData = [
  { product:"White T", sku:"T1_WHITE", sales:31, stock_qty:43, gross:"$100.40", net:"$50.00", trend:"up"},
  { product:"Red Hoodie", sku:"H1_RED", sales:2, stock_qty:38, gross:"$432.99", net:"$234.21", trend:"up"},
  { product:"Cap", sku:"CAP123", sales:33, stock_qty:32, gross:"$92.23", net:"$40.23", trend:"down"},
  { product:"Mug", sku:"CMUG234", sales:8, stock_qty:36, gross:"$88.20", net:"$44.99", trend:"up"},
  { product:"Purse", sku:"PUR33", sales:50, stock_qty:63, gross:"$902.99", net:"$523.32", trend:"down"},
  { product:"Braclette", sku:"B987", sales:102, stock_qty:56, gross:"$11.54", net:"$5.03", trend:"down"},
];

const ProductTicker = () => {
  const [price, setPrice] = useState(mockStockData[mockStockData.length - 1].price);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((prev) => prev + (Math.random() * 4 - 2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-gray-800 text-white text-center">
      <h2 className="text-xl font-bold">White T: T1_WHITE</h2>
      <p className="text-2xl">${price.toFixed(2)}</p>
    </div>
  );
};

const StockChart = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Product Price Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mockStockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="linear" dataKey="price" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const App = () => {
  return (
    <Router>
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-6">
        <Header />

        {/* Row 1: Two Info Panels */}
        <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex-1">
                <Panel title="Merch Sales Summary">
                <Table data={sampleData} />
                </Panel>
            </div>

            <div className="flex-1">
                <Panel title="Item Sales History">
                <ProductTicker />
                <StockChart />
                </Panel>
            </div>
        </div>

        {/* Row 2: Full-width Table */}
        <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex-1">
                <Panel title="Sales Volume">
                <MerchPieChart />
                </Panel>
            </div>
            <div className="flex-1">
                <Panel title="Sales Revenue">
                <MerchBarChart />
                </Panel>
            </div>
        </div>

    </div>
    </Router>
  );
};

export default App;

