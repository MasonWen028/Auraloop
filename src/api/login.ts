import request from "@/utils/request";

// 生成二维码 key
export const qrKey = () => {
  return request({
    url: "/login/qrkey",
    params: {
      noCookie: true
    },
  });
};

// 生成二维码
export const qrCreate = (key: string, qrimg: boolean = true) => {
  return request({
    url: "/login/qr/create",
    params: {
      key,
      qrimg,
      noCookie: true
    },
  });
};

// 检查二维码状态
export const checkQr = (key: string) => {
  return request({
    url: "/login/qrcheck",
    params: {
      key,
      noCookie: true
    },
  });
};

// 手机号登录
export const loginPhone = (phone: number, captcha: number, ctcode: number = 86) => {
  return request({
    url: "/login/cellphone",
    params: {
      phone,
      captcha,
      ctcode,
      noCookie: true
    },
  });
};

// 发送验证码
export const sentCaptcha = (phone: number, ctcode: number = 86) => {
  return request({
    url: "/captcha/sent",
    params: {
      phone,
      ctcode,
      noCookie: true
    },
  });
};

// 验证验证码是否正确
export const verifyCaptcha = (phone: number, captcha: number, ctcode: number = 86) => {
  return request({
    url: "/captcha/verify",
    params: {
      phone,
      captcha,
      ctcode
    },
  });
};

// 获取登录状态
export const getLoginState = () => {
  return request({
    url: "/login/status",
    params: {
      timestamp: Date.now(),
    },
  });
};

// 刷新登录
export const refreshLogin = () => {
  return request({
    url: "/login/refresh",
    params: {
      timestamp: Date.now(),
    },
  });
};

// 退出登录
export const logout = () => {
  return request({
    url: "/logout",
    params: {
      timestamp: Date.now(),
    },
  });
};

// 国家码列表
export const countryList = () => {
  return request({
    url: "/countries/codelist",
  });
};
