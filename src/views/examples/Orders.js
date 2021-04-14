/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import {
  fetchOrders,
  updateOrderStatus,
} from "../../store/actions/ordersAction";
import {
  addNewItem,
  fetchItems,
  fetchCategories,
  deleteItems,
  updateItems,
} from "../../store/actions/itemsActions";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { connect } from "react-redux";

class Orders extends Component {
   constructor(props){
     super(props)
     this.state={
       pick:"",
     }
   }

  componentDidMount = () => {
    this.props.fetchOrders();
    this.props.fetchItems();
  };


 

  render() {
    console.log("orders", this.props.orders);
    console.log("items", this.props.items);
    return (
      <>
        <UserHeader />
        {/* <Header /> */}
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Orders</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr className="text-center">
                      <th scope="col">Order By</th>

                      <th scope="col">Contact</th>
                      <th scope="col">Address</th>
                      <th scope="col">Order</th>
                      <th scope="col">Order Items</th>
                      <th scope="col"> Order Status</th>
                      <th scope="col">Order Total</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.orders.map((items, index) => {
                      var badgeColor;
                      var button;
                      if (items.status === "archived") {
                        badgeColor = "secondary";
                        button = (
                          <>
                            <Button
                              disabled={items.status === "archived"}
                              color="secondary"
                            >
                              Archive Order
                            </Button>
                          </>
                        );
                      } else if (items.status === "order placed") {
                        badgeColor = "primary";
                        button = (
                          <>
                            <Button
                              onClick={() => {
                                var status = "cooking";
                                this.props.updateOrderStatus(items.id, {
                                  status: status,
                                });
                              }}  
                              color="danger"
                            >
                              Start Cooking
                            </Button>
                          </>
                        );
                      } else if (items.status === "paid") {
                        badgeColor = "success";
                        button = (
                          <>
                            <Button
                              onClick={() => {
                                var status = "archived";

                                this.props.updateOrderStatus(items.id, {
                                  status: status,
                                });
                              }}
                              color="secondary"
                            >
                              Archive Order
                            </Button>
                          </>
                        );
                      } else if (items.status === "cooking") {
                        badgeColor = "danger";
                        button = (
                          <>
                            <Button
                              onClick={() => {
                                var status = "ready";
                                this.props.updateOrderStatus(items.id, {
                                  status: status,
                                });
                              }}
                              color="info"
                            >
                              Order Ready
                            </Button>
                          </>
                        );
                      } else if (items.status === "ready") {
                        badgeColor = "info";
                        button = (
                          <>
                            <Button
                              onClick={() => {
                                var status = "paid";
                                this.props.updateOrderStatus(items.id, {
                                  status: status,
                                });
                              }}
                              color="success"
                            >
                              Order Paid
                            </Button>
                          </>
                        );
                      }
                      return (
                        <tr className="text-center" key={index}>
                          <th scope="row">{items.order_by}</th>
                          <td>{items.contact_no}</td>
                          <td>{items.Address}</td>
                          <td>{items.table_no}</td>
                          <td>
                            {items.order_items.map((item, index) => {
                              return (
                                <li style={{ listStyleType: "none" }}>
                                  {" "}
                                  {this.props.items.length != 0
                                    ? this.props.items.find(
                                        (value) => value.id == item.item_id
                                      ).name
                                    : "loading"}
                                </li>
                              );
                            })}
                          </td>

                          <td>
                            <Badge color={badgeColor}> {items.status}</Badge>
                          </td>
                          <td>{items.total}</td>
                          <td className="text-right">{button}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
          {/* Dark table */}
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,

  items: state.item.items,
  orders: state.order.orders,
  categories: state.item.categories,
});

export default connect(mapStateToProps, {
  fetchOrders,
  updateOrderStatus,
  fetchItems,
})(Orders);
