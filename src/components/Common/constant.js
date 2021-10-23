import moment from "moment";
import LocalStrings from "../../languages";
// export const DEVELOPMENT_TYPE = "payinsure";
export const DEVELOPMENT_TYPE = "mohajon";

export var BASE_URL =
  DEVELOPMENT_TYPE === "mohajon"
    ? "https://payinsure.in/mohabackendci"
    : "https://payinsure.in/backendci";

// export var BASE_URL = "https://payinsure.in/backendci"; // Prod
// export var BASE_URL = "https://payinsure.in/backendci_dev"; // Dev
export var IMAGE_PATH = "../../assets/img/";
export var BASE_IMAGES_URL = `${BASE_URL}`;

export var itemCount = calculateItemCount();
export var COMMON_FAIL_MESSAGE = LocalStrings.common_fail_message;
export var dbSaveDateFormat = "YYYY-MM-DD HH:mm:ss";

export var LABEL_POSITION_TOP = "TOP";
export var LABEL_POSITION_LEFT = "LEFT";
export var AGENT_INSENTIVE = 5;
export var AGENT_SECURITY_AMOUNT = 500;
export var AGENT_FIRST_RECHARGE = 550;
export var DISPLAY_DATE_FORMAT = "DD-MM-YYYY";
export var DB_DATE_FORMAT = "YYYY-MM-DD";

function calculateItemCount() {
  //dynamically calcualting number of items to show as per height of the screen
  var height = window.innerHeight - 250; //250 is calculated to deduct extra space used other than just table
  var maxrowheight = 50;

  var count = Math.ceil(height / maxrowheight);

  /*if(height<700){
    count=2;
  }else if(height>700){
    count=15;
  }*/
  // console.log("HEIGHT ",height);
  // console.log("ITEM COUNT ",count);

  return count;
}

export function converDateIntoGMT(date) {
  return moment.utc(date).format("YYYY-MM-DD HH:mm:ss");
}

export function converDateIntoLocal(date) {
  var stillUtc = moment.utc(date).toDate();
  var local = moment(stillUtc).local().format("DD-MM-YYYY HH:mm:ss");
  return local;
}

export function converDateIntoLocalDate(date) {
  var stillUtc = moment.utc(date).toDate();
  var local = moment(stillUtc).local().format("DD-MM-YYYY");
  return local;
}

export function validateEmail(email) {
  // console.log('value :- ', value)
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
  let check = re.test(email);
  return check;
}

export function validatePhoneNumbers(value) {
  let re = /^[\+]?[(]?[0-9]{2,5}[)]?[-\s\.]?[0-9]{2,5}[-\s\.]?[0-9]{2,5}[-\s\.]?[0-9]{4,6}$/im;
  // let re = /^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/
  return re.test(value);
}

export function validateAadhaarNumber(value) {
  // console.log("value :- ", value);
  var re = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;
  let check = re.test(value);
  return check;
}
