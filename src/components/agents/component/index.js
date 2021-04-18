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
import {
  fetchAgents,
  searchAgents,
  openAgentCreateModal,
  agentKycFiles,
  selectedAgentDetails,
} from "../action";
import RenderList from "./agents-list";
import CreateNew from "./agent-add";
import ApproveAgents from "./agent-approve";
import Header from "../../Headers/Header.jsx";
import Pagination from "../../Common/pagination";
import { itemCount } from "../../Common/constant";
import Loader from "../../Common/loader";
import LocaleStrings from "../../../languages";

class Agents extends Component {
  constructor(props) {
    super(props);
    this.state = { pageNumber: 1, search: "" };
  }

  componentDidMount() {
    this.props.fetchAgents(this.props.session);
    this.props.selectedAgentDetails({ agentDetails: {} });
  }

  openModal = () => {
    var files = [
      { label: "Profile Photo", key: "agentpic", file: "", filename: "" },
      {
        label: "Aadhaar Front Photo",
        key: "aadhaarfrontpic",
        file: "",
        filename: "",
      },
      {
        label: "Aadhar Back Photo",
        key: "aadhaarbackpic",
        file: "",
        filename: "",
      },
    ];

    this.props.agentKycFiles(files);
    this.props.openAgentCreateModal({ showModal: true });
  };

  additionalCallback = () => {
    this.paginationCallback(this.state.pageNumber);
  };

  onSearch = (event) => {
    let search = event.target.value;
    let pageNumber = 1;

    if (search === "") {
      this.props.fetchAgents(this.props.session, pageNumber, (response) => {});
    } else {
      this.props.searchAgents(
        this.props.session,
        search,
        pageNumber,
        (response) => {}
      );
    }
    this.setState({ search, pageNumber });
  };

  paginationCallback = (pageNumber) => {
    let { search } = this.state;

    if (search === "") {
      this.props.fetchAgents(this.props.session, pageNumber, (response) => {});
    } else {
      this.props.searchAgents(
        this.props.session,
        search,
        pageNumber,
        (response) => {}
      );
    }
    this.setState({ ...this.state, pageNumber });
  };

  listRender = () => {
    let { agentsList } = this.props;
    let { pageNumber } = this.state;

    return _.map(agentsList.data, (item, index) => {
      return (
        <RenderList
          key={`key_${index}`}
          history={this.props.history}
          printList={item}
          pagination={this.paginationCallback}
          currentPage={pageNumber}
        />
      );
    });
  };

  render() {
    let { agentsList, modalStatus, agentApproveModal } = this.props;
    let { search } = this.state;

    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row>
                <Col lg="7" md="5" sm="6"></Col>
                <Col lg="5" md="7" sm="6" className="text-right">
                  <div style={{ display: "flex" }}>
                    <input
                      className="form-control inputsearch"
                      placeholder={LocaleStrings.search}
                      type="search"
                      value={search}
                      onChange={this.onSearch}
                    />
                    &nbsp;
                    <Button
                      color="primary"
                      type="button"
                      onClick={this.openModal}
                    >
                      {LocaleStrings.button_add_new}
                    </Button>
                    {modalStatus && modalStatus.showModal ? (
                      <CreateNew
                        finishOperationsCallback={this.additionalCallback}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </Col>
              </Row>
            </CardHeader>

            <CardBody>
              {agentsList && agentsList.data ? (
                <div style={{ marginTop: 15 }}>
                  {agentsList.data && agentsList.data.length > 0 ? (
                    <Table
                      className="align-items-center table-flush min-height-135 tablelist"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col" />
                          <th scope="col">
                            {LocaleStrings.agents_table_th_agentcode}
                          </th>
                          <th scope="col">
                            {LocaleStrings.agents_table_th_name}
                          </th>
                          <th scope="col">
                            {LocaleStrings.agents_table_th_email}
                          </th>
                          <th scope="col">
                            {LocaleStrings.agents_table_th_mobile}
                          </th>
                          <th scope="col">
                            {LocaleStrings.agents_table_th_approvalstatus}
                          </th>
                        </tr>
                      </thead>
                      <tbody>{this.listRender()}</tbody>
                    </Table>
                  ) : (
                    <div className="no-content-message">
                      {LocaleStrings.no_record}
                    </div>
                  )}

                  {agentsList.count >= itemCount ? (
                    <CardFooter className="py-4">
                      <Pagination
                        activePage={this.state.pageNumber}
                        itemsCountPerPage={itemCount}
                        totalItemsCount={agentsList.count}
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
            </CardBody>
          </Card>
        </Container>

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
  // console.log('state.agentsList : - ', state.agentsList)

  return {
    session: state.session,
    agentsList: state.agentsList,
    modalStatus: state.agentCreateModal,
    agentApproveModal: state.agentApproveModal,
  };
}
export default connect(mapStateToProps, {
  fetchAgents,
  searchAgents,
  openAgentCreateModal,
  agentKycFiles,
  selectedAgentDetails,
})(Agents);
