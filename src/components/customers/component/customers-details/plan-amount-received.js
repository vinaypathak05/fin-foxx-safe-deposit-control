import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, reset } from "redux-form";
import _ from "lodash";
import moment from "moment";
import { Button, Modal } from "reactstrap";
import {
  openCustomerPaymentModal,
  customerPaymentReceived,
} from "../../action";
import { BaseComponent } from "../../../Common/base-component";
import {
  COMMON_FAIL_MESSAGE,
  LABEL_POSITION_TOP,
  converDateIntoLocal,
  converDateIntoLocalDate,
} from "../../../Common/constant";
import { showSuccess, showError } from "../../../Common/errorbar";
import LocaleStrings from "../../../../languages";

class CustomerPaymentReceived extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentDidMount() {}

  closeModal = () => {
    this.props.openCustomerPaymentModal({ showModal: false });
  };

  onSubmitForm = (values) => {
    let { modalStatus, session } = this.props;
    values.customerplanid = modalStatus.details.customerplanid;
    // console.log('Values: -', values)

    this.setState({ loading: true });
    this.props.customerPaymentReceived(session, values, (response) => {
      this.setState({ loading: false });

      if (response.success == 1) {
        this.props.showSuccess(
          LocaleStrings.customers_payment_received_form_success
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
    let today = moment(new Date());
    let spinner = this.state.loading ? "fas fa-spinner fa-pulse" : "";
    let disabled = this.state.loading ? true : false;
    var planActivatedon = moment(modalStatus.details.planactivatedate);
    var customerPlanPaymentLastDate = moment(
      modalStatus.details.planexpirydate
    );
    let isPlanExpired =
      customerPlanPaymentLastDate.format("YYYY-MM-DD") <
      today.format("YYYY-MM-DD")
        ? true
        : false;
    if (modalStatus.details.planleftamount == 0) {
      isPlanExpired = true;
    }
    let customerRecurringPayment = "";
    let customerPaymentStausUpto = "";
    // console.log(customerPlanPaymentLastDate)
    // console.log(today)

    if (modalStatus.details.paymentmode === "monthly") {
      let pamount = Math.round(parseInt(modalStatus.details.planamount) / 12);
      customerRecurringPayment = `Customer plan's monthly payment amont: ${pamount}.00`;

      if (isPlanExpired) {
        customerPaymentStausUpto = `Customer has paid total ${modalStatus.details.paidtilldate} before plan get expired`;
      } else {
        let diffMonths = today.diff(planActivatedon, "months");
        // console.log('diffMonths :- ', diffMonths)
        let requiredPaymentTillDate = pamount * (diffMonths + 1);

        if (
          parseInt(modalStatus.details.paidtilldate) > requiredPaymentTillDate
        ) {
          let adv =
            parseInt(modalStatus.details.paidtilldate) -
            requiredPaymentTillDate;
          customerPaymentStausUpto = `Customer has made ${adv} advance payment`;
        } else if (
          parseInt(modalStatus.details.paidtilldate) < requiredPaymentTillDate
        ) {
          let overdue =
            customerPlanPaymentLastDate.format("YYYY-MM-DD") ==
            today.format("YYYY-MM-DD")
              ? modalStatus.details.planleftamount
              : requiredPaymentTillDate -
                parseInt(modalStatus.details.paidtilldate);
          customerPaymentStausUpto = `Customer has ${overdue} overdue payment upto today.`;
        }
      }
    } else if (modalStatus.details.paymentmode === "daily") {
      let pamount = Math.round(
        parseInt(modalStatus.details.planamount) /
          parseInt(modalStatus.details.planduration)
      );
      customerRecurringPayment = `Customer plan's daily payment amount: ${pamount}.00`;

      if (isPlanExpired == true) {
        customerPaymentStausUpto = `Customer has paid total ${modalStatus.details.paidtilldate} before plan get expired`;
      } else {
        let diffDays = today.diff(planActivatedon, "days");
        let requiredPaymentTillDate = pamount * (diffDays + 1);
        if (
          parseInt(modalStatus.details.paidtilldate) > requiredPaymentTillDate
        ) {
          let adv =
            parseInt(modalStatus.details.paidtilldate) -
            requiredPaymentTillDate;
          customerPaymentStausUpto = `Customer has made ${adv} advance payment`;
        } else if (
          parseInt(modalStatus.details.paidtilldate) < requiredPaymentTillDate
        ) {
          let overdue =
            customerPlanPaymentLastDate.format("YYYY-MM-DD") ==
            today.format("YYYY-MM-DD")
              ? modalStatus.details.planleftamount
              : requiredPaymentTillDate -
                parseInt(modalStatus.details.paidtilldate);
          customerPaymentStausUpto = `Customer has ${overdue} overdue payment upto today.`;
        }
      }
    } else {
      let pamount = Math.round(parseInt(modalStatus.details.planamount));
      customerRecurringPayment = `Customer plan's fixed payment amount: ${pamount}.00`;
    }

    return (
      <Modal className="" isOpen={modalStatus.showModal == true ? true : false}>
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title-default">
            {" "}
            {LocaleStrings.customers_payment_received_madal_title}
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
              <i
                className="fa fa-info-circle text-info"
                aria-hidden="true"
                style={{ fontSize: 20 }}
              ></i>
              &nbsp;{" "}
              {LocaleStrings.customers_payment_received_text_agent_wallet}:{" "}
              {modalStatus.customerdetails.balance}
            </div>
            <div className="mb-4">
              <i
                className="fa fa-info-circle text-info"
                aria-hidden="true"
                style={{ fontSize: 20 }}
              ></i>
              &nbsp;
              {customerRecurringPayment}
            </div>
            <div className="mb-4">
              <i
                className="fa fa-info-circle text-info"
                aria-hidden="true"
                style={{ fontSize: 20 }}
              ></i>
              &nbsp;
              {modalStatus.details.customerlastpayment &&
              modalStatus.details.customerlastpayment != ""
                ? `Customer last payment was ${
                    modalStatus.details.customerlastpayment
                  } on ${converDateIntoLocal(
                    modalStatus.details.customerlastpaymentdated
                  )}`
                : `Customer has not started his/her plan amount payments yet.`}
            </div>
            {customerPaymentStausUpto != "" ? (
              <div className="mb-4">
                <i
                  className="fa fa-exclamation-triangle text-warning"
                  aria-hidden="true"
                  style={{ fontSize: 20 }}
                ></i>
                &nbsp;
                {customerPaymentStausUpto}
              </div>
            ) : (
              ""
            )}

            {isPlanExpired == true ? (
              <h3 className="text-info">
                Either customer plan date is over or total plan amount has been
                paid, now you can not accept customer plan due amount.
              </h3>
            ) : (
              <CustomerPaymentForm {...this.props} />
            )}
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
  } else if (amountpaid) {
    if (
      ownProps.modalStatus.details &&
      ownProps.modalStatus.details.paymentmode == "onetime" &&
      parseFloat(amountpaid) <
        parseFloat(ownProps.modalStatus.details.planamount)
    ) {
      errors["amountpaid"] =
        LocaleStrings.customers_payment_received_form_validation_invalid_fixed_amount;
    } else if (amountpaid < 1) {
      errors["amountpaid"] =
        LocaleStrings.customers_payment_received_form_validation_invalid_amount;
    } else if (
      amountpaid &&
      parseFloat(amountpaid) >
        parseFloat(ownProps.modalStatus.customerdetails.balance)
    ) {
      errors["amountpaid"] =
        LocaleStrings.customers_payment_received_form_validation_invalid_agent_amount;
    } else if (
      amountpaid &&
      parseFloat(amountpaid) >
        parseFloat(ownProps.modalStatus.details.planleftamount)
    ) {
      errors["amountpaid"] =
        LocaleStrings.customers_payment_received_form_validation_over_amount;
    }
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    session: state.session,
    modalStatus: state.customerPaymentReceiveModal,
  };
}

export default connect(mapStateToProps, {
  openCustomerPaymentModal,
  customerPaymentReceived,
  showSuccess,
  showError,
})(
  reduxForm({
    validate,
    form: "CustomerPaymentForm",
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  })(CustomerPaymentReceived)
);

class CustomerPaymentForm extends BaseComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Field
          name="amountpaid"
          label={LocaleStrings.customers_payment_received_form_label_amount}
          placeholder={LocaleStrings.customers_payment_received_form_ph_amount}
          type="number"
          component={this.renderFieldText}
          mandatory="true"
          labelposition={LABEL_POSITION_TOP}
        />
      </div>
    );
  }
}
