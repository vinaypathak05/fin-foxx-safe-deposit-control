import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import Select from "react-select";
import DatePicker from "react-datetime";
import {
  LABEL_POSITION_TOP,
  LABEL_POSITION_LEFT,
  DISPLAY_DATE_FORMAT,
} from "./constant";
export class BaseComponent extends Component {
  validateDaysNumber = ({ get, value, fieldProps, fields, form }) => {
    // console.log('value :- ', value)
    var re = /^\d+$/;
    let check = re.test(value);
    return check;
  };

  validateIntNumber = ({ get, value, fieldProps, fields, form }) => {
    // console.log('value :- ', value)
    var re = /^\d+$/;
    let check = re.test(value);
    return check;
  };

  validateOnlyNumber = ({ get, value, fieldProps, fields, form }) => {
    // console.log('value :- ', value)
    let check = !isNaN(value);
    return check;
  };

  validatePhoneNumber = ({ get, value, fieldProps, fields, form }) => {
    // let re = /^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    // let check = !isNaN(value) && value.length === 10;
    // let check =  value.match(re);
    let check = re.test(value);
    return check;
  };

  validateOnlyText = ({ get, value, fieldProps, fields, form }) => {
    let check = /^[a-zA-Z0-9- ]*$/.test(value);
    return check;
  };

  validateSelectBoxRequired = ({ get, value, fieldProps, fields, form }) => {
    let check = value != "";
    return check;
  };

  validateWebsite = ({ get, value, fieldProps, fields, form }) => {
    if (value != "") {
      let re = /^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)+[a-z]{2,6}$/;
      let check = re.test(value);

      return check;
    }
  };

  validateAlphaNumeric = ({ get, value, fieldProps, fields, form }) => {
    let re = /^[a-z0-9]+$/i;
    let check = re.test(value);
    return check;
  };

  validateTime = ({ get, value, fieldProps, fields, form }) => {
    if (value != "") {
      let re = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/i;
      let check = re.test(value);
      return check;
    }
  };

  validateTopic = ({ get, value, fieldProps, fields, form }) => {
    //let re = /^\/\w+\/\w+\/$/;
    let re = /^\w+\/\w+$/g;
    let check = re.test(value);
    return check;
  };

  validateSpecialChars = ({ get, value, fieldProps, fields, form }) => {
    var regex = /^[a-zA-Z0-9\s,]+$/g;
    let check = regex.test(value);
    return check;
  };

  renderFieldText(field) {
    var labelposition = field.labelposition;
    var divClassName = `form-group row ${
      field.meta.touched && field.meta.error ? "has-danger" : ""
    }`;
    var labelClasses = "custom-label col-sm-3";
    var inputClasses = "col-sm-9 col-sm-offset-0";

    if (labelposition === LABEL_POSITION_TOP) {
      labelClasses = "custom-label col-sm-12";
      inputClasses = "col-sm-12 col-sm-offset-0";
    }

    return (
      <div className={divClassName}>
        <label className={labelClasses}>
          {field.label}
          <span>{field.mandatory === "true" ? "*" : ""}</span>
        </label>

        <div className={inputClasses}>
          {field.type === "password" ? (
            <input
              className="form-control"
              type={field.type}
              placeholder={field.placeholder}
              {...field.input}
              maxLength={field.maxlength ? field.maxlength : ""}
              autoComplete="new-password"
            />
          ) : (
            <input
              className="form-control"
              type={field.type}
              placeholder={field.placeholder}
              {...field.input}
              maxLength={field.maxlength ? field.maxlength : ""}
              disabled={field.disabled ? true : false}
            />
          )}
          <div className="text-help label-text-help">
            {field.meta.touched ? field.meta.error : ""}
          </div>
        </div>
      </div>
    );
  }

  renderHiddenFieldText(field) {
    var divClassName = `form-group row`;
    var inputClasses = "col-sm-12 col-sm-offset-0";

    return (
      <div className={divClassName} style={{ display: "none" }}>
        <div className={inputClasses}>
          <input className="form-control" type={field.type} {...field.input} />
        </div>
      </div>
    );
  }

  renderHiddenFieldTextShowError(field) {
    var divClassName = `form-group row`;
    var inputClasses = "col-sm-12 col-sm-offset-0";

    return (
      <>
        <div className={divClassName} style={{ display: "none" }}>
          <div className={inputClasses}>
            <input
              className="form-control"
              type={field.type}
              {...field.input}
            />
          </div>
        </div>
        <div className="form-group text-help label-text-help">
          {field.meta.error ? field.meta.error : ""}
        </div>
      </>
    );
  }

  renderFieldTextarea(field) {
    var { labelposition } = field;
    var divClassName = `form-group row ${
      field.meta.touched && field.meta.error ? "has-danger" : ""
    }`;
    var labelClasses = "custom-label col-sm-3";
    var inputClasses = "col-sm-9 col-sm-offset-0";

    if (labelposition === LABEL_POSITION_TOP) {
      labelClasses = "custom-label col-sm-12";
      inputClasses = "col-sm-12 col-sm-offset-0";
    }

    return (
      <div className={divClassName}>
        <label className={labelClasses}>
          {field.label}
          <span>{field.mandatory === "true" ? "*" : ""}</span>
        </label>
        <div className={inputClasses}>
          <textarea
            className="form-control"
            placeholder={field.placeholder}
            {...field.input}
            maxLength={field.maxlength ? field.maxlength : ""}
            rows={field.rows ? field.rows : ""}
            disabled={field.disabled ? true : false}
          ></textarea>
          <div className="text-help label-text-help">
            {field.meta.touched ? field.meta.error : ""}
          </div>
        </div>
      </div>
    );
  }

  renderFieldSelect(field) {
    var { labelposition, label } = field;
    var divClassName = `form-group row ${
      field.meta.touched && field.meta.error ? "has-danger" : ""
    }`;

    var labelClasses = "custom-label col-sm-3";
    var inputClasses = "col-sm-9 col-sm-offset-0";

    if (labelposition === LABEL_POSITION_TOP) {
      labelClasses = "custom-label col-sm-12";
      inputClasses = "col-sm-12 col-sm-offset-0";
    }

    return (
      <div className={divClassName}>
        <label className={labelClasses}>
          {field.label}
          <span>{field.mandatory === "true" ? "*" : ""}</span>
        </label>

        <div className={inputClasses}>
          <select
            className="form-control"
            {...field.input}
            disabled={field.disabled ? true : false}
          >
            <option value="" key="key_selectbox">
              {field.placeholder}
            </option>
            {field.opts.map((object, index) => {
              return (
                <option key={`${object.value}-${index}`} value={object.value}>
                  {object.label}
                </option>
              );
            })}
          </select>
          <div className="text-help label-text-help">
            {field.meta.touched ? field.meta.error : ""}
          </div>
        </div>
      </div>
    );
  }

  renderFieldMultipleCheckbox(field) {
    let { labelposition, label, opts, input, disabled, meta } = field;
    var divClassName = `form-group row ${
      meta.touched && meta.error ? "has-danger" : ""
    }`;

    var labelClasses = "custom-label col-sm-3";
    var inputClasses = "col-sm-9 col-sm-offset-0";

    if (labelposition === LABEL_POSITION_TOP) {
      labelClasses = "custom-label col-sm-12";
      inputClasses = "col-sm-12 col-sm-offset-0";
    }

    let style = { marginBottom: 5 };
    if (disabled == true) {
      style = { marginBottom: 5, cursor: "no-drop" };
    }

    return (
      <div className={divClassName}>
        <label className={labelClasses}>
          {label}
          <span>{field.mandatory === "true" ? "*" : ""}</span>
        </label>

        <div className={inputClasses}>
          {opts.map((option, index) => {
            return (
              <div key={index}>
                <label className="custom-container-checkbox" style={style}>
                  {option.text}
                  <input
                    type="checkbox"
                    name={`${input.name}[${index}]`}
                    value={option.value}
                    checked={input.value.indexOf(option.value) !== -1}
                    disabled={disabled ? true : false}
                    onChange={(event) => {
                      const newValue = [...input.value];
                      if (event.target.checked) {
                        newValue.push(option.value);
                      } else {
                        newValue.splice(newValue.indexOf(option.value), 1);
                      }
                      return input.onChange(newValue);
                    }}
                  />
                  <span className="checkmark" />
                </label>
              </div>
            );
          })}
          <div className="text-help label-text-help">
            {meta.touched ? meta.error : ""}
          </div>
        </div>
      </div>
    );
  }

  renderFieldRadio(field) {
    return (
      <div style={{ marginRight: 10 }}>
        <label
          className="custom-container-radio liveqa-label"
          style={{ marginBottom: 5 }}
        >
          {field.label}
          <input {...field.input} type={field.type} />
          <span className="radiomark"></span>
        </label>
      </div>
    );
  }

  renderAutoComplete(field) {
    let { labelposition, label, input, disabled } = field;
    var defaultVal = input.value;
    var selected = [];

    // Logic to set default value if any.
    if (defaultVal && !_.isEmpty(defaultVal)) {
      if (
        Array.isArray(defaultVal) ||
        defaultVal instanceof Object ||
        typeof defaultVal === "object"
      ) {
        selected = defaultVal;
      } else {
        var values = defaultVal.toString().split(",");

        values.forEach((item) => {
          var added = _.filter(field.options, (obj) => {
            return obj.value == item;
          });
          selected.push(added[0]);
        });
      }
    }
    var divClassName = `form-group row ${
      field.meta.touched && field.meta.error ? "has-danger" : ""
    }`;

    var labelClasses = "custom-label col-sm-3";
    var inputClasses = "col-sm-9 col-sm-offset-0";

    if (labelposition === LABEL_POSITION_TOP) {
      labelClasses = "custom-label col-sm-12";
      inputClasses = "col-sm-12 col-sm-offset-0";
    }

    return (
      <div className={divClassName}>
        <label className={labelClasses}>
          {label}
          <span>{field.mandatory === "true" ? "*" : ""}</span>
        </label>

        <div className={inputClasses}>
          <Select
            {...field.input}
            placeholder={field.placeholder}
            isMulti={field.multiple ? true : false}
            isClearable={field.isClearable ? true : false}
            // value={field.input.value || ''}
            value={selected}
            valueKey={field.valueKey}
            labelKey={field.labelKey}
            options={field.options}
            onBlur={() => field.input.onBlur(field.input.value)}
            isDisabled={disabled ? true : false}
          />
          <div className="text-help label-text-help">
            {field.meta.touched ? field.meta.error : ""}
          </div>
        </div>
      </div>
    );
  }

  renderDatePicker(field) {
    // console.log("field :- ", field);
    var {
      input,
      selected,
      disabled,
      label,
      labelposition,
      isHidePastDate,
      meta,
    } = field;

    var value = input.value
      ? moment(input.value).format(DISPLAY_DATE_FORMAT)
      : selected
      ? moment(selected).format(DISPLAY_DATE_FORMAT)
      : null;

    var divClassName = `form-group row ${
      meta.touched && meta.error ? "has-danger" : ""
    }`;
    var labelClasses = "custom-label col-sm-3";
    var inputClasses = "col-sm-9 col-sm-offset-0";

    if (labelposition === LABEL_POSITION_TOP) {
      labelClasses = "custom-label col-sm-12";
      inputClasses = "col-sm-12 col-sm-offset-0";
    }

    return (
      <div className={divClassName}>
        {label !== "" ? (
          <label className={labelClasses}>
            {label}
            <span className="label-mandatory">
              {field.mandatory === "true" ? "*" : ""}
            </span>
          </label>
        ) : null}

        <div className={inputClasses}>
          <DatePicker
            className=""
            name={input.name}
            {...input}
            inputProps={{ placeholder: field.placeholder }}
            value={value}
            dateFormat={DISPLAY_DATE_FORMAT}
            disabled={disabled}
            timeFormat={false}
            closeOnSelect={field.closeonselect ? true : false}
            isValidDate={isHidePastDate === "true" ? valid : null}
          />
          <div className="text-help label-text-help">
            {meta.touched ? meta.error : ""}
          </div>
        </div>
      </div>
    );
  }
}

var yesterday = moment().subtract(1, "day");
function valid(current) {
  return current.isAfter(yesterday);
}
