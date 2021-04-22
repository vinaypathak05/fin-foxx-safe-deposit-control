import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Card, CardHeader, Row, Col, Button } from "reactstrap";
import { Tabs, Tab } from "react-bootstrap";
import { handlePlanModal } from "../../action";
import RenderList from "./plan-item";
import Loader from "../../../Common/loader";
import LocaleStrings from "../../../../languages";

class CustomerPlans extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedTab: 1 };
  }

  componentDidMount() {}

  handleSelect = (key) => {
    this.setState({ selectedTab: key });
  };

  handleNewPlan = () => {
    this.props.handlePlanModal({
      showModal: true,
      details: this.props.selectedCustomer.details,
    });
  };

  renderList = (plantype) => {
    let { selectedCustomer } = this.props;
    let plan = selectedCustomer.details.ongoing_plans;
    if (plantype === "cashback") {
      plan = selectedCustomer.details.cashback_plans;
    } else if (plantype === "completed") {
      plan = selectedCustomer.details.completed_plans;
    }

    if (plan.length > 0) {
      return _.map(plan, (item, index) => {
        return (
          <RenderList
            key={index}
            printList={item}
            plantype={plantype}
            selectedCustomer={selectedCustomer}
          />
        );
      });
    } else {
      return (
        <Card className="shadow p-5 text-center">
          {LocaleStrings.customer_detail_text_no_record}
        </Card>
      );
    }
  };

  render() {
    let { selectedCustomer } = this.props;
    let { selectedTab } = this.state;

    return (
      <Row className="m-2">
        <div className="col p-2">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row>
                <Col md={6}>
                  <h2>{LocaleStrings.customer_detail_text_plan_details}</h2>
                </Col>
                {selectedCustomer &&
                selectedCustomer.details &&
                selectedCustomer.details.status == "active" &&
                selectedCustomer.details.approvalstatus == "approved" ? (
                  <Col md={6} className="text-right">
                    <Button
                      color="primary"
                      size="sm"
                      type="button"
                      className="ml-3"
                      onClick={this.handleNewPlan}
                    >
                      {LocaleStrings.button_new_plan}
                    </Button>
                  </Col>
                ) : (
                  ""
                )}
              </Row>
            </CardHeader>
            {selectedCustomer.details ? (
              <Tabs
                className="mt-0"
                id="customer-plans-details"
                activeKey={selectedTab}
                onSelect={this.handleSelect}
              >
                <Tab
                  className="p-2"
                  eventKey={1}
                  title={LocaleStrings.customer_detail_text_ongoing_plans}
                >
                  {this.renderList("ongoing")}
                </Tab>
                <Tab
                  className="p-2"
                  eventKey={2}
                  title={LocaleStrings.customer_detail_text_reward_plans}
                >
                  {this.renderList("cashback")}
                </Tab>
                <Tab
                  className="p-2"
                  eventKey={3}
                  title={LocaleStrings.customer_detail_text_completed_plans}
                >
                  {this.renderList("completed")}
                </Tab>
              </Tabs>
            ) : (
              <div className="loaderstyle">
                <Loader />
              </div>
            )}
          </Card>
        </div>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    session: state.session,
  };
}

export default connect(mapStateToProps, { handlePlanModal })(CustomerPlans);
