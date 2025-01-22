import { RuleObject } from "antd/es/form";

export const textRule: RuleObject = {
  required: true,
  message: "请填写必要信息",
  //trigger: "blur", // Ant Design doesn't use 'trigger' directly; events are handled automatically.
};

export const numberRule: RuleObject = {
  required: true,
  type: "number",
  message: "请输入数字",
  // Note: Ant Design handles input and blur events automatically for most types
};

export const emailRule: RuleObject = {
  required: true,
  message: "请输入正确的邮箱",
  validator: (_: RuleObject, value: any) => {
    if (!value) {
      return Promise.reject(new Error("请输入电子邮箱"));
    }
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      )
    ) {
      return Promise.reject(new Error("请输入正确的电子邮箱"));
    }
    return Promise.resolve();
  },
};

export const phoneRule: RuleObject = {
  required: true,
  validator: (_: RuleObject, value: any) => {
    if (!value) {
      return Promise.reject(new Error("请输入手机号"));
    }
    if (
      !/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(value)
    ) {
      return Promise.reject(new Error("请输入正确的手机号"));
    }
    return Promise.resolve();
  },
};
