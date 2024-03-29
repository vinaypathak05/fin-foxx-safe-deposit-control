import LocalizedStrings from "react-localization";
// var DEVELOPMENT_TYPE = "payinsure";
var DEVELOPMENT_TYPE = "mohajon";

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
    invalid_profile_image_size:
      "Image is smaller than recommended image, upload another image.!",
    invalid_date_range: "Invalid date range",

    // Menu
    dashboard: "Dashboard",
    agents: DEVELOPMENT_TYPE === "mohajon" ? "Introducer" : "Agents",
    agentDetails:
      DEVELOPMENT_TYPE === "mohajon" ? "Introducer Details" : "Agent Details",
    customers: DEVELOPMENT_TYPE === "mohajon" ? "Members" : "Customers",
    customerDetails:
      DEVELOPMENT_TYPE === "mohajon" ? "Member Details" : "Customer Details",
    plans: "Plans",
    trackplan: "Track Plan",
    memberships: "Memberships",
    transactions: "Transactions",
    notifications: "Notifications",
    settings: "Global Settings",

    // Buttons
    button_signin: "Sign in",
    button_add_new: "Add New",
    button_edit: "Edit",
    button_delete: "Delete",
    button_remove: "Remove",
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
    button_reward_amount:
      DEVELOPMENT_TYPE === "mohajon" ? "Maturity Amount" : "Reward Amount",
    button_cashback_amount: "Cashback Amount",
    button_upload_new_file: "Upload New File",
    button_view_kyc: "View KYC",
    button_download_approval_pdf: "Download Approval Pdf",
    button_new_plan: "New Plan",
    button_upload_new_image: "Upload New",
    button_crop: "Crop",
    button_check: "Check",
    button_reset: "Reset",
    button_download: "Download",

    //Login
    welcome: "Welcome",
    welcome_text_sub: "Login to manage your admin panel",
    login_to:
      DEVELOPMENT_TYPE === "mohajon"
        ? "Login to Mohajon Capital"
        : "Login to PayInsure",
    login_form_ph_email: "Email",
    login_text_invalid_password: "Invalid password",
    login_form_label_pass: "Password",
    login_form_ph_pass: "Enter password",
    login_form_validation_login_fail: "Incorrect email or password!",
    login_form_validation_invalid_credential: "Invalid credential!",

    // Agents
    agents_table_th_agentcode:
      DEVELOPMENT_TYPE === "mohajon" ? "Introducer Code" : "Agent Code",
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
    agents_madal_tab_text_basic_details: "Basic Info",
    agents_madal_tab_text_bank_details: "Bank Info",
    agents_madal_tab_text_docs_details: "Docs",
    agents_madal_title_add:
      DEVELOPMENT_TYPE === "mohajon" ? "Add New Introducer" : "Add New Agent",
    agents_madal_title_edit:
      DEVELOPMENT_TYPE === "mohajon" ? "Update Introducer" : "Update Agent",
    agents_add_form_label_email: "Email",
    agents_add_form_ph_email: "Enter your email",
    agents_add_form_label_firstname: "First Name",
    agents_add_form_ph_firstname: "Enter your first name",
    agents_add_form_label_lastname: "Last Name",
    agents_add_form_ph_lastname: "Enter your last name",
    agents_add_form_label_mobile: "Mobile",
    agents_add_form_ph_mobile: "Enter your mobile number",
    agents_add_form_label_password: "Password",
    agents_add_form_ph_password: "Enter password for agent",
    agents_add_form_label_bank_name: "Bank Name",
    agents_add_form_ph_bank_name: "Enter your bank name",
    agents_add_form_label_account_number: "Account Number",
    agents_add_form_ph_account_number: "Enter your bank account number",
    agents_add_form_label_bank_branch: "Branch",
    agents_add_form_ph_bank_branch: "Enter your bank branch name",
    agents_add_form_label_ifsc: "Ifsc Code",
    agents_add_form_ph_ifsc: "Enter your bank ifsc code",
    agents_add_form_label_profile: "Profile Photo",
    agents_add_form_label_aadhaarfront: "Aadhaar Front Photo",
    agents_add_form_label_aadhaarback: "Aadhaar Back Photo",
    agents_add_form_label_pancard: "Pancard Photo",
    agents_validation_invalid_email: "Invalid email",
    agents_validation_invalid_mobile_number: "Invalid mobile format",
    agents_validation_invalid_min_password:
      "Please enter minimum 8 characters password",
    agents_add_form_success:
      DEVELOPMENT_TYPE === "mohajon"
        ? "Introducer added successfully!"
        : "Agent added successfully!",
    agents_edit_form_success:
      DEVELOPMENT_TYPE === "mohajon"
        ? "Introducer updated successfully!"
        : "Agent updated successfully!",
    agents_approve_madal_title_approve_agent:
      DEVELOPMENT_TYPE === "mohajon" ? "Approve Introducer" : "Approve Agent",
    agents_approve_label_select: "Select Option",
    agents_approve_label_option1: "Submitted",
    agents_approve_label_option2: "Approved",
    agents_approve_label_option3: "Onhold",
    agents_approve_label_option4: "Cancelled",
    agents_approve_form_success:
      DEVELOPMENT_TYPE === "mohajon"
        ? "Introducer approval status updated successfully!"
        : "Agent approval status updated successfully!",
    agents_deactivated_success:
      DEVELOPMENT_TYPE === "mohajon"
        ? "Introducer deactivated successfully!"
        : "Agent deactivated successfully!",
    agents_activated_success:
      DEVELOPMENT_TYPE === "mohajon"
        ? "Introducer activated successfully!"
        : "Agent activated successfully!",
    agents_deleted_success:
      DEVELOPMENT_TYPE === "mohajon"
        ? "Introducer deleted successfull!"
        : "Agent deleted successfully!",
    agents_detail_text_other_info: "Other Info",
    agents_detail_text_wallet_amount: "Wallet Amount",
    agents_detail_text_earned_amount:
      DEVELOPMENT_TYPE === "mohajon"
        ? "Total Incentive Amount"
        : "Total Earned Amount",
    agents_detail_text_total_client: "Total Client",
    agents_detail_table_th_recharge_amount: "Recharge Amount",
    agents_detail_table_th_earning_amount:
      DEVELOPMENT_TYPE === "mohajon" ? "Incentive Amount" : "Earning Amount",
    agents_detail_table_th_recharge_date: "Date",
    agents_detail_wallet_madal_title_recharge: "Recharge Wallet",
    agents_detail_wallet_add_form_label_amount: "Amount",
    agents_detail_wallet_add_form_ph_amount: "Enter recharge amount",
    agents_detail_wallet_validation_invalid_amount: "Minimum amount is 10",
    agents_detail_wallet_validation_security_amount_required:
      "First time agent have to pay minimum Rs 550",
    agents_detail_wallet_text_security_money:
      "Pay your security money with first recharge",
    agents_detail_wallet_add_form_success: "Wallet recharged successfully!",

    agents_detail_recharge_download_form_subtitle:
      "Slect the date to download your recharge statement",
    agents_detail_recharge_download_form_label_startdate: "Start Date",
    agents_detail_recharge_download_form_ph_startdate: "Select start date",
    agents_detail_recharge_download_form_label_enddate: "End Date",
    agents_detail_recharge_download_form_ph_enddate: "Select end date",
    agents_detail_recharge_download_error_norecord: "No recode to download",

    // Customers
    customers_table_th_customercode:
      DEVELOPMENT_TYPE === "mohajon" ? "Member Id" : "Customer Code",
    customers_table_th_name: "Name",
    customers_table_th_agentname:
      DEVELOPMENT_TYPE === "mohajon" ? "Introducer Name" : "Agent Name",
    customers_table_th_email: "Email",
    customers_table_th_mobile: "Mobile",
    customers_table_th_approvalstatus: "Approval Status",
    customers_table_th_status: "Status",
    customers_alert_deactivated: "Customer deactivated successfully.!",
    customers_alert_activated: "Customer activated successfully.!",
    customers_madal_title_add: "Add New Customer",
    customers_madal_title_edit: "Update Customer",
    customers_madal_tab_text_basic_details: "Basic Info",
    customers_madal_tab_text_others_details: "Other Info",
    customers_madal_tab_text_docs_details: "Docs",
    customers_add_form_label_user_agent:
      DEVELOPMENT_TYPE === "mohajon" ? "Introducer" : "Agent",
    customers_add_form_ph_user_agent:
      DEVELOPMENT_TYPE === "mohajon"
        ? "Select user introducer"
        : "Select user agent",
    customers_add_form_label_email: "Email",
    customers_add_form_ph_email: "Enter your email",
    customers_add_form_label_firstname: "First Name",
    customers_add_form_ph_firstname: "Enter your first name",
    customers_add_form_label_lastname: "Last Name",
    customers_add_form_ph_lastname: "Enter your last name",
    customers_add_form_label_mobile: "Mobile",
    customers_add_form_ph_mobile: "Enter your mobile number",
    customers_add_form_label_aadhaarno: "Aadhaar Number",
    customers_add_form_ph_aadhaarno: "Enter your aadhaar number",
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
    customers_add_form_label_profile: "Profile Photo",
    customers_add_form_label_aadhaarfront: "Aadhaar Front Photo",
    customers_add_form_label_aadhaarback: "Aadhaar Back Photo",
    customers_add_form_label_bankacc: "Bank Account Photo",
    customers_add_form_label_pancard: "Pancard Photo",
    customers_validation_invalid_aadhaar_number: "Invalid aadhaar format",
    customers_add_form_success: "Customer added successfully.!",
    customers_edit_form_success: "Customer updated successfully.!",

    customers_payment_received_text_agent_wallet:
      DEVELOPMENT_TYPE === "mohajon"
        ? "Introducer wallet amount"
        : "Agent wallet amount",
    customers_payment_received_madal_title: "Collect Payment",
    customers_payment_received_form_label_amount: "Amount",
    customers_payment_received_form_ph_amount: "Enter amount",
    customers_payment_received_form_validation_invalid_amount:
      "You can not pay amount less than 1.",
    customers_payment_received_form_validation_invalid_fixed_amount:
      "You can not pay amount less than your plan amount.",
    customers_payment_received_form_validation_invalid_agent_amount:
      DEVELOPMENT_TYPE === "mohajon"
        ? "Introducer wallet does not have sufficient amount, recharge agent wallet."
        : "Agent wallet does not have sufficient amount, recharge agent wallet.",
    customers_payment_received_form_validation_over_amount:
      "You can not accept more than customer due amount.",
    customers_payment_received_form_success:
      "Customer payment done successfully.!",

    customers_reward_payment_madal_title:
      DEVELOPMENT_TYPE === "mohajon"
        ? "Customer Maturity Payment"
        : "Customer Reward Payment",
    customers_reward_payment_form_label_amount: "Amount",
    customers_reward_payment_form_ph_amount:
      DEVELOPMENT_TYPE === "mohajon"
        ? "Enter maturity amount"
        : "Enter reward amount",
    customers_reward_payment_form_validation_less_amount:
      "You can not pay amount less than customer's total paid amount.",
    customers_reward_payment_form_success:
      DEVELOPMENT_TYPE === "mohajon"
        ? "Customer maturity payment done successfully!"
        : "Customer reward payment done successfully!",

    customers_approve_madal_title_approve_customer: "Approve Customer",
    customers_approve_label_select: "Select Option",
    customers_approve_label_option1: "Submitted",
    customers_approve_label_option2: "Approved",
    customers_approve_label_option3: "Onhold",
    customers_approve_label_option4: "Cancelled",
    customers_approve_label_pdf: "Upload Approval Pdf",
    customers_approve_validation_pdf_required:
      "Please upload the approval pdf file",
    customers_approve_form_success:
      DEVELOPMENT_TYPE === "mohajon"
        ? "Introducer approval status updated successfully!"
        : "Agent approval status updated successfully!",

    customer_detail_text_ongoing_plans: "Ongoing",
    customer_detail_text_completed_plans: "Completed",
    customer_detail_text_reward_plans: "Pending",
    customer_detail_text_plan_details: "Plan Details",
    customer_detail_text_transaction_history: "Statement",
    customer_detail_text_plan_amount: "Plan Amount",
    customer_detail_text_plan_mode: "Payment Mode",
    customer_detail_text_plan_valid_from: "Valid From",
    customer_detail_text_plan_valid_to: "Valid To",
    customer_detail_text_paid_till_date: "Paid Till Date",
    customer_detail_text_payment_left: "Amount Due",
    customer_detail_text_no_record: "No record available",

    customer_detail_table_th_payment_date: "Date",
    customer_detail_table_th_payment_description: "Description",
    customer_detail_table_th_payment_cr: "Credit",
    customer_detail_table_th_payment_dr: "Debit",

    customers_new_plan_madal_title: "Add Customer New Plan",
    customers_plan_form_label_plan: "Plan",
    customers_plan_form_ph_plan: "Select plan",
    customers_plan_form_label_activate_date: "Plan Activate From",
    customers_plan_form_ph_activate_date: "Select date",
    customers_plan_form_success: "New Plan added successfully!",

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

    // Plan Track
    planstrack_label_startdate: "Start Date",
    planstrack_label_enddate: "End Date",
    planstrack_validation_select_start_end_date:
      "Please select start and end date!",
    planstrack_validation_start_date_greater_end_date:
      "Start date can not be greater than end date!",
    planstrack_table_th_name: "Name",
    planstrack_table_th_planname: "Plan Name",
    planstrack_table_th_plan_planpaid: "Paid Amount",
    planstrack_table_th_plan_plandue: "Due Amount",
    planstrack_table_th_plan_planamount: "Plan Amount",
    planstrack_table_th_plan_startdate: "Plan Start Date",
    planstrack_table_th_plan_enddate: "Plan Expiry Date",
  },
  it: {
    dashboard: "Dashboard",
  },
});

// module.exports = LocaleStrings;
export default LocaleStrings;
