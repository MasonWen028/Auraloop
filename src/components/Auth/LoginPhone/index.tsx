import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Button, Select, message, Space } from "antd";
import { debounce } from "lodash-es";
import { countryList, sentCaptcha, verifyCaptcha, loginPhone } from "@/api/login";
import './index.css'
import { useDispatch, useSelector } from "react-redux";
import { setCountries } from "@/stores/slices/countryCodeSlice";
import { CountryGroup } from "@/types/main";

const { Option, OptGroup } = Select;

const LoginPhone = ({ onSaveLogin }: { onSaveLogin: (data: any, type: "phone") => void }) => {
  const [form] = Form.useForm();
  const [captchaTime, setCaptchaTime] = useState(60);
  const [captchaText, setCaptchaText] = useState("获取验证码");
  const [captchaDisabled, setCaptchaDisabled] = useState(true);
  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const countries = useSelector((state: any) => state.countries);
  const dispatch = useDispatch();

  const getCountries = async () => {
    if (countries.length < 1) {
      const res = await countryList(); 
      const countryGroups = res.data
      dispatch(setCountries(countryGroups));
    }
  }

  useEffect(() => {
    getCountries();
  }, []);
  

  // Handle sending captcha
  const getCaptcha = async () => {
    try {
      const values = await form.validateFields(["country", "phone"]);
      setCaptchaDisabled(true);
      const result = await sentCaptcha(values.phone, values.country);
      if (result.code === 200) {
        message.success("验证码发送成功");
        startTimer();
      } else {
        message.error(result.message);
        setCaptchaDisabled(false);
      }
    } catch (error) {
      console.error("获取验证码出错：", error);
    }
  };

  // Start countdown timer
  const startTimer = () => {
    setCaptchaTime(60);
    setCaptchaDisabled(true);
    setCaptchaText("60 s");
    intervalRef.current = setInterval(() => {
      setCaptchaTime((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
          }
          setCaptchaText("重新获取");
          setCaptchaDisabled(false);
          return 60;
        }
        setCaptchaText(`${prev - 1} s`);
        return prev - 1;
      });
    }, 1000);
  };

  // Handle login
  const handleLogin = debounce(async () => {
    try {
      const values = await form.validateFields();
      const captchaResult = await verifyCaptcha(values.phone, values.captcha, values.country);
      console.log(captchaResult)
      if (captchaResult.code !== 200) {
        message.error("验证码错误，请重试");
        return;
      }
      const loginResult = await loginPhone(values.phone, values.captcha, values.country);
      if (loginResult.code !== 200) {
        message.error("登录失败，请重试");
        return;
      }
      onSaveLogin(loginResult, "phone");
    } catch (error) {
      console.error("登录出错：", error);
    }
  }, 300);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }
    };
  }, []);

  const [selectedCode, setSelectedCode] = useState<string>("+86");

  const handleChange = (value: string) => {
    setSelectedCode(`+${value}`);
  };

  const handleFormChange = (_changedValues: Partial<Record<string, any>>,
    allValues: Record<string, any>) => {
    const phone = allValues.phone;
    const isValidPhone = /^[0-9]{11}$/.test(phone); 
    setCaptchaDisabled(!isValidPhone); 
  };

  return (
    <div className="login-phone">
      <Form
        form={form} 
        layout="vertical" 
        className="phone-form" 
        onValuesChange={handleFormChange}>
        {/* Country and phone number input */}
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "请输入手机号" },
            { pattern: /^[0-9]{11}$/, message: "请输入有效的手机号" },
          ]}
        >
          <Space.Compact>
            <Select
              value={selectedCode}
              onChange={handleChange}
              defaultValue="+86"
              popupClassName="country-pop"
              popupMatchSelectWidth={160}
              className="phone-selector"
            >
            {countries.map((group: CountryGroup) => (
              <OptGroup key={group.label} label={group.label}>
                {group.countryList.map((country) => (
                  <Option key={country.code} value={country.code}>
                    {country.zh} (+{country.code})
                  </Option>
                ))}
              </OptGroup>
            ))} 
            </Select>
            <Input
              style={{ width: "80%" }}
              placeholder="请输入手机号"
            />
          </Space.Compact>
        </Form.Item>

        {/* Captcha input */}
        <Form.Item
          name="captcha"
          rules={[{ required: true, message: "请输入验证码" }]}
        >
          <Input
            className="phone-number"
            placeholder="验证码"
            suffix={
              <span className={`send-captcha ${captchaDisabled ? 'disabled': ''}`} onClick={captchaDisabled ? undefined : getCaptcha} >
                {captchaText}
              </span>
            }
          />
        </Form.Item>

        {/* Login button */}
        <Form.Item>
          <Button
            type="primary"
            style={{ width: "100%" }}
            onClick={handleLogin}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPhone;
