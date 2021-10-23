import React, { Component } from "react";
import { connect } from "react-redux";
import { Form } from "react-advanced-form";
import { Input } from "react-advanced-form-addons";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  // Form,
  // Input,
  Col,
} from "reactstrap";

import LocaleStrings from "../../languages";
import LoginErrorBar from "./errorbar";
import { mainLogin, resetStore } from "../../components/action";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      showerror: false,
      alertMessage: "",
    };
  }

  componentWillMount() {
    if (this.props.isLoggedIn === true) {
      this.props.history.push("/admin/index");
    } else {
      this.props.resetStore();
    }
  }

  onFormSubmit = ({ serialized, fields, form }) => {
    let values = { ...serialized };
    // console.log('login values :- ', values)
    this.setState({ loading: true });
    this.props.mainLogin(values, this.props.session, (response) => {
      // console.log("login response in call back", response);
      if (response.success === 0) {
        this.setState({
          ...this.state,
          alertMessage: LocaleStrings.login_form_validation_login_fail,
          showerror: true,
          loading: false,
        });
      } else if (response.success === 2) {
        //The error is for if user is not admin can't login..
        this.setState({
          ...this.state,
          alertMessage: LocaleStrings.login_form_validation_invalid_credential,
          showerror: true,
          loading: false,
        });
        //setTimeout(() => this.setState({...this.state, showerror: false}), 3000);
      } else {
        this.props.history.push("/admin/index");
      }
    });
  };

  render() {
    let disabled = this.state.loading ? true : false;
    let spinner = this.state.loading ? "fas fa-spinner fa-pulse" : "";

    return (
      <>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent">
              <div className="text-muted text-center">
                {LocaleStrings.login_to}
              </div>
            </CardHeader>
            <CardBody className="">
              {this.state.showerror ? (
                <LoginErrorBar alertMessage={this.state.alertMessage} />
              ) : (
                ""
              )}
              <Form
                ref={(form) => (this.form = form)}
                action={this.onFormSubmit}
              >
                <FormGroup className="mb-3">
                  <Input
                    placeholder={LocaleStrings.login_form_ph_email}
                    type="email"
                    name="email"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    placeholder={LocaleStrings.login_form_label_pass}
                    type="password"
                    name="password"
                    required
                  />
                </FormGroup>
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="submit"
                    disabled={disabled}
                  >
                    <i className={spinner} aria-hidden="true"></i>{" "}
                    {LocaleStrings.button_signin}
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

function mapStateToProps(state) {
  // console.log('state1111 :- ', state)
  return {
    isLoggedIn: state.isLoggedIn,
    session: state.session,
  };
}

export default connect(mapStateToProps, { mainLogin, resetStore })(Login);
