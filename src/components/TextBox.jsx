import React from "react";
import { Input, DatePicker, Select } from "antd";
import dayjs from "dayjs";

const TextBox = ({
  type = "text", // "text" | "date" | "select"
  value,
  onChange,
  placeholder = "Enter text",
  disabled = false,
  readOnly = false,
  maxLength,
  disablePastDates = false,
  options = [],
}) => {
  // DATE PICKER MODE
  if (type === "date") {
    return (
      <>
        <DatePicker
          className="datepicker-wrapper"
          value={value ? dayjs(value) : null}
          onChange={(date) => onChange?.(date)}
          // onChange={(date, dateString) => onChange?.(dateString)}
          disabled={disabled}
          disabledDate={
            disablePastDates
              ? (current) => current && current.isBefore(dayjs().startOf("day"))
              : undefined
          }
          style={{ width: "100%", borderRadius: 8, paddingBlock: "7px" }}
        />
        <style>
          {`
    .datepicker-wrapper:hover,
    .datepicker-wrapper.ant-picker-focused {
      border-color: #8787bf !important;
      box-shadow: none !important;
    }

    .datepicker-wrapper {
      box-shadow: none !important;
    }
  `}
        </style>
      </>
    );
  }

  if (type === "select") {
    return (
      <>
        <Select
          className="custom-select"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          options={options}
          style={{
            width: "100%",
            borderRadius: 8,
            paddingBlock: "7px",
          }}
        />

        <style>
          {`
          .custom-select .ant-select-selector {
            border-radius: 8px !important;
            min-height: 40px !important;
            box-shadow: none !important;
          }

          .custom-select:hover .ant-select-selector,
          .custom-select.ant-select-focused .ant-select-selector,
          .custom-select.ant-select-open .ant-select-selector {
            border-color: #8787bf !important;
            box-shadow: none !important;
          }
        `}
        </style>
      </>
    );
  }
  // ================= PASSWORD =================
  if (type === "password") {
    return (
      <>
        <Input.Password
          className="custom-input"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          style={{
            borderRadius: 8,
            backgroundColor: readOnly ? "#f5f5f5" : undefined,
            cursor: readOnly ? "not-allowed" : "text",
            paddingBlock: "7px",
          }}
        />

        <style>
          {`
            .custom-input:hover,
            .custom-input:focus,
            .custom-input.ant-input-focused {
              border-color: #8787bf !important;
              box-shadow: none !important;
            }
          `}
        </style>
      </>
    );
  }

  // TEXT INPUT MODE (default)
  return (
    <>
      <Input
        type={type}
        className="custom-input"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        style={{
          borderRadius: 8,
          backgroundColor: readOnly ? "#f5f5f5" : undefined,
          cursor: readOnly ? "not-allowed" : "text",
          paddingBlock: "7px",
        }}
      />
      <style>
        {`
          .custom-input:hover,
          .custom-input:focus,
          .custom-input.ant-input-focused {
            border-color: #8787bf !important;
            box-shadow: none !important;
          }
        `}
      </style>
    </>
  );
};;

export default TextBox;
