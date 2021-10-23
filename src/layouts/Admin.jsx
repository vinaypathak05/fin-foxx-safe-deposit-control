import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "../components/Navbars/AdminNavbar.jsx";
// import AdminFooter from "../components/Footers/AdminFooter.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import routes from "../routes.js";
import { ErrorBar } from "../components/Common/errorbar";
import { DEVELOPMENT_TYPE } from "../components/Common/constant";

class Admin extends Component {
  componentDidUpdate(e) {
    // document.documentElement.scrollTop = 0;
    // document.scrollingElement.scrollTop = 0;
    // this.refs.mainContent.scrollTop = 0;
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoggedIn) {
      this.props.history.push("/");
    }
  }

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
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc:
              DEVELOPMENT_TYPE === "mohajon"
                ? require("../assets/img/brand/main_logo_moha.png")
                : require("../assets/img/brand/main_logo_pay.png"),
            imgAlt: "...",
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
            pathname={this.props.location.pathname}
          />
          <Switch>{this.getRoutes(routes)}</Switch>
          <Container fluid>{/* <AdminFooter /> */}</Container>
          <ErrorBar />
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
    session: state.session,
  };
}
export default connect(mapStateToProps)(Admin);
