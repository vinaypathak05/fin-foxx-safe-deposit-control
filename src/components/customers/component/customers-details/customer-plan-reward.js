import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, reset } from "redux-form";
import _ from "lodash";
import { Button, Modal } from "reactstrap";
import { openCustomerRewardModal, customerRewardPayment } from "../../action";
import { BaseComponent } from "../../../Common/base-component";
import {
  COMMON_FAIL_MESSAGE,
  LABEL_POSITION_TOP,
} from "../../../Common/constant";
import { showSuccess, showError } from "../../../Common/errorbar";
import LocaleStrings from "../../../../languages";

class CustomerRewardPayment extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentDidMount() {}

  closeModal = () => {
    this.props.openCustomerRewardModal({ showModal: false });
  };

  onSubmitForm = (values) => {
    let { modalStatus, session } = this.props;
    values.customerplanid = modalStatus.details.customerplanid;
    // console.log('Values: -', values)

    this.setState({ loading: true });
    this.props.customerRewardPayment(session, values, (response) => {
      this.setState({ loading: false });

      if (response.success == 1) {
        this.props.showSuccess(
          LocaleStrings.customers_reward_payment_form_success
        );
        this.props.finishOperationsCallback();
        this.closeModal();
      } else if (response.success == 2) {
        let message = COMMON_FAIL_MESSAGE;
        if (response.data.customerplanid != "") {
          message = response.data.customerplanid;
        }
        if (response.data.amountpaid != "") {
          message = response.data.amountpaid;
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
            {LocaleStrings.customers_reward_payment_madal_title}
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
            <CustomerReward {...this.props} />
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

function validate(values, ownProps) {
  let errors = {};
  var amountpaid = values["amountpaid"];

  if (!amountpaid || amountpaid === "") {
    errors["amountpaid"] = LocaleStrings.required;
  } else if (
    amountpaid &&
    parseFloat(amountpaid) <
      parseFloat(ownProps.modalStatus.details.paidtilldate)
  ) {
    errors["amountpaid"] =
      LocaleStrings.customers_reward_payment_form_validation_less_amount;
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    session: state.session,
    modalStatus: state.customerRewardModal,
  };
}

export default connect(mapStateToProps, {
  showSuccess,
  showError,
  openCustomerRewardModal,
  customerRewardPayment,
})(
  reduxForm({
    validate,
    form: "CustomerRewardForm",
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  })(CustomerRewardPayment)
);

class CustomerReward extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Field
          name="amountpaid"
          label={LocaleStrings.customers_reward_payment_form_label_amount}
          placeholder={LocaleStrings.customers_reward_payment_form_ph_amount}
          type="number"
          component={this.renderFieldText}
          mandatory="true"
          labelposition={LABEL_POSITION_TOP}
        />
      </div>
    );
  }
}
