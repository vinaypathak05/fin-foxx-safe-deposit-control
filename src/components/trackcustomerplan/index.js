import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";
import { showSuccess, showError } from "../Common/errorbar";
import { COMMON_FAIL_MESSAGE } from "../Common/constant";
import { trackPlan } from "./actions";
import Header from "../Headers/Header.jsx";
import RenderList from "./components/item-list";
import LocaleStrings from "../../languages";

class TrackCustomerPlans extends Component {
  constructor(props) {
    super(props);
    this.state = { startdate: "", enddate: "", record: [] };
  }

  componentDidMount() {}

  _handleStartDate = (e) => {
    var start = e.target.value;
    this.setState({ startdate: start });
  };

  _handleEndDate = (e) => {
    var end = e.target.value;
    this.setState({ enddate: end });
  };

  _handleReset = () => {
    this.setState({ startdate: "", enddate: "", record: [] });
  };

  handleRecord = () => {
    let { startdate, enddate } = this.state;
    // console.log("startdate :- ", startdate);
    // console.log("enddate :- ", enddate);

    if (startdate != "" && enddate != "") {
      if (startdate > enddate) {
        this.props.showError(
          LocaleStrings.planstrack_validation_start_date_greater_end_date
        );
      } else {
        this.props.trackPlan(
          this.props.session,
          {
            startdate: startdate,
            enddate: enddate,
          },
          (res) => {
            // console.log("res => ", res);
            if (res.success == 1) {
              this.setState({ record: res.data });
            } else if (res.succes == 2) {
              if (res.data && res.data.startdate && res.data.startdate != "") {
                this.props.showError(res.data.startdate);
              } else if (
                res.data &&
                res.data.enddate &&
                res.data.enddate != ""
              ) {
                this.props.showError(res.data.enddate);
              } else {
                this.props.showError(COMMON_FAIL_MESSAGE);
              }
            } else {
              this.props.showError(COMMON_FAIL_MESSAGE);
            }
          }
        );
      }
    } else {
      this.props.showError(
        LocaleStrings.planstrack_validation_select_start_end_date
      );
    }
  };

  listRender = () => {
    let { record } = this.state;

    return _.map(record, (item, i) => {
      return <RenderList key={`key_${i}`} printList={item} />;
    });
  };

  render() {
    let { startdate, enddate } = this.state;

    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row>
                <Col lg="4" md="4" sm="12"></Col>
                <Col lg="8" md="8" sm="12" className="text-right">
                  <Row>
                    <Col lg="4" md="4" sm="12">
                      <label className="custom-label">
                        {LocaleStrings.planstrack_label_startdate}
                      </label>
                      <input
                        className="form-control"
                        name="startdate"
                        type="date"
                        value={startdate}
                        onChange={this._handleStartDate}
                      />
                    </Col>
                    <Col lg="4" md="4" sm="12">
                      <label className="custom-label">
                        {LocaleStrings.planstrack_label_enddate}
                      </label>
                      <input
                        className="form-control"
                        name="enddate"
                        type="date"
                        value={enddate}
                        onChange={this._handleEndDate}
                      />
                    </Col>
                    <Col
                      lg="4"
                      md="4"
                      sm="12"
                      className="d-flex align-items-end mt-2"
                    >
                      <Button
                        color="primary"
                        type="button"
                        onClick={this.handleRecord}
                        disabled={startdate == "" || enddate == ""}
                      >
                        {LocaleStrings.button_check}
                      </Button>
                      <Button
                        color="defalut"
                        type="button"
                        onClick={this._handleReset}
                      >
                        {LocaleStrings.button_reset}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardHeader>

            <CardBody>
              <Table
                className="align-items-center table-flush min-height-135"
                responsive
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">
                      {LocaleStrings.planstrack_table_th_name}
                    </th>
                    <th scope="col">
                      {LocaleStrings.planstrack_table_th_planname}
                    </th>
                    <th scope="col">
                      {LocaleStrings.planstrack_table_th_plan_planamount}
                    </th>
                    <th scope="col">
                      {LocaleStrings.planstrack_table_th_plan_planpaid}
                    </th>
                    <th scope="col">
                      {LocaleStrings.planstrack_table_th_plan_plandue}
                    </th>
                    <th scope="col">
                      {LocaleStrings.planstrack_table_th_plan_startdate}
                    </th>
                    <th scope="col">
                      {LocaleStrings.planstrack_table_th_plan_enddate}
                    </th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>{this.listRender()}</tbody>
              </Table>
            </CardBody>
          </Card>
        </Container>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    session: state.session,
  };
}
export default connect(mapStateToProps, {
  showSuccess,
  showError,
  trackPlan,
})(TrackCustomerPlans);
