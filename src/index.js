import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Table } from "antd";
import { Resizable } from "react-resizable";
import "./styles.css";

const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
    >
      <th {...restProps} />
    </Resizable>
  );
};

export default class Demo extends React.Component {
  state = {
    columns: [
      {
        title: "Date",
        dataIndex: "date",
        width: 200,
        tags: ['nice', 'developer'],
      },
      {
        title: "Amount",
        dataIndex: "amount",
        width: 100
      },
      {
        title: "Type",
        dataIndex: "type",
        width: 100
      },
      {
        title: "Note",
        dataIndex: "note",
        width: 100
      }
    ]
  };

  components = {
    header: {
      cell: ResizeableTitle
    }
  };

  data = [
    {
      key: 0,
      date: "2018-02-11",
      amount: 120,
      type: "income",
      note: "transfer"
    },
    {
      key: 1,
      date: "2018-03-11",
      amount: 243,
      type: "income",
      note: "transfer"
    },
    {
      key: 2,
      date: "2018-04-11",
      amount: 98,
      type: "income",
      note: "transfer"
    }
  ];

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
      };
      return { columns: nextColumns };
    });
  };

  render() {
    const { columns, loading } = this.state;
    let ncols = columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
        style: { cursor: "move" },
      })
    }));

    return (
      <div style={{width: 500}}>
        <Table
          bordered
          scroll={{ x: 500, y: 100 }}
          loading={loading}
          components={this.components}
          columns={ncols}
          dataSource={this.data}
        />
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById("root"));
