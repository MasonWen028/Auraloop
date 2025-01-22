import React, { useEffect, useRef, useState } from "react";
import { Button, message, Modal, Divider } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "./login.css"; // Replace with appropriate CSS
import LoginUID from "../LoginUID";
import LoginCookie from "../LoginCookie";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "@/utils/auth";
import Tabs from "@/components/Layout/Tabs";
import LoginQRCode from "../LoginQRCode";
import LoginPhone from "../LoginPhone";

const Login = ({visible, onClose }: {visible: boolean; onClose: () => void }) => {
  const { userData } = useSelector((state: any) => state.data)

  const dispatch = useDispatch();

  const [qrPause, setQrPause] = useState(false);

  const { userLoginStatus } = useSelector((state: any) => state.data);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const saveLogin = async (loginData: any, type: "qr" | "phone" | "uid" | "cookie" = "qr") => {
    if (!loginData) return;

    if (loginData.code === 200) {
      onClose();
      message.success("登录成功");

      localStorage.setItem("lastLoginTime", Date.now().toString());

      if (type !== "uid") {
        await updateUserData(loginData.cookie);
      } else {
        //await updateSpecialUserData(loginData?.profile);
      }
    } else {
      message.error(loginData.msg ?? loginData.message ?? "账号或密码错误，请重试");
    }
  };

  const specialLogin = (type: "uid" | "cookie" = "uid") => {
    setQrPause(true);

    const modal = Modal.info({
      title: type === "uid" ? "UID 登录" : "Cookie 登录",
      centered: true,
      content: (
        <>
          {type === "uid" ? (
            <LoginUID
              onClose={() => {
                modal.destroy();
                setQrPause(false);
              }}
              onSaveLogin={saveLogin}
            />
          ) : (
            <LoginCookie
              onClose={() => {
                modal.destroy();
                setQrPause(false);
              }}
              onSaveLogin={saveLogin}
            />
          )}
        </>
      ),
      onCancel: () => {
        setQrPause(false);
        modal.destroy();
      },
    });
  };

  useEffect(() => {
    if (userLoginStatus) {
      message.warning("已登录，请勿再次操作");
      onClose();
    }
  }, [userLoginStatus, onClose]);

  const handleTabChange = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Modal 
      closable={true}
      footer={null} 
      centered 
      title="Login"
      width={640} 
      height={520}  
      className="login" 
      open={visible}>
      {/* Login Methods */}
      <Tabs
        tabs={["Scan", "Phone"]}
        onTabChange={handleTabChange}
      >
        { selectedIndex === 0 && <LoginQRCode pause={qrPause} onSaveLogin={saveLogin} />}
        { selectedIndex === 1 && <LoginPhone onSaveLogin={saveLogin} />}
      </Tabs>
      {/* <Tabs defaultActiveKey="login-qr" className="login-tabs" type="card">
        <Tabs.TabPane tab="扫码登录" key="login-qr">
          <LoginQRCode pause={qrPause} onSaveLogin={saveLogin} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="验证码登录" key="login-phone">
          <LoginPhone onSaveLogin={saveLogin} />
        </Tabs.TabPane>
      </Tabs> */}

      {/* Other Methods */}
      <div className="other">
        <Button type="link" size="small" onClick={() => specialLogin("uid")}>
          UID 登录
        </Button>
        <Divider type="vertical" />
        <Button type="link" size="small" onClick={() => specialLogin("cookie")}>
          Cookie 登录
        </Button>
      </div>
    </Modal>
  );
};

export default Login;
