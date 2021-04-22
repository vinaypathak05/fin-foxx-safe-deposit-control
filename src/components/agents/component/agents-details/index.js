import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardBody, Row } from "reactstrap";
import Header from "../../../Headers/Header.jsx";
import {
  fetchSingleAgent,
  fetchSingleAgentWalletRecharges,
  fetchSingleAgentCustomers,
} from "../../action";
import { fetchAllAgents } from "../../../agents/action";
import AgentBasicDetails from "./agent-basic-details";
import AgentOtherInfo from "./agent-other-info";
import AgentWallet from "./agent-wallet";
import AgentCustomer from "./agent-customer";
import ApproveAgents from "../agent-approve";

class AgentsDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var urlpath = this.props.location.pathname;
    let Id = Number(urlpath.split("/")[3]);

    this.props.fetchSingleAgent(this.props.session, Id);
    this.props.fetchSingleAgentWalletRecharges(this.props.session, Id);
    this.props.fetchSingleAgentCustomers(this.props.session, Id);
    this.props.fetchAllAgents(this.props.session);
  }

  componentWillReceiveProps(nextProps) {}

  additionalCallback = () => {
    let { session, selectedAgent } = this.props;

    this.props.fetchSingleAgent(session, selectedAgent.agentDetails.agentid);
  };

  render() {
    let { selectedAgent, agentApproveModal } = this.props;
    // console.log('selectedAgent :- ', selectedAgent)

    return (
      <>
        <Header />
        <div className="mt--7 mr-5 ml-5">
          <Row>
            <div className="col">
              <Card className="shadow mb-5">
                <CardBody>
                  <AgentBasicDetails
                    selectedAgent={selectedAgent}
                    history={this.props.history}
                  />
                  <hr />
                  <AgentOtherInfo history={this.props.history} />
                  <hr />
                  <AgentWallet history={this.props.history} />
                  <hr />
                  <AgentCustomer history={this.props.history} />
                </CardBody>
              </Card>
            </div>
          </Row>
        </div>
        {agentApproveModal && agentApproveModal.showModal ? (
          <ApproveAgents finishOperationsCallback={this.additionalCallback} />
        ) : (
          ""
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  // console.log('state.selectedAgent :- ', state.selectedAgent)

  return {
    session: state.session,
    selectedAgent: state.selectedAgent,
    agentApproveModal: state.agentApproveModal,
  };
}

export default connect(mapStateToProps, {
  fetchSingleAgent,
  fetchSingleAgentWalletRecharges,
  fetchSingleAgentCustomers,
  fetchAllAgents,
})(AgentsDetails);
