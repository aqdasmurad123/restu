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
import { connect } from "react-redux";
import "./header.css";
import moment from "moment";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

import {
	fetchOrders,
	updateOrderStatus,
} from "../../store/actions/ordersAction";

class Header extends Component {
	componentDidMount = () => {
		this.props.fetchOrders();
	};
	render() {
		console.log("header", this.props.orders);
		let dailySale = 0;
		let weeklySale = 0;
		this.props.orders
			.filter(item => {
				let d = item.order_datetime.split(" ")[0].split("-");
				let newDate = d[1] + "-" + d[0] + "-" + d[2];

				return (
					moment(new Date(newDate)).format("DD-MM-YYYY") ==
					moment(new Date()).format("DD-MM-YYYY")
				);
			})
			.map(item => (dailySale += item.total));
		this.props.orders
			.filter(item => {
				let d = item.order_datetime.split(" ")[0].split("-");
				let dbDate = d[1] + "-" + d[0] + "-" + d[2];
				// let dbDate = moment(new Date(newDate)).format("DD-MM-YYYY");
				let today = new Date();
				let d1 = new Date(dbDate);
				let d2 = new Date();
				d2.setDate(d2.getDate() - 2);
				return d1.getDate() >= d2.getDate() && d1.getDate() <= today.getDate();
			})
			.map(item => (weeklySale += item.total));
		return (
			<>
				<div className="header header-bg pb-8 pt-5 pt-md-8">
					<Container fluid>
						<div className="header-body">
							{/* Card stats */}
							<Row>
								<Col lg="6" xl="3">
									<Card className="card-stats mb-4 mb-xl-0">
										<CardBody>
											<Row>
												<div className="col">
													<CardTitle
														tag="h5"
														className="text-uppercase text-muted mb-0"
													>
														Order Placed
													</CardTitle>
													<span className="h2 font-weight-bold mb-0">
														{
															this.props.orders.filter(
																item => item.status === "order placed"
															).length
														}
													</span>
												</div>
												<Col className="col-auto">
													<div className="icon icon-shape bg-info text-white rounded-circle shadow">
														<i className="fa fa-thumbtack" />
													</div>
												</Col>
											</Row>
										</CardBody>
									</Card>
								</Col>

								<Col lg="6" xl="3">
									<Card className="card-stats mb-4 mb-xl-0">
										<CardBody>
											<Row>
												<div className="col">
													<CardTitle
														tag="h5"
														className="text-uppercase text-muted mb-0"
													>
														cooking
													</CardTitle>
													<span className="h2 font-weight-bold mb-0">
														{
															this.props.orders.filter(
																item => item.status === "cooking"
															).length
														}
													</span>
												</div>
												<Col className="col-auto">
													<div className="icon icon-shape bg-warning text-white rounded-circle shadow">
														<i className="fa fa-fire" />
													</div>
												</Col>
											</Row>
										</CardBody>
									</Card>
								</Col>
								<Col lg="6" xl="3">
									<Card className="card-stats mb-4 mb-xl-0">
										<CardBody>
											<Row>
												<div className="col">
													<CardTitle
														tag="h5"
														className="text-uppercase text-muted mb-0"
													>
														Ready
													</CardTitle>
													<span className="h2 font-weight-bold mb-0">
														{
															this.props.orders.filter(
																item => item.status === "ready"
															).length
														}
													</span>
												</div>
												<Col className="col-auto">
													<div className="icon icon-shape bg-success text-white rounded-circle shadow">
														<i className="fa fa-check" />
													</div>
												</Col>
											</Row>
										</CardBody>
									</Card>
								</Col>

								<Col lg="6" xl="3">
									<Card className="card-stats mb-4 mb-xl-0">
										<CardBody>
											<Row>
												<div className="col">
													<CardTitle
														tag="h5"
														className="text-uppercase text-muted mb-0"
													>
														Paid
													</CardTitle>
													<span className="h2 font-weight-bold mb-0">
														{
															this.props.orders.filter(
																item => item.status === "paid"
															).length
														}
													</span>
												</div>
												<Col className="col-auto">
													<div className="icon icon-shape bg-dark text-white rounded-circle shadow">
														<i className="fa fa-money-bill-wave" />
													</div>
												</Col>
											</Row>
										</CardBody>
									</Card>
								</Col>
							</Row>
							<hr />
							<h2 className="text-center">Stats Reports</h2>
							<Row>
								<Col lg="4">
									<Card className="card-stats mb-4 mb-xl-0">
										<CardBody>
											<Row>
												<div className="col">
													<CardTitle
														tag="h5"
														className="text-uppercase text-muted mb-0"
													>
														Orders
													</CardTitle>
													<span className="h2 font-weight-bold mb-0">
														{
															this.props.orders.filter(
																item =>
																	item.order_datetime.split(" ")[0] ==
																	moment(new Date()).format("DD-MM-yyyy")
															).length
														}
													</span>
												</div>
												<Col className="col-auto">
													<div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
														<i className="fa fa-sticky-note" />
													</div>
												</Col>
											</Row>
										</CardBody>
									</Card>
								</Col>
								<Col lg="4">
									<Card className="card-stats mb-4 mb-xl-0">
										<CardBody>
											<Row>
												<div className="col">
													<CardTitle
														tag="h5"
														className="text-uppercase text-muted mb-0"
													>
														Daily Sales
													</CardTitle>
													<span className="h2 font-weight-bold mb-0">
														{dailySale} Rps
													</span>
												</div>
												<Col className="col-auto">
													<div className="icon icon-shape bg-orange text-white rounded-circle shadow">
														<i className="fa fa-money-bill" />
													</div>
												</Col>
											</Row>
										</CardBody>
									</Card>
								</Col>
								<Col lg="4">
									<Card className="card-stats mb-4 mb-xl-0">
										<CardBody>
											<Row>
												<div className="col">
													<CardTitle
														tag="h5"
														className="text-uppercase text-muted mb-0"
													>
														Weekly Sales
													</CardTitle>
													<span className="h2 font-weight-bold mb-0">
														{weeklySale} Rps
													</span>
												</div>
												<Col className="col-auto">
													<div className="icon icon-shape bg-pink text-white rounded-circle shadow">
														<i className="fa fa-money-bill" />
													</div>
												</Col>
											</Row>
										</CardBody>
									</Card>
								</Col>
							</Row>
						</div>
					</Container>
				</div>
			</>
		);
	}
}
const mapStateToProps = state => ({
	auth: state.auth,

	orders: state.order.orders,
	categories: state.item.categories,
});
export default connect(mapStateToProps, { fetchOrders })(Header);
