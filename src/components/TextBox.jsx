import React from "react";
import { Input, DatePicker } from "antd";
import dayjs from "dayjs";

const TextBox = ({
  type = "text", // "text" | "date"
  value,
  onChange,
  placeholder = "Enter text",
  disabled = false,
  readOnly = false,
  maxLength,
  disablePastDates = false,
}) => {

  // DATE PICKER MODE
  if (type === "date") {
    return (
      <>
        <DatePicker
          className="datepicker-wrapper"
          value={value ? dayjs(value) : null}
          onChange={(date) => onChange?.(date)}
          disabled={disabled}
          disabledDate={
            disablePastDates
              ? (current) => current && current.isBefore(dayjs().startOf("day"))
              : undefined
          }
          style={{ width: "100%", borderRadius: 8 }}
        />
        <style>
          {`
          .datepicker-wrapper .ant-picker:hover,
          .datepicker-wrapper .ant-picker-focused {
            border-color: transparent !important;
            box-shadow: none !important;
          }

          .datepicker-wrapper .ant-picker {
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
};

export default TextBox;
