import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  Card,
  CardHeader,
  CardFooter,
  Row,
  Col,
  Table,
  Button,
} from "reactstrap";
import LocaleStrings from "../../../../languages";
import WalletRecharge from "./agent-wallet-recharge";
import RenderList from "./agent-wallet-items";
import {
  openWalletRechargeModal,
  fetchSingleAgentWalletRecharges,
  fetchSingleAgent,
} from "../../action";
import Pagination from "../../../Common/pagination";
import Loader from "../../../Common/loader";

class AgentWallet extends Component {
  constructor(props) {
    super(props);
    this.state = { pageNumber: 1 };
  }

  componentDidMount() {}

  openModal = () => {
    this.props.openWalletRechargeModal({ showModal: true });
  };

  additionalCallback = () => {
    this.paginationCallback(1);
  };

  paginationCallback = (pageNumber) => {
    let { session, selectedAgent } = this.props;

    this.props.fetchSingleAgentWalletRecharges(
      session,
      selectedAgent.agentDetails.agentid,
      pageNumber,
      (response) => {
        this.props.fetchSingleAgent(
          session,
          selectedAgent.agentDetails.agentid
        );
      }
    );

    this.setState({ ...this.state, pageNumber });
  };

  listRender = () => {
    let { pageNumber } = this.state;

    return _.map(this.props.agentWalletRecharges.data, (item, index) => {
      return (
        <RenderList
          key={index}
          printList={item}
          pagination={this.paginationCallback}
          currentPage={pageNumber}
        />
      );
    });
  };

  render() {
    let { selectedAgent, modalStatus, agentWalletRecharges } = this.props;
    // console.log("agentWalletRecharges :- ", agentWalletRecharges);

    return (
      <Row className="m-2">
        <div className="col p-2">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row>
                <Col md={6}>
                  <h2>{LocaleStrings.wallet}</h2>
                </Col>
                {selectedAgent &&
                selectedAgent.agentDetails &&
                selectedAgent.agentDetails.approvalstatus === "approved" &&
                selectedAgent.agentDetails.status === "active" ? (
                  <Col md={6} className="text-right">
                    <Button
                      color="primary"
                      size="sm"
                      type="button"
                      className="ml-3"
                      onClick={this.openModal}
                    >
                      {LocaleStrings.button_recharge}
                    </Button>
                  </Col>
                ) : (
                  ""
                )}
              </Row>

              {modalStatus && modalStatus.showModal ? (
                <WalletRecharge
                  finishOperationsCallback={this.additionalCallback}
                  agentAllRecharges={agentWalletRecharges}
                />
              ) : (
                ""
              )}
            </CardHeader>
            {agentWalletRecharges && agentWalletRecharges.data ? (
              <div>
                {agentWalletRecharges.data &&
                agentWalletRecharges.data.length > 0 ? (
                  <Table
                    className="align-items-center table-flush min-height-135"
                    responsive
                  >
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">
                          {LocaleStrings.agents_detail_table_th_recharge_amount}
                        </th>
                        <th scope="col">
                          {LocaleStrings.agents_detail_table_th_earning_amount}
                        </th>
                        <th scope="col">
                          {LocaleStrings.agents_detail_table_th_recharge_date}
                        </th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>{this.listRender()}</tbody>
                  </Table>
                ) : (
                  <div className="no-content-message">
                    {LocaleStrings.no_record}
                  </div>
                )}

                {agentWalletRecharges.count > 10 ? (
                  <CardFooter className="py-4">
                    <Pagination
                      activePage={this.state.pageNumber}
                      itemsCountPerPage={10}
                      totalItemsCount={agentWalletRecharges.count}
                      pageRangeDisplayed={3}
                      onChange={this.paginationCallback}
                    />
                  </CardFooter>
                ) : (
                  ""
                )}
              </div>
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
    selectedAgent: state.selectedAgent,
    modalStatus: state.agentWalletRechrgeModal,
    agentWalletRecharges: state.agentWalletRecharges,
  };
}

export default connect(mapStateToProps, {
  openWalletRechargeModal,
  fetchSingleAgentWalletRecharges,
  fetchSingleAgent,
})(AgentWallet);
