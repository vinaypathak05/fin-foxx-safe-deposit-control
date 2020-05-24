import React, {Component} from 'react';

export class BaseComponent extends Component {

    validateEmail = ({ get, value, fieldProps, fields, form }) => {
        // console.log('value :- ', value)
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;        
        let check =  (re.test(value));
        return check
    }

    validateDaysNumber = ({ get, value, fieldProps, fields, form }) => {
        // console.log('value :- ', value)
        var re = /^\d+$/;        
        let check =  (re.test(value));
        return check
    }

    validateIntNumber = ({ get, value, fieldProps, fields, form }) => {
        // console.log('value :- ', value)
        var re = /^\d+$/;        
        let check =  (re.test(value));
        return check
    }

    validateOnlyNumber = ({ get, value, fieldProps, fields, form }) => {
        // console.log('value :- ', value)
        let check = !isNaN(value)
        return check
    }
    
    validatePhoneNumber = ({ get, value, fieldProps, fields, form }) => {
        // let re = /^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/
        let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        
        
        // let check = !isNaN(value) && value.length === 10;
        // let check =  value.match(re);
        let check =  (re.test(value));
        return check
    }

    validateOnlyText = ({ get, value, fieldProps, fields, form }) => {        
        let check =  (/^[a-zA-Z0-9- ]*$/.test(value));
        return check
    }

    validateSelectBoxRequired = ({ get, value, fieldProps, fields, form }) => {
        let check =  value != '';
        return check
    }
    validateWebsite = ({ get, value, fieldProps, fields, form }) => {
        if(value != '') {
            let re = /^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)+[a-z]{2,6}$/;        
            let check =  (re.test(value));
            
            return check
        }
    }
    validateAlphaNumeric = ({ get, value, fieldProps, fields, form }) => {
        let re = /^[a-z0-9]+$/i;        
        let check =  (re.test(value));        
        return check
    }
}