import LocalStrings from '../../languages';


export var BASE_URL = 'http://localhost:3000';
export var APP_API_KEY   = '6879015cf7c0437ce2d118cf5750d8a77dae93e16c61e9fdf1ad18d6cd93622b';

export var itemCount = calculateItemCount();
export var COMMON_FAIL_MESSAGE= LocalStrings.common_fail_message;
export var dateFormat = 'DD/MM/YYYY';
export var dbSaveDateFormat = "YYYY-MM-DD HH:mm:ss";
export var IMAGE_PATH = '../../assets/img/';

export var LABEL_POSITION_TOP = 'TOP';
export var LABEL_POSITION_LEFT = 'LEFT';

function calculateItemCount() {
  //dynamically calcualting number of items to show as per height of the screen
  var height = window.innerHeight - 250; //250 is calculated to deduct extra space used other than just table
  var maxrowheight=50;

  var count=Math.ceil(height/maxrowheight);

  /*if(height<700){
    count=2;
  }else if(height>700){
    count=15;
  }*/
  // console.log("HEIGHT ",height);
  // console.log("ITEM COUNT ",count);

  return count;
}