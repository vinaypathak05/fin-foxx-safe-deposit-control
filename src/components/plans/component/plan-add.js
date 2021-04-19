import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, reset } from "redux-form";
import _ from "lodash";
import { Button, Modal } from "reactstrap";
import { BaseComponent } from "../../Common/base-component";
import { COMMON_FAIL_MESSAGE, LABEL_POSITION_TOP } from "../../Common/constant";
import { openPlanCreateModal, validatedPlanName, addNewPlan } from "../action";
import { showSuccess, showError } from "../../Common/errorbar";
import LocaleStrings from "../../../languages";

class AddPlan extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentDidMount() {}

  closeModal = () => {
    this.props.openPlanCreateModal({ showModal: false });
  };

  onSubmitForm = (values) => {
    let { editMode, session } = this.props;
    // console.log('Values: -', values)

    if (!editMode) {
      this.setState({ loading: true });
      this.props.validatedPlanName(session, values, (vres) => {
        if (vres.success == 1) {
          this.props.addNewPlan(session, values, (response) => {
            this.setState({ loading: false });

            if (response.success == 1) {
              this.closeModal();
              this.props.finishOperationsCallback();
              this.props.showSuccess(LocaleStrings.plans_add_form_success);
            } else if (response.success == 2) {
              let message = COMMON_FAIL_MESSAGE;
              if (response.data.planname != "") {
                message = response.data.planname;
              } else if (response.data.planduration != "") {
                message = response.data.planduration;
              } else if (response.data.planamount != "") {
                message = response.data.planamount;
              }

              this.props.showError(message);
            } else {
              this.props.showError(COMMON_FAIL_MESSAGE);
            }
          });
        } else if (vres.success == 2) {
          this.setState({ loading: false });
          this.props.showError(
            LocaleStrings.plans_form_validation_plan_name_exist
          );
        } else {
          this.setState({ loading: false });
          this.props.showError(COMMON_FAIL_MESSAGE);
        }
      });
    }
  };

  render() {
    var {
      modalStatus,
      editMode,
      handleSubmit,
      pristine,
      reset,
      submitting,
      invalid,
    } = this.props;
    var edit = editMode;
    let spinner = this.state.loading ? "fas fa-spinner fa-pulse" : "";

    return (
      <Modal className="" isOpen={modalStatus.showModal == true ? true : false}>
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title-default">
            {" "}
            {edit
              ? LocaleStrings.plans_madal_title_edit
              : LocaleStrings.plans_madal_title_add}
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
            <PlanForm {...this.props} />
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
  var planname = values["planname"];
  var planduration = values["planduration"];
  var planamount = values["planamount"];
  var paymentmode = values["paymentmode"];

  if (!planname || planname.trim() === "") {
    errors["planname"] = LocaleStrings.required;
  }

  if (!planduration || planduration === "") {
    errors["planduration"] = LocaleStrings.required;
  } else if (planduration && planduration < 1) {
    errors["planduration"] =
      LocaleStrings.plans_form_validation_plan_duration_min;
  }

  if (!planamount || planamount === "") {
    errors["planamount"] = LocaleStrings.required;
  } else if (planamount && planamount < 1) {
    errors["planamount"] = LocaleStrings.plans_form_validation_plan_price_min;
  }

  if (!paymentmode || paymentmode.trim() === "") {
    errors["paymentmode"] = LocaleStrings.required;
  }

  return errors;
}

function mapStateToProps(state) {
  var edit = false;
  var initVals = {};

  return {
    session: state.session,
    modalStatus: state.planCreateModal,
    editMode: edit,
    initialValues: initVals,
  };
}

export default connect(mapStateToProps, {
  openPlanCreateModal,
  validatedPlanName,
  addNewPlan,
  showSuccess,
  showError,
})(
  reduxForm({
    validate,
    form: "PlanForm",
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  })(AddPlan)
);

class PlanForm extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    let paymentModeOptions = [
      { label: "Daily", value: "daily" },
      { label: "Monthly", value: "monthly" },
      { label: "One-time", value: "onetime" },
    ];

    return (
      <div>
        <Field
          name="planname"
          label={LocaleStrings.plans_add_form_label_planname}
          placeholder={LocaleStrings.plans_add_form_ph_planname}
          type="text"
          component={this.renderFieldText}
          mandatory="true"
          labelposition={LABEL_POSITION_TOP}
        />
        <Field
          name="planduration"
          label={LocaleStrings.plans_add_form_label_planduration + " (In days)"}
          placeholder={LocaleStrings.plans_add_form_ph_planduration}
          type="number"
          component={this.renderFieldText}
          mandatory="true"
          labelposition={LABEL_POSITION_TOP}
        />
        <Field
          name="planamount"
          label={LocaleStrings.plans_add_form_label_planprice}
          placeholder={LocaleStrings.plans_add_form_ph_planprice}
          type="number"
          component={this.renderFieldText}
          mandatory="true"
          labelposition={LABEL_POSITION_TOP}
        />
        <Field
          name="paymentmode"
          label={LocaleStrings.plans_add_form_label_planmode}
          placeholder={LocaleStrings.plans_add_form_ph_planmode}
          component={this.renderFieldSelect}
          mandatory="true"
          labelposition={LABEL_POSITION_TOP}
          opts={paymentModeOptions}
        />
      </div>
    );
  }
}
