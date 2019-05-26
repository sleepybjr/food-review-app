import React, { Component } from "react";
import { Typography, Table, Rate } from "antd";
import axios from "axios";
import dateFormat from "dateformat";

const { Title, Text } = Typography;

const columns = [
  {
    title: "Review",
    dataIndex: "text",
    width: "65%"
  },
  {
    title: "Overall Rating",
    dataIndex: "rating",
    width: "15%",
    render: rating => <Rate disabled value={rating} />
  },
  {
    title: "Created By",
    dataIndex: "createdBy.username",
    width: "10%"
  },
  {
    title: "Written On",
    dataIndex: "creationDateTime",
    width: "10%",
    render: date => dateFormat(date, "mmm dS, yyyy")
  }
];

class ReviewsTable extends Component {
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
      .get(`/api/entrees/${this.props.match.params.id}`, {
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
          data: res.data,
          pagination
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <Title level={2}>{this.state.data.name}</Title>
        <Text>{this.state.data.description}</Text>
        <Table
          columns={columns}
          rowKey={record => record.id}
          dataSource={this.state.data.reviews}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </React.Fragment>
    );
  }
}

export default ReviewsTable;
