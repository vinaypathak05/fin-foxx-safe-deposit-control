import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, reset } from "redux-form";
import _ from "lodash";
import { Button, Modal } from "reactstrap";
import { BaseComponent } from "../../Common/base-component";
import { COMMON_FAIL_MESSAGE } from "../../Common/constant";
import { openAgentApproveModal, approveAgent } from "../action";
import { showSuccess, showError } from "../../Common/errorbar";
import LocaleStrings from "../../../languages";

class ApproveAgents extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentDidMount() {}

  closeModal = () => {
    this.props.openAgentApproveModal({ showModal: false, details: {} });
  };

  onSubmitForm = (values) => {
    let { session } = this.props;
    let data = {
      agentid: values.agentid,
      approvalstatus: values.approvalstatus,
    };
    // console.log('Values: -', values)
    // console.log('data: -', data)

    this.setState({ loading: true });
    this.props.approveAgent(session, data, (response) => {
      this.setState({ loading: false });

      if (response.success == 1) {
        this.props.showSuccess(LocaleStrings.agents_approve_form_success);
        this.props.finishOperationsCallback();
        this.closeModal();
      } else {
        this.props.showError(COMMON_FAIL_MESSAGE);
      }
    });
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
    let spinner = this.state.loading ? "fas fa-spinner fa-pulse" : "";
    let approvalOptions = [
      { value: "submitted", text: LocaleStrings.agents_approve_label_option1 },
      { value: "approved", text: LocaleStrings.agents_approve_label_option2 },
      { value: "onhold", text: LocaleStrings.agents_approve_label_option3 },
      { value: "cancelled", text: LocaleStrings.agents_approve_label_option4 },
    ];

    return (
      <Modal className="" isOpen={modalStatus.showModal == true ? true : false}>
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title-default">
            {" "}
            {LocaleStrings.agents_approve_madal_title_approve_agent}
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
                {LocaleStrings.agents_approve_label_select}*
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
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="modal-footer">
            <Button color="secondary" onClick={this.closeModal}>
              {LocaleStrings.button_close}
            </Button>
            <Button
              color="primary"
              type="submit"
              disabled={pristine || invalid || submitting}
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
  // console.log('values : - ', values)
  let errors = {};

  // return errors;
}

function mapStateToProps(state) {
  var initVals = {};

  if (state.agentApproveModal && state.agentApproveModal.showModal == true) {
    initVals = state.agentApproveModal.details;
  }

  return {
    session: state.session,
    modalStatus: state.agentApproveModal,
    initialValues: initVals,
  };
}

export default connect(mapStateToProps, {
  openAgentApproveModal,
  approveAgent,
  showSuccess,
  showError,
})(
  reduxForm({
    validate,
    form: "AgentForm",
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  })(ApproveAgents)
);
