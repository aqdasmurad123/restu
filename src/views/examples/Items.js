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

// reactstrap components
import {
  Card,
  CardHeader,
  Form,
  Input,
  CardFooter,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  Container,
  Row,
} from "reactstrap";
import Loader from "react-loader-spinner";
// core components
import Grid from "@material-ui/core/Grid";
import UserHeader from "components/Headers/UserHeader.js";
import { Button, Col, Label } from "reactstrap";
import { connect } from "react-redux";
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
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requested: false,
      modal: false,
      editModal: false,
      delmodal: false,
      itemName: "",
      itemDescription: "",
      itemFile: "",
      category: "",
      image_name: "",
      id: "",
      // Price:"",
      // Size:"",

      itemsPrices: [
        {
          price: "",
          size: "",
          item: "",
        },
      ],
      inputList: [
        {
          itemsPrice: "",
        },
      ],
    };
  }
  handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...this.state.itemsPrices];
    list[index][name] = value;
    this.setState({
      list,
    });
  };
  handleAdditems = () => {
    this.setState({
      itemsPrices: [...this.state.itemsPrices, { items: "" }],
    });
  };
  handleAddInput = () => {
    this.setState({
      itemsPrices: [...this.state.itemsPrices, { items: "" }],
    });
  };
  componentDidMount = () => {
    this.props.fetchItems();
    this.props.fetchCategories();
    this.props.fetchOrders();
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  editToggle = () => {
    this.setState({
      editModal: !this.state.editModal,
    });
  };
  deleteToggle = () => {
    this.setState({
      delmodal: !this.state.delmodal,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    // console.log(e.target.name);
  };
  handleFile = (e) => {
    this.setState({
      [e.target.name]: e.target.files[0],
    });
  };

  handleRemoveClick = (e, index) => {
    console.log(index);
    var list = [...this.state.itemsPrices];
    console.log(list);
    list.splice(index, 1);
    console.log(list);
    this.setState({
      itemsPrices: list,
    });
  };

  handleNewitem = async (e) => {
    e.preventDefault();
    var obj = {
      name: this.state.itemName,
      // price: this.state.itemPrice,
      itemFile: this.state.itemFile,
      // itemsPrices: this.state.itemsPrices,
      description: this.state.itemDescription,
      category: this.state.category,
    };
    this.setState({
      requested: true,
    });
    await this.props.addNewItem(obj);

    this.setState((prevState) => ({
      requested: false,
      itemName: "",

      itemDescription: "",
      itemsPrices: [...prevState.itemsPrices, { price: "", size: "" }],
      itemFile: "",
      category: "",

      image_name: "",
      id: "",
    }));
    this.toggle();
  };

  handleUpdateitem = async (e) => {
    e.preventDefault();
    var item = {
      name: this.state.itemName,
      // price: parseInt(this.state.itemPrice),
      item_file: this.state.itemFile,
      description: this.state.itemDescription,
      category: this.state.category,
      image_name: this.state.image_name != null ? this.state.image_name : "",
      id: this.state.id,
    };
    this.setState({
      requested: true,
    });
    console.log("obj", item);
    await this.props.updateItems(item);

    this.setState({
      requested: false,
      itemName: "",
      // itemPrice: "",
      itemDescription: "",
      itemFile: "",
      category: "",
      image_name: "",
      id: "",
    });
    this.editToggle();
  };

  disableChecker(id) {
    console.log("id", id);
    let flag = false;
    for (let index = 0; index < this.props.orders.length; index++) {
      let arr = this.props.orders[index].order_items.filter(
        (filterItems) => filterItems.item_id === id
      );
      if (arr.length != 0) {
        flag = true;
      }
    }

    return flag;
  }

  render() {
    console.log("items", this.props.items);

    console.log("orders", this.props.orders);
    // console.log("state id",this.state.id)
    return (
      <>
        <UserHeader />
        {/* <Header /> */}
        {/* edit modal start */}
        <Modal isOpen={this.state.editModal} toggle={this.editToggle}>
          <ModalHeader toggle={this.editToggle}>
            <span className="text-warning">Update Item</span>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleUpdateitem}>
              <Input
                className="mt-3"
                type="text"
                placeholder="Item Name"
                name="itemName"
                value={this.state.itemName}
                onChange={this.handleChange}
                required
              />
              {/* <Input
								className="mt-3"
								type="text"
								placeholder="Item Price"
								name="itemPrice"
								value={this.state.itemPrice}
								onChange={this.handleChange}
								required
							/> */}
              <Input
                className="mt-3"
                type="select"
                name="category"
                value={this.state.category}
                onChange={this.handleChange}
                // required
              >
                <option value="" disabled selected>
                  Select Category
                </option>
                {this.props.categories.map((items, index) => {
                  return (
                    <option key={index} value={items.id}>
                      {items.name}
                    </option>
                  );
                })}
              </Input>
              <Input
                className="mt-3"
                type="textarea"
                placeholder="Description"
                name="itemDescription"
                value={this.state.itemDescription}
                onChange={this.handleChange}
                required
              />
              <input
                className="mt-2"
                type="file"
                onChange={this.handleFile}
                id="myFile"
                name="itemFile"
              />

              <ModalFooter>
                <Button color="secondary" onClick={this.editToggle}>
                  cancel
                </Button>{" "}
                <Button
                  color="primary"

                  // disabled={this.state.filesUrl.length<5}
                >
                  {this.state.requested ? (
                    <Loader
                      type="TailSpin"
                      color="#fff"
                      height={20}
                      width={30}
                    />
                  ) : (
                    "save"
                  )}
                </Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>

        {/* edit modal end */}
        {/* del modal */}
        <Modal isOpen={this.state.delmodal} toggle={this.deleteToggle}>
          <ModalHeader toggle={this.toggle}>
            <span className="text-warning">
              Are You Sure You Want To Delete This Item!
            </span>
          </ModalHeader>
          <ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.deleteToggle}>
                cancel
              </Button>{" "}
              <Button
                color="primary"
                onClick={async () => {
                  this.setState({
                    requested: true,
                  });
                  await this.props.deleteItems(
                    this.state.id,
                    this.state.image_name
                  );
                  this.setState({
                    requested: false,
                  });
                  this.deleteToggle();
                }}

                // disabled={this.state.filesUrl.length<5}
              >
                {this.state.requested ? (
                  <Loader type="TailSpin" color="#fff" height={20} width={30} />
                ) : (
                  "Delete"
                )}
              </Button>
            </ModalFooter>
          </ModalBody>
        </Modal>

        {/* del modal end */}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <span className="text-warning">Add New Item</span>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleNewitem}>
              <Input
                className="mt-3"
                type="text"
                placeholder="Item Name"
                name="itemName"
                value={this.state.itemName}
                onChange={this.handleChange}
                required
              />
              {/* <Input
								className="mt-3"
								type="text"
								placeholder="Item Price"
								name="itemPrice"
								value={this.state.itemPrice}
								onChange={this.handleChange}
								required
							/> */}
              <Input
                className="mt-3"
                type="select"
                name="category"
                value={this.state.category}
                onChange={this.handleChange}
                required
              >
                <option value="" disabled selected>
                  Select Category
                </option>
                {this.props.categories.map((items, index) => {
                  return (
                    <option key={index} value={items.id}>
                      {items.name}
                    </option>
                  );
                })}
              </Input>
              <Input
                className="mt-3"
                type="textarea"
                placeholder="Description"
                name="itemDescription"
                value={this.state.itemDescriptio}
                onChange={this.handleChange}
                required
              />
              <input
                className="mt-2"
                type="file"
                onChange={this.handleFile}
                id="myFile"
                name="itemFile"
                required
              />
              <br />
              <Grid item>
                <Row>
                  {this.state.itemsPrices.map((item, index) => {
                    return (
                      <>
                        <Col lg="5">
                          <Input
                            className="mt-3"
                            type="text"
                            placeholder="Price"
                            name="itemPrice"
                            onChange={this.handleChange}
                            value={this.state.itemsPrices[index].price}
                             
                              onChange={(e)=>this.handleInputChange(e, index)}

                          />
                        </Col>
                        <Col lg="5">
                          <Input
                            className="mt-3"
                            type="text"
                            placeholder="size"
                           
                            value={this.state.itemsPrices[index].size}
                            onChange={this.handleChange}
                            required
                             
                              onChange={(e)=>this.handleInputChange(e, index)}
                            type="text"
                            name="itemSize"
                            required
                          />
                        </Col>
                      </>
                    );
                  })}

                  <Col lg="1">
                
                    {this.state.itemsPrices.map((x, i) => {
                      return (
                        <>
                          <Button
                            onClick={this.handleRemoveClick}
                            className=" mb-2  sm-text-right"
                            size="mt-4"
                            color="success"
                          >
                            <i className="fas fa-trash  " />
                          </Button>
                        </>
                      )  
                  })}
                     
                  </Col>
                  <Col lg="12" className="text-right">
                    <Button onClick={this.handleAddInput} color="primary">
                      <i className="fas fa-plus" />
                    </Button>
                  </Col>
                </Row>
              </Grid>
            
              <ModalFooter>
                <Button color="secondary" onClick={this.toggle}>
                  cancel
                </Button>{" "}
                <Button
                  color="primary"

                  // disabled={this.state.filesUrl.length<5}
                >
                  {this.state.requested ? (
                    <Loader
                      type="TailSpin"
                      color="#fff"
                      height={20}
                      width={30}
                    />
                  ) : (
                    "save"
                  )}
                </Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Items</h3>
                  <Button
                    onClick={this.toggle}
                    color="danger"
                    className="float-right"
                  >
                    Add Item
                  </Button>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Item Name</th>
                      <th scope="col">Item Price</th>
                      <th scope="col">Item Size</th>
                      <th scope="col">Description</th>
                      <th scope="col">Category</th>
                      <th scope="col">Image</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.items &&
                      this.props.items.map((items, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{items.name}</th>

                            <td>{items.itemsPrices[0].price}</td>
                            <td>{items.itemsPrices[0].size}</td>
                            <td>{items.description}</td>
                            <td>
                              {this.props.categories &&
                              this.props.categories.filter(
                                (item) => item.id == items.category
                              ).length != 0
                                ? this.props.categories.find(
                                    (item) => item.id == items.category
                                  ).name
                                : "N/A"}
                            </td>
                            <td>
                              <img
                                src={items.image_url}
                                height="70px"
                                width="70px"
                              />
                            </td>
                            <td>
                              <Button
                                onClick={() => {
                                  this.setState({
                                    itemName: items.name,
                                    itemPrice: items.price,
                                    itemDescription: items.description,
                                    category: items.category,
                                    image_name: items.image_name,
                                    id: items.id,
                                  });
                                  console.log("img name", items.image_name);

                                  this.editToggle();
                                }}
                                className=""
                              >
                                <i class="fas fa-edit"></i>
                              </Button>
                              <Button
                                disabled={this.disableChecker(items.id)}
                                onClick={() => {
                                  this.setState({
                                    id: items.id,
                                    image_name: items.image_name,
                                  });
                                  console.log(
                                    "image name item",
                                    items.image_name
                                  );
                                  console.log("id item", items.id);

                                  this.deleteToggle();
                                }}
                              >
                                <i class="fas fa-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
                <CardFooter className="py-4"></CardFooter>
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
  addNewItem,
  deleteItems,
  fetchOrders,
  fetchItems,
  updateItems,
  fetchCategories,
})(Tables);
