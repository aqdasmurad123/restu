/*!
=========================================================
* Argon Dashboard React - v1.1.0
=========================================================
* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import { ThemeConsumer } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Logout } from "../../store/actions/loginAction";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
// reactstrap components
import { Form, Navbar, Nav, Container, Media } from "reactstrap";
import Button from "reactstrap/lib/Button";

class AdminNavbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			requested: false,
		};
	}

	render() {
		return (
			<>
				<Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
					<Container fluid>
						<Link
							className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
							to="/"
						>
							{this.props.brandText}
						</Link>
						<Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto"></Form>
						<Nav className="align-items-center d-none d-md-flex" navbar>
							<Link className="d-none d-md-inline-block" to="/auth/login">
								<Button
									onClick={async () => {
										this.setState({
											requested: true,
										});
										await this.props.Logout();
										this.setState({
											requested: false,
										});
									}}
									size="md"
									color="warning"
								>
									{" "}
									{this.state.requested ? (
										<Loader
											type="TailSpin"
											color="#fff"
											height={20}
											width={30}
										/>
									) : (
										"Logout "
									)}
								</Button>
							</Link>
						</Nav>
					</Container>
				</Navbar>
			</>
		);
	}
}

export function mapStateToProps(state) {
	return {
		user: state.auth.user,
		notification: state.auth.notification,
		msg: state.auth.msg,
		loggedIn: state.auth.loggedIn,
	};
}

export default connect(mapStateToProps, { Logout })(AdminNavbar);
