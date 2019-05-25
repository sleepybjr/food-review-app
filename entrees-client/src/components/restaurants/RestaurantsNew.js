import React, { Component } from "react";
import { Table } from "antd";
import axios from "axios";
import { withRouter } from 'react-router';

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: "20%"
  },
  {
    title: "Overall Rating",
    dataIndex: "rating",
    width: "20%"
  }
];

class Restaurants extends Component {
  state = {
    data: [],
    pagination: {},
    loading: false
  };

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  };

  fetch = (params = {}) => {
    // console.log("params:", params);
    this.setState({ loading: true });
    axios
      .get("/api/restaurants", {
        params: {
          results: 10,
          ...params
        }
        // headers: {
        //   'Content-Type': "application/json"
        // }
      })
      .then(res => {
        console.log(res);
        const pagination = { ...this.state.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = res.data.totalElements;
        this.setState({
          loading: false,
          data: res.data.content,
          pagination
        });
      });
  };

  render() {
    return (
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        onRow={record => ({
          onClick: () => {
            this.props.history.push(`/restaurants/${record.id}`);
          }
        })}
      />
    );
  }
}

export default withRouter(Restaurants);
