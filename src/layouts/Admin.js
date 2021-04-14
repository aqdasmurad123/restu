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
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import {connect} from 'react-redux'

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state={
      mainContent:null 
    }
    
  }
  
  // const mainContent = React.useRef(null);
  // const location = useLocation();

  // React.useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   mainContent.current.scrollTop = 0;
  // }, [location]);

   getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

   getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render(){
    if (this.props.loggedIn === false) {
			return <Redirect to="/auth/login" />;
		}
  

  return (
    <>
      <Sidebar
        {...this.props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/argon-react.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" >
        <AdminNavbar
          {...this.props}
          brandText={this.getBrandText(this.props.location.pathname)}
        />
        <Switch>
          {this.getRoutes(routes)}
          <Redirect from="*" to="/admin/index" />
        </Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
}
};
export function mapStateToProps(state) {
	return {
    state,
	
		// user: state.auth.user,
		// notification: state.auth.notification,
		// msg: state.auth.msg,
		loggedIn:state.auth.loggedIn
		
	};
}
export default connect(mapStateToProps) (Admin);
