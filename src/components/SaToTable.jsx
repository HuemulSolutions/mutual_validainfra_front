import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { EstadoTabla } from "../definicionesGlobales";

export default function SaToTable({
  loading,
  incomeData,
  modoVisualizacion,
  handleSetSelectedRow,
  columns,
} = props) {
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys, selectedRows) => {
      setSelectedRowKeys(selectedKeys);
      handleSetSelectedRow(selectedRows[0]);
    },
    type: "radio",
  };

  const onRow = (record) => {
    return {
      onClick: () => {
        setSelectedRowKeys([record.key]);
        handleSetSelectedRow(record);
      },
    };
  };

  useEffect(() => {
    setData(incomeData);
  }, [incomeData]);

  return (
    <div className="satotable">
      <Table
        // bordered={true}
        className="table"
        columns={columns}
        {...(modoVisualizacion === EstadoTabla.seleccion && {
          rowSelection: rowSelection,
          onRow: onRow,
        })}
        dataSource={data.map((item, index) => ({
          key: index,
          ...item,
        }))}
        loading={loading}
        onChange={() => console.log("OnChange de la tabla")}
        pagination={false}
        scroll={{ y: 400 }}
      />
    </div>
  );
}
