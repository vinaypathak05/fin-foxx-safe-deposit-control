import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";
import ImgsViewer from "react-images-viewer";
import { openAgentApproveModal } from "../../action";
import { BASE_IMAGES_URL } from "../../../Common/constant";
import LocaleStrings from "../../../../languages";

class AgentOtherInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { currImg: 0, viewerIsOpen: false };
  }

  componentDidMount() {}

  approveAction = (e) => {
    this.props.openAgentApproveModal({
      showModal: true,
      details: this.props.selectedAgent.agentDetails,
    });
  };

  viewKyc = () => {
    this.setState({ viewerIsOpen: true });
  };

  gotoPrevious = () => {
    this.setState({ currImg: this.state.currImg - 1 });
  };

  gotoNext = () => {
    this.setState({ currImg: this.state.currImg + 1 });
  };

  closeViewer = () => {
    this.setState({ viewerIsOpen: false, currImg: 0 });
  };

  render() {
    let { selectedAgent } = this.props;
    let kycImgs = [];
    // console.log('selectedAgent : - ', selectedAgent)

    if (
      selectedAgent &&
      selectedAgent.agentDetails &&
      selectedAgent.agentDetails.agentpic
    ) {
      let agentpic = `${BASE_IMAGES_URL}/${selectedAgent.agentDetails.agentpic}`;
      kycImgs.push({ src: agentpic });
    }
    if (
      selectedAgent &&
      selectedAgent.agentDetails &&
      selectedAgent.agentDetails.aadhaarfrontpic
    ) {
      let aadhaarfrontpic = `${BASE_IMAGES_URL}/${selectedAgent.agentDetails.aadhaarfrontpic}`;
      kycImgs.push({ src: aadhaarfrontpic });
    }
    if (
      selectedAgent &&
      selectedAgent.agentDetails &&
      selectedAgent.agentDetails.aadhaarbackpic
    ) {
      let aadhaarbackpic = `${BASE_IMAGES_URL}/${selectedAgent.agentDetails.aadhaarbackpic}`;
      kycImgs.push({ src: aadhaarbackpic });
    }
    if (
      selectedAgent &&
      selectedAgent.agentDetails &&
      selectedAgent.agentDetails.pancardpic
    ) {
      let pancardpic = `${BASE_IMAGES_URL}/${selectedAgent.agentDetails.pancardpic}`;
      kycImgs.push({ src: pancardpic });
    }

    return (
      <Row className="m-2">
        <div className="col p-2">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row>
                <Col md={6}>
                  <h2>{LocaleStrings.agents_detail_text_other_info}</h2>
                </Col>
                {selectedAgent &&
                selectedAgent.agentDetails &&
                selectedAgent.agentDetails.status == "active" &&
                (selectedAgent.agentDetails.approvalstatus == "submitted" ||
                  selectedAgent.agentDetails.approvalstatus == "onhold") ? (
                  <Col md={6} className="text-right">
                    <Button
                      color="primary"
                      size="sm"
                      type="button"
                      className="ml-3"
                      onClick={this.approveAction}
                    >
                      {LocaleStrings.button_approve}
                    </Button>
                  </Col>
                ) : (
                  ""
                )}
              </Row>
            </CardHeader>

            <CardBody>
              {kycImgs.length > 0 ? (
                <Button color="primary" onClick={this.viewKyc}>
                  {LocaleStrings.button_view_kyc}
                </Button>
              ) : (
                <p>No KYC doc uploaded by agent.</p>
              )}

              <ImgsViewer
                imgs={kycImgs}
                currImg={this.state.currImg}
                isOpen={this.state.viewerIsOpen}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                onClose={this.closeViewer}
                rightArrowTitle={LocaleStrings.next}
                leftArrowTitle={LocaleStrings.previous}
                closeBtnTitle={LocaleStrings.close}
              />
            </CardBody>
          </Card>
        </div>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  // console.log('state :- ', state);

  return {
    session: state.session,
    selectedAgent: state.selectedAgent,
  };
}

export default connect(mapStateToProps, { openAgentApproveModal })(
  AgentOtherInfo
);
