import LocalizedStrings from "react-localization";
import { totalmem } from "os";

const LocaleStrings = new LocalizedStrings({
  en: {
    common_fail_message: "Something went wrong!",
    search: "Search",
    total: "Total",
    no_record: "No Record to display",
    days: "day(s)",
    required: "Required",
    wallet: "Wallet",
    drag_and_drop: "drag and drop or select file",
    previous: "Previous",
    next: "Next",
    close: "Close",
    payments: "Payments",

    // Menu
    dashboard: "Dashboard",
    agents: "Agents",
    agentDetails: "Agent Details",
    customers: "Customers",
    customerDetails: "Customer Details",
    plans: "Plans",
    memberships: "Memberships",
    transactions: "Transactions",
    notifications: "Notifications",
    reports: "Reports",
    settings: "Global Settings",

    //Buttons
    button_signin: "Sign in",
    button_add_new: "Add New",
    button_edit: "Edit",
    button_delete: "Delete",
    button_update: "Update",
    button_activate: "Activate",
    button_deactivate: "Deactivate",
    button_save: "Save",
    button_close: "Close",
    button_set_password: "Set Password",
    button_show_details: "Show Details",
    button_hide_details: "Hide Details",
    button_add_more: "Add More",
    button_pay: "Pay",
    button_view: "View",
    button_mark_paid: "Mark as paid",
    button_logout: "Logout",
    button_ok: "Ok",
    button_approve: "Approve",
    button_recharge: "Recharge",
    button_new_customer: "New Customer",
    button_amount_collect: "Collect Amount",
    button_upload_new_file: "Upload New File",
    button_view_kyc: "View KYC",

    //Login
    welcome: "Welcome",
    welcome_text_sub: "Login to manage your admin panel",
    login_to: "Login to PayInsure",
    login_form_ph_email: "Email",
    login_text_invalid_password: "Invalid password",
    login_form_label_pass: "Password",
    login_form_ph_pass: "Enter password",
    login_form_validation_login_fail: "Incorrect email or password!",
    login_form_validation_invalid_credential: "Invalid credential!",

    // Agents
    agents_table_th_agentcode: "Agent Code",
    agents_table_th_name: "Name",
    agents_table_th_email: "Email",
    agents_table_th_security_amount: "Security Amount",
    agents_table_th_mobile: "Mobile",
    agents_table_th_approvalstatus: "Approval Status",
    agents_table_th_status: "Status",
    agents_table_th_bank_name: "Bank Name",
    agents_table_th_bank_acc: "Bank A/C",
    agents_table_th_bank_ifsc: "Bank IFSC",
    agents_table_th_bank_branch: "Bank Branch",
    agents_madal_tab_text_basic_details: "Basic Details",
    agents_madal_tab_text_bank_details: "Bank Details",
    agents_madal_tab_text_docs_details: "Docs Details",
    agents_madal_title_add: "Add New Agent",
    agents_madal_title_edit: "Update Agent",
    agents_add_form_label_email: "Email",
    agents_add_form_ph_email: "Enter your email",
    agents_add_form_label_firstname: "First Name",
    agents_add_form_ph_firstname: "Enter your first name",
    agents_add_form_label_lastname: "Last Name",
    agents_add_form_ph_lastname: "Enter your last name",
    agents_add_form_label_mobile: "Mobile",
    agents_add_form_ph_mobile: "Enter your mobile number",
    agents_add_form_label_bank_name: "Bank Name",
    agents_add_form_ph_bank_name: "Enter your bank name",
    agents_add_form_label_account_number: "Account Number",
    agents_add_form_ph_account_number: "Enter your bank account number",
    agents_add_form_label_bank_branch: "Branch",
    agents_add_form_ph_bank_branch: "Enter your bank branch name",
    agents_add_form_label_ifsc: "Ifsc Code",
    agents_add_form_ph_ifsc: "Enter your bank ifsc code",
    agents_validation_invalid_email: "Invalid email",
    agents_validation_invalid_mobile_number: "Invalid mobile format",
    agents_add_form_success: "Agent added successfully.!",
    agents_approve_madal_title_approve_agent: "Approve Agent",
    agents_approve_label_select: "Select Option",
    agents_approve_label_option1: "Submitted",
    agents_approve_label_option2: "Approved",
    agents_approve_label_option3: "Onhold",
    agents_approve_label_option4: "Cancelled",
    agents_approve_form_success: "Agent approval status updated successfully.!",
    agents_deactivated_success: "Agent deactivated successfully.!",
    agents_activated_success: "Agent activated successfully.!",
    agents_deleted_success: "Agent deleted successfully.!",
    agents_detail_text_other_info: "Other Info",
    agents_detail_text_wallet_amount: "Wallet Amount",
    agents_detail_text_earned_amount: "Total Earned Amount",
    agents_detail_text_total_client: "Total Client",
    agents_detail_table_th_recharge_amount: "Recharge Amount",
    agents_detail_table_th_earning_amount: "Earning Amount",
    agents_detail_table_th_recharge_date: "Date",
    agents_detail_wallet_madal_title_recharge: "Recharge Wallet",
    agents_detail_wallet_add_form_label_amount: "Amount",
    agents_detail_wallet_add_form_ph_amount: "Enter recharge amount",
    agents_detail_wallet_validation_invalid_amount: "Minimum amount is 10",
    agents_detail_wallet_validation_security_amount_required:
      "First time agent have to pay more or equal to security deposit money",
    agents_detail_wallet_text_security_money:
      "Pay your security money with first recharge",
    agents_detail_wallet_add_form_success: "Wallet recharged successfully.!",
    agents_detail_table_th_fullname: "Fullname",
    agents_detail_table_th_email: "Email",
    agents_detail_table_th_mobile: "Mobile",
    agents_detail_table_th_paymentmode: "Payment Mode",
    agents_detail_table_th_paidtilldate: "Paid Upto",
    agents_detail_table_th_planname: "Plan Name",
    agents_detail_table_th_planduration: "Plan Duration",
    agents_detail_table_th_dueamount: "Due",
    agents_detail_table_th_planamount: "Plan Amount",

    // Customers
    customers_table_th_customercode: "Customer Code",
    customers_table_th_name: "Name",
    customers_table_th_agentname: "Agent Name",
    customers_table_th_email: "Email",
    customers_table_th_mobile: "Mobile",
    customers_table_th_payment_mode: "Payment Mode",
    customers_table_th_status: "Status",
    customers_alert_deactivated: "Customer deactivated successfully.!",
    customers_alert_activated: "Customer activated successfully.!",
    customers_madal_title_add: "Add New Customer",
    customers_madal_title_edit: "Update Customer",
    customers_madal_tab_text_basic_details: "Basic Details",
    customers_madal_tab_text_others_details: "Other Details",
    customers_madal_tab_text_docs_details: "Docs Details",
    customers_add_form_label_user_agent: "Agent",
    customers_add_form_ph_user_agent: "Select user agent",
    customers_add_form_label_plan: "Plans",
    customers_add_form_ph_plan: "Select user plan",
    customers_add_form_label_payment_mode: "Payment Mode",
    customers_add_form_ph_payment_mode: "Select payment mode",
    customers_add_form_label_email: "Email",
    customers_add_form_ph_email: "Enter your email",
    customers_add_form_label_firstname: "First Name",
    customers_add_form_ph_firstname: "Enter your first name",
    customers_add_form_label_lastname: "Last Name",
    customers_add_form_ph_lastname: "Enter your last name",
    customers_add_form_label_mobile: "Mobile",
    customers_add_form_ph_mobile: "Enter your mobile number",
    customers_add_form_label_address1: "Address Line 1",
    customers_add_form_ph_address1: "Enter address line 1",
    customers_add_form_label_address2: "Address Line 2",
    customers_add_form_ph_address2: "Enter address line 2",
    customers_add_form_label_city: "City",
    customers_add_form_ph_city: "Enter city name",
    customers_add_form_label_state: "State",
    customers_add_form_ph_state: "Enter state name",
    customers_add_form_label_pin: "Pincode",
    customers_add_form_ph_pin: "Enter pincode",

    customers_payment_received_madal_title: "Collect Payment",
    customers_payment_received_form_label_amount: "Amount",
    customers_payment_received_form_ph_amount: "Enter amount",
    customers_payment_received_form_validation_invalid_amount:
      "You can not pay amount less than 1.",
    customers_payment_received_form_validation_invalid_fixed_amount:
      "You can not pay amount less than your plan amount.",
    customers_payment_received_form_validation_invalid_agent_amount:
      "Agent wallet does not have sufficient amount, recharge agent wallet.",
    customers_payment_received_form_validation_over_amount:
      "You can not accept more than customer due amount.",
    customers_payment_received_form_success:
      "Customer payment done successfully.!",

    customers_approve_madal_title_approve_customer: "Approve Customer",
    customers_approve_label_select: "Select Option",
    customers_approve_label_option1: "Submitted",
    customers_approve_label_option2: "Approved",
    customers_approve_label_option3: "Onhold",
    customers_approve_label_option4: "Cancelled",
    customers_approve_form_success:
      "Agent approval status updated successfully.!",

    customer_detail_text_plan_amount: "Plan Amount",
    customer_detail_text_plan_due_amount: "Plan Left Amount",

    customer_detail_table_th_payment_amount: "Payment Amount",
    customer_detail_table_th_payment_date: "Date",

    // Plans
    plans_table_th_name: "Plan Name",
    plans_table_th_duration: "Duration",
    plane_table_th_price: "Plan Price",
    plans_table_th_status: "Status",
    plans_madal_title_add: "Add New Plan",
    plans_madal_title_edit: "Update Plan",
    plans_add_form_label_planname: "Plan Name",
    plans_add_form_ph_planname: "Enter plan name",
    plans_add_form_label_planduration: "Plan Duration",
    plans_add_form_ph_planduration: "Enter plan duration",
    plans_add_form_label_planprice: "Plan Price",
    plans_add_form_ph_planprice: "Enter plan price",
    plans_add_form_label_planmode: "Plan Mode",
    plans_add_form_ph_planmode: "Select plan mode",
    plans_form_validation_plan_duration_min:
      "Plan duration should be greated then 1",
    plans_form_validation_plan_price_min: "Plan price should be greated then 1",
    plans_form_validation_plan_name_exist:
      "Plan name is alreay exist, add new plan name.!",
    plans_add_form_success: "Plan added succussfully.!",
    plans_alert_deactivated: "Plan deactivated succussfully.!",
    plans_alert_activated: "Plan activated succussfully.!",
  },
  it: {
    dashboard: "Dashboard",
  },
});

// module.exports = LocaleStrings;
export default LocaleStrings;
