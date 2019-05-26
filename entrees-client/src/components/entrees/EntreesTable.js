import React, { Component } from "react";
import { Table, Button, Typography, Rate } from "antd";
import axios from "axios";
import { withRouter } from "react-router";
import { singleRestaurantGet } from "./../../utilities/Api";

const { Title, Text } = Typography;

const columns = [
  {
    title: "Entree",
    dataIndex: "name",
    width: "30%"
  },
  {
    title: "Overall Rating",
    dataIndex: "rating",
    sorter: true,
    render: rating => <Rate disabled value={rating} />,
    width: "70%"
  }
];

class EntreesTable extends Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
    restaurantName: "",
    restaurantDescription: ""
  };

  componentDidMount() {
    this.fetch();
    singleRestaurantGet(this.props.match.params.id).then(res =>
      this.setState({
        restaurantName: res.data.name,
        restaurantDescription: res.data.description
      })
    );
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
      .get(`/api/restaurants/${this.props.match.params.id}/entrees`, {
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
    const restaurantName = this.state.restaurantName;
    const restaurantDescription = this.state.restaurantDescription;
    return (
      <React.Fragment>
        <div style={{ overflow: "hidden" }}>
          <Title level={2}>{restaurantName}</Title>
          <span style={{ float: "left", paddingTop: "8px" }}>
            <Text>{restaurantDescription}</Text>
          </span>
          <span
            style={{
              float: "right",
              paddingBottom: "10px",
              paddingRight: "10px"
            }}
          >
            <Button onClick={() => this.props.history.push("/")} type="primary">
              Add Entree
            </Button>
          </span>
        </div>
        <Table
          className="entree-table"
          columns={columns}
          rowKey={record => record.id}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
          onRow={record => ({
            onClick: () => {
              this.props.history.push(`/entrees/${record.id}`);
            }
          })}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(EntreesTable);
