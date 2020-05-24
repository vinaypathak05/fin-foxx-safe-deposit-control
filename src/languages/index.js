import LocalizedStrings from 'react-localization';
import { totalmem } from 'os';

const LocaleStrings = new LocalizedStrings({
    en:{
        common_fail_message: 'Something went wrong!',
        search: 'Search',
        total: 'Total',
        no_record: 'No Record to display',
        days: 'day(s)',

        // Menu 
        dashboard: 'Dashboard',
        agents: 'Agents',
        users: 'Users',
        userDetails: 'UsersDetails',
        memberships: 'Memberships',
        transactions: 'Transactions',
        notifications: 'Notifications',
        reports: 'Reports',
        settings: 'Global Settings',

        //Buttons
        button_signin: 'Sign in',
        button_add_new: 'Add New',
        button_edit: 'Edit',
        button_delete: 'Delete',
        button_update: 'Update',
        button_activate: 'Activate',
        button_deactivate: 'Deactivate',
        button_save: 'Save',
        button_close: 'Close',
        button_set_password: 'Set Password',
        button_show_details: 'Show Details',
        button_hide_details: 'Hide Details',
        button_add_more: 'Add More',
        button_pay: 'Pay',
        button_view: 'View',
        button_mark_paid: 'Mark as paid',
        button_logout: 'Logout',
        button_ok: 'Ok',

        //Login
        welcome: 'Welcome',
        welcome_text_sub: 'Login to manage your admin panel',
        login_to: 'Login to Fin-Foxx',
        login_form_ph_email: 'Email',
        login_text_invalid_password: 'Invalid password',
        login_form_label_pass: 'Password',
        login_form_ph_pass: 'Enter password',
        login_form_validation_login_fail: 'Incorrect email or password!',
        login_form_validation_invalid_credential: 'Invalid credential!',

        // Agents
        agents_table_th_name: 'Name',
        agents_table_th_email: 'Email',
        agents_table_th_mobile: 'Mobile',
        agents_table_th_approvalstatus: 'Approval Status',
        agents_madal_title_add: 'Add New Agent',
        agents_madal_title_edit: 'Update Agent',
    },
    it: {
        dashboard: 'Dashboard',
    }
});

// module.exports = LocaleStrings;
export default LocaleStrings;