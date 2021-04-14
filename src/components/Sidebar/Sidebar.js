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
/*eslint-disable*/
import React, { useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import Logo from "../../assets/img/logo.png";

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Collapse,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Media,
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Progress,
	Table,
	Container,
	Row,
	Col,
} from "reactstrap";
import { Logout } from "../../store/actions/loginAction";
import { connect } from "react-redux";

var ps;

const Sidebar = props => {
	const [collapseOpen, setCollapseOpen] = useState();
	// verifies if routeName is the one active (in browser input)
	const activeRoute = routeName => {
		return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
	};
	// toggles collapse between opened and closed (true/false)
	const toggleCollapse = () => {
		setCollapseOpen(data => !data);
	};
	// closes the collapse
	const closeCollapse = () => {
		setCollapseOpen(false);
	};
	// creates the links that appear in the left menu / Sidebar
	const createLinks = routes => {
		return routes.map((prop, key) => {
			if (prop.display != false) {
				return (
					<NavItem key={key}>
						<NavLink
							to={prop.layout + prop.path}
							tag={NavLinkRRD}
							onClick={closeCollapse}
							activeClassName="active"
							style={{ color: "#f2f2f2" }}
						>
							<i className={prop.icon} />
							{prop.name}
						</NavLink>
					</NavItem>
				);
			}
		});
	};

	const { bgColor, routes, logo } = props;
	let navbarBrandProps;
	if (logo && logo.innerLink) {
		navbarBrandProps = {
			to: logo.innerLink,
			tag: Link,
		};
	} else if (logo && logo.outterLink) {
		navbarBrandProps = {
			href: logo.outterLink,
			target: "_blank",
		};
	}

	return (
		<Navbar
			className="navbar-vertical fixed-left navbar-light bg-white"
			expand="md"
			id="sidenav-main"
			style={{
				background: "linear-gradient(87deg, #150f0f 0,  #150f0f 100%)",
			}}
		>
			<Container fluid>
				<button
					className="navbar-toggler"
					type="button"
					onClick={toggleCollapse}
				>
					<span className="fa fa-bars text-white" />
				</button>

				<NavbarBrand className="pt-0" {...navbarBrandProps}>
					<img style={{ maxHeight: "70px" }} src={Logo} />
					<br />
					<b
						style={{
							fontSize: "16px",
							color: "#f2f2f2",
							display: "block",
							textAlign: "center",
						}}
					>
						Admin Panel
					</b>
				</NavbarBrand>

				<Nav className="align-items-center d-md-none">
					{/* <UncontrolledDropdown nav>
						<DropdownToggle nav className="nav-link-icon">
							<i className="ni ni-bell-55" />
						</DropdownToggle>
						<DropdownMenu
							aria-labelledby="navbar-default_dropdown_1"
							className="dropdown-menu-arrow"
							right
						>
							<DropdownItem>Action</DropdownItem>
							<DropdownItem>Another action</DropdownItem>
							<DropdownItem divider />
							<DropdownItem>Something else here</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
					<UncontrolledDropdown nav>
						<DropdownToggle nav>
							<Media className="align-items-center">
								<span className="avatar avatar-sm rounded-circle">
									<img
										alt="..."
										src={
											require("../../assets/img/theme/team-1-800x800.jpg")
												.default
										}
									/>
								</span>
							</Media>
						</DropdownToggle>
						<DropdownMenu className="dropdown-menu-arrow" right>
							<DropdownItem className="noti-title" header tag="div">
								<h6 className="text-overflow m-0">Welcome!</h6>
							</DropdownItem>
							<DropdownItem to="/admin/user-profile" tag={Link}>
								<i className="ni ni-single-02" />
								<span>My profile</span>
							</DropdownItem>
							<DropdownItem to="/admin/user-profile" tag={Link}>
								<i className="ni ni-settings-gear-65" />
								<span>Settings</span>
							</DropdownItem>
							<DropdownItem to="/admin/user-profile" tag={Link}>
								<i className="ni ni-calendar-grid-58" />
								<span>Activity</span>
							</DropdownItem>
							<DropdownItem to="/admin/user-profile" tag={Link}>
								<i className="ni ni-support-16" />
								<span>Support</span>
							</DropdownItem>
							<DropdownItem divider />

							<Button
								onClick={() => {
									this.props.Logout().then(res => {
										this.props.history.push("/auth/login");
									});
								}}
							>
								<i className="ni pr-1 ni-user-run" />
								Logout
							</Button>
						</DropdownMenu>
					</UncontrolledDropdown>
				 */}
					<Button
						onClick={async () => {
							await props.Logout();
						}}
						color="danger"
					>
						Logout
					</Button>
				</Nav>

				<Collapse navbar isOpen={collapseOpen}>
					<div className="navbar-collapse-header d-md-none">
						<Row>
							{logo ? (
								<Col className="collapse-brand" xs="6">
									<img style={{ maxHeight: "70px" }} src={Logo} />
								</Col>
							) : null}
							<Col className="collapse-close" xs="6">
								<button
									className="navbar-toggler"
									type="button"
									onClick={toggleCollapse}
								>
									<span />
									<span />
								</button>
							</Col>
						</Row>
					</div>

					{/* <Form className="mt-4 mb-3 d-md-none">
						<InputGroup className="input-group-rounded input-group-merge">
							<Input
								aria-label="Search"
								className="form-control-rounded form-control-prepended"
								placeholder="Search"
								type="search"
							/>
							<InputGroupAddon addonType="prepend">
								<InputGroupText>
									<span className="fa fa-search" />
								</InputGroupText>
							</InputGroupAddon>
						</InputGroup>
					</Form> */}

					<Nav navbar>{createLinks(routes)}</Nav>

					<hr className="my-3" />

					{/* <h6 className="navbar-heading text-muted">Documentation</h6> */}

					<Nav className="mb-md-3" navbar>
						{/* <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Getting started
              </NavLink>
            </NavItem> */}
						{/* <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/colors?ref=adr-admin-sidebar">
                <i className="ni ni-palette" />
                Foundation
              </NavLink>
            </NavItem> */}
						{/* <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=adr-admin-sidebar">
                <i className="ni ni-ui-04" />
                Components
              </NavLink>
            </NavItem> */}
					</Nav>
					{/* <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <NavLink href="https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Upgrade to PRO
              </NavLink>
            </NavItem>
          </Nav> */}
				</Collapse>
			</Container>
		</Navbar>
	);
};

Sidebar.defaultProps = {
	routes: [{}],
};

Sidebar.propTypes = {
	// links that will be displayed inside the component
	routes: PropTypes.arrayOf(PropTypes.object),
	logo: PropTypes.shape({
		// innerLink is for links that will direct the user within the app
		// it will be rendered as <Link to="...">...</Link> tag
		innerLink: PropTypes.string,
		// outterLink is for links that will direct the user outside the app
		// it will be rendered as simple <a href="...">...</a> tag
		outterLink: PropTypes.string,
		// the image src of the logo
		imgSrc: PropTypes.string.isRequired,
		// the alt for the img
		imgAlt: PropTypes.string.isRequired,
	}),
};

export function mapStateToProps(state) {
	return {
		user: state.auth.user,
		notification: state.auth.notification,
		msg: state.auth.msg,
		loggedIn: state.auth.loggedIn,
	};
}

export default connect(mapStateToProps, { Logout })(Sidebar);
