import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, reset } from "redux-form";
import _ from "lodash";
import moment from "moment";
import { Button, Modal } from "reactstrap";
import { handlePlanModal, customerNewPlan } from "../../action";
import { BaseComponent } from "../../../Common/base-component";
import {
  COMMON_FAIL_MESSAGE,
  LABEL_POSITION_TOP,
  DB_DATE_FORMAT,
} from "../../../Common/constant";
import { showSuccess, showError } from "../../../Common/errorbar";
import LocaleStrings from "../../../../languages";

class CustomerNewPlanAdd extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentDidMount() {}

  closeModal = () => {
    this.props.handlePlanModal({ showModal: false });
  };

  onSubmitForm = (values) => {
    let { session, modalStatus } = this.props;
    values.customerid = modalStatus.details.customerid;
    values.planactivatedate = moment(values.planactivatedate).format(
      DB_DATE_FORMAT
    );
    // console.log("Values: -", values);

    this.setState({ loading: true });
    this.props.customerNewPlan(session, values, (response) => {
      this.setState({ loading: false });

      if (response.success == 1) {
        this.props.showSuccess(LocaleStrings.customers_plan_form_success);
        this.props.finishOperationsCallback();
        this.closeModal();
      } else if (response.success == 2) {
        let message = COMMON_FAIL_MESSAGE;
        if (response.data.customerid != "") {
          message = response.data.customerid;
        }
        if (response.data.planidfk != "") {
          message = response.data.planidfk;
        }
        if (response.data.planactivatedate != "") {
          message = response.data.planactivatedate;
        }

        this.props.showError(message);
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
    // console.log("modalStatus :- ", modalStatus);
    let spinner = this.state.loading ? "fas fa-spinner fa-pulse" : "";
    let disabled = this.state.loading ? true : false;

    return (
      <Modal className="" isOpen={modalStatus.showModal == true ? true : false}>
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title-default">
            {LocaleStrings.customers_new_plan_madal_title}
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
            <PlanFields {...this.props} />
          </div>
          <div className="modal-footer">
            <Button color="secondary" onClick={this.closeModal}>
              {LocaleStrings.button_close}
            </Button>
            <Button color="primary" type="submit" disabled={disabled}>
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
  let errors = {};
  var planidfk = values["planidfk"];
  var planactivatedate = values["planactivatedate"];

  if (!planidfk || planidfk === "") {
    errors["planidfk"] = LocaleStrings.required;
  }
  if (!planactivatedate || planactivatedate === "") {
    errors["planactivatedate"] = LocaleStrings.required;
  }

  return errors;
}

function mapStateToProps(state) {
  var initVals = {};
  return {
    session: state.session,
    modalStatus: state.customerNewPlanModal,
    allPlans: state.allPlansList,
    initialValues: initVals,
  };
}

export default connect(mapStateToProps, {
  showSuccess,
  showError,
  handlePlanModal,
  customerNewPlan,
})(
  reduxForm({
    validate,
    form: "CustomerPlanForm",
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  })(CustomerNewPlanAdd)
);

class PlanFields extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    let { allPlans } = this.props;
    let planOptions = [];

    _.map(allPlans.data, (item, index) => {
      var obj = { label: `${item.planname}`, value: item.planid.toString() };
      planOptions.push(obj);
    });

    return (
      <div>
        <Field
          name="planidfk"
          label={LocaleStrings.customers_plan_form_label_plan}
          placeholder={LocaleStrings.customers_plan_form_ph_plan}
          component={this.renderFieldSelect}
          mandatory="true"
          opts={planOptions}
          labelposition={LABEL_POSITION_TOP}
        />
        <Field
          name="planactivatedate"
          label={LocaleStrings.customers_plan_form_label_activate_date}
          placeholder={LocaleStrings.customers_plan_form_ph_activate_date}
          component={this.renderDatePicker}
          mandatory="true"
          isHidePastDate="true"
          // selected={moment()}
          labelposition={LABEL_POSITION_TOP}
        />
      </div>
    );
  }
}
