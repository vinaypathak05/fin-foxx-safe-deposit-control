import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, reset } from "redux-form";
import _ from "lodash";
import moment from "moment";
import { Row, Col, Button, Modal } from "reactstrap";
import { BaseComponent } from "../../../Common/base-component";
import {
  COMMON_FAIL_MESSAGE,
  LABEL_POSITION_TOP,
  DB_DATE_FORMAT,
  converDateIntoLocal,
} from "../../../Common/constant";
import { openRechargeDownloadModal, agentRechargeDownload } from "../../action";
import { showSuccess, showError } from "../../../Common/errorbar";
import LocaleStrings from "../../../../languages";

class DownloadRechargeStatement extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  closeModal = () => {
    this.props.openRechargeDownloadModal({ showModal: false });
  };

  onSubmitForm = (values) => {
    let { selectedAgent, session } = this.props;
    // console.log("Values: -", values);

    var start = moment(values.selectfrom).format(DB_DATE_FORMAT);
    var end = moment(values.selectto).format(DB_DATE_FORMAT);
    var data = {
      selectfrom: start,
      selectto: end,
      agentid: selectedAgent.agentDetails.agentid,
    };
    // console.log("data: -", data);

    this.setState({ loading: true });
    this.props.agentRechargeDownload(session, data, (res) => {
      this.setState({ loading: false });

      if (res.success == 1) {
        if (res.count > 0) {
          this.JSONToCSVConvertor(res.data);
        } else {
          this.props.showError(
            LocaleStrings.agents_detail_recharge_download_error_norecord
          );
        }
        this.closeModal();
      } else if (res.succes == 2) {
        if (res.data && res.data.selectfrom && res.data.selectfrom != "") {
          this.props.showError(res.data.selectfrom);
        } else if (res.data && res.data.selectto && res.data.selectto != "") {
          this.props.showError(res.data.enddate);
        } else if (res.data && res.data.agentid && res.data.agentid != "") {
          this.props.showError(res.data.agentid);
        } else {
          this.props.showError(COMMON_FAIL_MESSAGE);
        }
      } else {
        this.props.showError(COMMON_FAIL_MESSAGE);
      }
    });
  };

  JSONToCSVConvertor = (JSONData) => {
    var XLSX = require("xlsx");
    // console.log("JSONData", JSONData);
    /* Create a new empty workbook, then add the worksheet */
    let wb = XLSX.utils.book_new();
    // console.log("wb", wb);

    var csvdata = [];
    var totalAmount = 0;
    var totalInsentive = 0;
    _.map(JSONData, (item, index) => {
      var obj = {
        Date: converDateIntoLocal(item.createdon),
        Description: item.description,
        Recharge: item.amountpaid,
        Insentive: item.insentive,
      };
      csvdata.push(obj);
      totalAmount = parseFloat(totalAmount) + parseFloat(item.amountpaid);
      totalInsentive = parseFloat(totalInsentive) + parseFloat(item.insentive);
    });

    csvdata.push({
      Date: "",
      Description: LocaleStrings.total,
      Recharge: totalAmount.toFixed(2),
      Insentive: totalInsentive.toFixed(2),
    });

    var ws = XLSX.utils.json_to_sheet(csvdata);
    var sheetName = "statement";

    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    // Generate xlsx files
    XLSX.writeFile(wb, "Statement.xlsx");
  };

  render() {
    var {
      modalStatus,
      handleSubmit,
      pristine,
      submitting,
      invalid,
    } = this.props;
    var { loading } = this.state;
    let spinner = loading ? "fas fa-spinner fa-pulse" : "";

    return (
      <Modal className="" isOpen={modalStatus.showModal == true ? true : false}>
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title-default">
            {LocaleStrings.agents_detail_wallet_madal_title_recharge}
          </h2>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => this.closeModal()}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <hr />
        <form
          onSubmit={handleSubmit(this.onSubmitForm)}
          encType="multipart/form-data"
        >
          <div className="modal-body">
            <div className="mb-4">
              {LocaleStrings.agents_detail_recharge_download_form_subtitle}
            </div>

            <AgentRechargeStatementForm {...this.props} />
          </div>
          <div className="modal-footer">
            <Button color="secondary" onClick={this.closeModal}>
              {LocaleStrings.button_close}
            </Button>
            <Button
              color="primary"
              type="submit"
              disabled={pristine || invalid || submitting || loading}
            >
              <i className={spinner} aria-hidden="true"></i>{" "}
              {LocaleStrings.button_download}
            </Button>
          </div>
        </form>
      </Modal>
    );
  }
}

function validate(values) {
  // console.log('values : - ', values)
  let errors = {};
  var selectfrom = values["selectfrom"];
  var selectto = values["selectto"];

  if (!selectfrom || selectfrom === "") {
    errors["selectfrom"] = LocaleStrings.required;
  }
  if (!selectto || selectto === "") {
    errors["selectto"] = LocaleStrings.required;
  }
  if (selectfrom && selectto && moment(selectto).isBefore(selectfrom)) {
    errors["selectto"] = LocaleStrings.invalid_date_range;
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    session: state.session,
    modalStatus: state.agentRechrgeDownloadModal,
    selectedAgent: state.selectedAgent,
  };
}

export default connect(mapStateToProps, {
  showSuccess,
  showError,
  openRechargeDownloadModal,
  agentRechargeDownload,
})(
  reduxForm({
    validate,
    form: "AgentRechargeDownloadForm",
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  })(DownloadRechargeStatement)
);

class AgentRechargeStatementForm extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        <Col sm={6}>
          <Field
            name="selectfrom"
            label={
              LocaleStrings.agents_detail_recharge_download_form_label_startdate
            }
            placeholder={
              LocaleStrings.agents_detail_recharge_download_form_ph_startdate
            }
            component={this.renderDatePicker}
            mandatory="true"
            isHidePastDate="false"
            closeonselect={true}
            labelposition={LABEL_POSITION_TOP}
          />
        </Col>
        <Col sm={6}>
          <Field
            name="selectto"
            label={
              LocaleStrings.agents_detail_recharge_download_form_label_enddate
            }
            placeholder={
              LocaleStrings.agents_detail_recharge_download_form_ph_enddate
            }
            component={this.renderDatePicker}
            mandatory="true"
            isHidePastDate="false"
            closeonselect={true}
            labelposition={LABEL_POSITION_TOP}
          />
        </Col>
      </Row>
    );
  }
}
