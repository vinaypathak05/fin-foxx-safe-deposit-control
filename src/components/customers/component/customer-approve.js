import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, reset } from "redux-form";
import _ from "lodash";
import { Button, Modal } from "reactstrap";
import { BaseComponent } from "../../Common/base-component";
import { COMMON_FAIL_MESSAGE, DEVELOPMENT_TYPE } from "../../Common/constant";
import { openCustomerApproveModal, approveCustomer } from "../action";
import { showSuccess, showError } from "../../Common/errorbar";
import AllFilesDrop from "../../Common/uploader-any-file";
import uploaderIcon from "../../../assets/img/icons/uploader-icon.svg";
import LocaleStrings from "../../../languages";

class ApproveCustomer extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      statusApproval: "submitted",
      approvalFile: {},
    };
  }

  componentDidMount() {}

  closeModal = () => {
    this.props.openCustomerApproveModal({ showModal: false, details: {} });
  };

  handleStatus = (e) => {
    var status = e.target.value;

    this.setState({ statusApproval: status });
  };

  onFilesDrop = (file) => {
    // console.log("file :- ", file);

    this.setState({ approvalFile: file });
    this.props.autofill("approvalfile", file);
  };

  onFileAvailable = (bool) => {
    // console.log("bool :- ", bool);
  };

  onSubmitForm = (values) => {
    let { session } = this.props;
    let data = {
      customerid: values.customerid,
      approvalstatus: values.approvalstatus,
      ...(DEVELOPMENT_TYPE === "mohajon" && values.approvalstatus === "approved"
        ? { approvalpdf: values.approvalfile.file }
        : {}),
    };
    // console.log("Values: -", values);
    // console.log("data: -", data);

    if (
      DEVELOPMENT_TYPE === "mohajon" &&
      values.approvalstatus === "approved" &&
      _.isEmpty(values.approvalfile)
    ) {
      this.props.showError(
        LocaleStrings.customers_approve_validation_pdf_required
      );
    } else {
      this.setState({ loading: true });
      this.props.approveCustomer(session, data, (response) => {
        this.setState({ loading: false });
        if (response.success == 1) {
          this.props.showSuccess(LocaleStrings.customers_approve_form_success);
          this.props.finishOperationsCallback();
          this.closeModal();
        } else {
          this.props.showError(COMMON_FAIL_MESSAGE);
        }
      });
    }
  };

  render() {
    var {
      modalStatus,
      handleSubmit,
      pristine,
      reset,
      submitting,
      invalid,
    } = this.props;
    var { loading, statusApproval, approvalFile } = this.state;
    let spinner = loading ? "fas fa-spinner fa-pulse" : "";
    let approvalOptions = [
      {
        value: "submitted",
        text: LocaleStrings.customers_approve_label_option1,
      },
      {
        value: "approved",
        text: LocaleStrings.customers_approve_label_option2,
      },
      { value: "onhold", text: LocaleStrings.customers_approve_label_option3 },
      {
        value: "cancelled",
        text: LocaleStrings.customers_approve_label_option4,
      },
    ];

    var filePreview = "";
    var fileName = "";
    var fileOld = false;
    if (!_.isEmpty(approvalFile)) {
      var file = approvalFile.file;
      fileOld = true;
      fileName = approvalFile.filename;
      var n = file.search(";base64,");
      if (n > 0) {
        fileOld = false;
        filePreview = file;
      }
    }

    return (
      <Modal className="" isOpen={modalStatus.showModal == true ? true : false}>
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title-default">
            {" "}
            {LocaleStrings.customers_approve_madal_title_approve_customer}
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
            <div className="form-group row">
              <label className="custom-label col-sm-12">
                {LocaleStrings.customers_approve_label_select}*
              </label>
              {_.map(approvalOptions, (opt, index) => {
                return (
                  <div key={index} className="col-sm-12 col-md-3">
                    <Field
                      name="approvalstatus"
                      label={opt.text}
                      value={opt.value}
                      type="radio"
                      component={this.renderFieldRadio}
                      onChange={this.handleStatus}
                    />
                  </div>
                );
              })}
            </div>
            {DEVELOPMENT_TYPE === "mohajon" && statusApproval === "approved" ? (
              <div className="form-group row">
                <label className="custom-label col-sm-12">
                  {LocaleStrings.customers_approve_label_pdf}*
                </label>
                <div className="col-sm-12">
                  <AllFilesDrop
                    accept="application/pdf"
                    onFileSave={this.onFilesDrop}
                    onFileChnageLocally={this.onFileAvailable}
                    filepath={filePreview}
                    fileName={fileName}
                    fileOld={fileOld}
                    className="content-files-dropbox"
                    insideImage={uploaderIcon}
                    insideImageStyle={{
                      width: 30,
                      height: 30,
                      margin: "0px 10px 0px",
                    }}
                    insideText="Drag and Drop or Click here to upload file"
                  />

                  <Field
                    name={`approvalfile`}
                    type="text"
                    component={this.renderHiddenFieldTextShowError}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
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
              {LocaleStrings.button_save}
            </Button>
          </div>
        </form>
      </Modal>
    );
  }
}

function validate(values) {
  // console.log("values : - ", values);
  let errors = {};
  var approvalstatus = values["approvalstatus"];
  var approvalfile = values["approvalfile"];

  if (DEVELOPMENT_TYPE === "mohajon") {
    if (
      approvalstatus === "approved" &&
      (!approvalfile || _.isEmpty(approvalfile))
    ) {
      errors["approvalfile"] = LocaleStrings.required;
    }
  }
  // console.log("errors :- ", errors);
  return errors;
}

function mapStateToProps(state) {
  var initVals = {};

  if (
    state.customerApproveModal &&
    state.customerApproveModal.showModal == true
  ) {
    initVals = state.customerApproveModal.details;
  }

  return {
    session: state.session,
    modalStatus: state.customerApproveModal,
    initialValues: initVals,
  };
}

export default connect(mapStateToProps, {
  openCustomerApproveModal,
  approveCustomer,
  showSuccess,
  showError,
})(
  reduxForm({
    validate,
    form: "AgentForm",
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  })(ApproveCustomer)
);
