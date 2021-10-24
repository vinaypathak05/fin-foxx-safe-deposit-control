import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";
import ImgsViewer from "react-images-viewer";
import { openCustomerApproveModal } from "../../action";
import { BASE_IMAGES_URL, DEVELOPMENT_TYPE } from "../../../Common/constant";
import LocaleStrings from "../../../../languages";

class CustomerOtherInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { currImg: 0, viewerIsOpen: false };
  }

  componentDidMount() {}

  approveAction = (e) => {
    this.props.openCustomerApproveModal({
      showModal: true,
      details: this.props.selectedCustomer.details,
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
    let { selectedCustomer } = this.props;
    let kycImgs = [];
    // console.log('selectedCustomer : - ', selectedCustomer)

    if (
      selectedCustomer &&
      selectedCustomer.details &&
      selectedCustomer.details.userpic
    ) {
      let userpic = `${BASE_IMAGES_URL}/${selectedCustomer.details.userpic}`;
      kycImgs.push({ src: userpic });
    }
    if (
      selectedCustomer &&
      selectedCustomer.details &&
      selectedCustomer.details.aadhaarfrontpic
    ) {
      let aadhaarfrontpic = `${BASE_IMAGES_URL}/${selectedCustomer.details.aadhaarfrontpic}`;
      kycImgs.push({ src: aadhaarfrontpic });
    }
    if (
      selectedCustomer &&
      selectedCustomer.details &&
      selectedCustomer.details.aadhaarbackpic
    ) {
      let aadhaarbackpic = `${BASE_IMAGES_URL}/${selectedCustomer.details.aadhaarbackpic}`;
      kycImgs.push({ src: aadhaarbackpic });
    }
    if (
      selectedCustomer &&
      selectedCustomer.details &&
      selectedCustomer.details.bankdetailspic
    ) {
      let bankdetailspic = `${BASE_IMAGES_URL}/${selectedCustomer.details.bankdetailspic}`;
      kycImgs.push({ src: bankdetailspic });
    }
    if (
      selectedCustomer &&
      selectedCustomer.details &&
      selectedCustomer.details.pancardpic
    ) {
      let pancardpic = `${BASE_IMAGES_URL}/${selectedCustomer.details.pancardpic}`;
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
                {selectedCustomer &&
                selectedCustomer.details &&
                selectedCustomer.details.status == "active" &&
                (selectedCustomer.details.approvalstatus == "submitted" ||
                  selectedCustomer.details.approvalstatus == "onhold") ? (
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
              {DEVELOPMENT_TYPE === "mohajon" &&
              selectedCustomer &&
              selectedCustomer.details &&
              selectedCustomer.details.approvalstatus === "approved" &&
              selectedCustomer.details.approvalpdf ? (
                <a
                  className="btn btn-primary action-button"
                  target="_blank"
                  href={`${BASE_IMAGES_URL}/${selectedCustomer.details.approvalpdf}`}
                  title="Download"
                  download
                >
                  {LocaleStrings.button_download_approval_pdf}
                </a>
              ) : (
                ""
              )}
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
    selectedCustomer: state.selectedCustomer,
  };
}

export default connect(mapStateToProps, { openCustomerApproveModal })(
  CustomerOtherInfo
);
