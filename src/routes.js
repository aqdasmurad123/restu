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
import Index from "views/Index.js";

import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Orders from "views/examples/Orders.js";
import Items from "views/examples/Items.js";

var routes = [
	{
		path: "/index",
		name: "Dashboard",
		icon: "fa fa-tachometer-alt text-primary",
		component: Index,
		layout: "/admin",
	},
	// {
	//   path: "/icons",
	//   name: "Icons",
	//   icon: "ni ni-planet text-blue",
	//   component: Icons,
	//   layout: "/admin",
	// },
	// {
	//   path: "/maps",
	//   name: "Maps",
	//   icon: "ni ni-pin-3 text-orange",
	//   component: Maps,
	//   layout: "/admin",
	// },
	// {
	//   path: "/user-profile",
	//   name: "User Profile",
	//   icon: "ni ni-single-02 text-yellow",
	//   component: Profile,
	//   layout: "/admin",
	// },
	{
		path: "/orders",
		name: "Orders",
		icon: "fa fa-sticky-note text-red",
		component: Orders,
		layout: "/admin",
	},
	{
		path: "/items",
		name: "Items",
		icon: "ni ni-bullet-list-67 text-success",
		component: Items,
		layout: "/admin",
	},
	{
		path: "/login",
		display: false,
		component: Login,
		layout: "/auth",
	},
	{
		path: "/register",
		display: false,
		component: Register,
		layout: "/auth",
	},
];
export default routes;
