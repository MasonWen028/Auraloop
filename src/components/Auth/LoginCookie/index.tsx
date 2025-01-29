import React, { useEffect, useState } from "react";
import { Button, Input, Alert, Modal, message } from "antd";
import SvgIcon from "@/components/SvgIcon";
import { isElectron } from "@/utils/platformDetector";
import './index.css'

interface LoginCookieProps {
  onClose: () => void;
  onSaveLogin: (data: any, type: "cookie") => void;
}

const LoginCookie: React.FC<LoginCookieProps> = ({ onClose, onSaveLogin }) => {
  const [cookie, setCookie] = useState<string>("");

  // Handle Electron-specific behavior
  const openWeb = () => {
    Modal.info({
      title: "使用前告知",
      content: (
        <>
          请知悉，该功能仍旧无法确保账号的安全性！请自行决定是否使用！如遇打开窗口后页面出现白屏或者无法点击等情况，请关闭后再试。
          在登录完成后，请点击菜单栏中的 “登录完成” 按钮以完成登录（ 通常位于窗口的左上角，macOS 位于顶部的全局菜单栏中 ）
        </>
      ),
      onOk: () => {
        if (isElectron && window.electron) {
          window.electron.ipcRenderer.send("open-login-web");
        }
      },
    });
  };

  // Handle Cookie login
  const handleLogin = () => {
    if (!cookie.trim()) {
      message.warning("请输入 Cookie");
      return;
    }

    const trimmedCookie = cookie.trim();

    if (!trimmedCookie.includes("MUSIC_U") || !trimmedCookie.endsWith(";")) {
      message.warning("请输入有效的 Cookie");
      return;
    }

    try {
      message.success("登录成功");
      onSaveLogin(
        {
          code: 200,
          cookie: trimmedCookie,
        },
        "cookie"
      );
      onClose();
    } catch (error) {
      message.error("登录失败，请重试");
      console.error("Cookie 登录出错：", error);
    }
  };

  useEffect(() => {
    if (isElectron && window.electron) {
      window.electron.ipcRenderer.on("send-cookies", (_, value) => {
        if (value) {
          setCookie(value);
          handleLogin();
        }
      });

      return () => {
        window.electron.ipcRenderer.removeAllListeners("send-cookies");
      };
    }
  }, []);

  return (
    <div className="login-cookie">
      <Alert
        message={
          <>
            可在官方的{" "}
            <a href="https://music.163.com/" target="_blank" rel="noopener noreferrer">
              网页端
            </a>{" "}
            或点击下方的自动获取，只需要 Cookie 中的 <code>MUSIC_U</code> 字段即可，例如：{" "}
            <code>MUSIC_U=00C7...;</code>
            <br />
            请注意：必须以 <code>;</code> 结束
          </>
        }
        type="info"
        showIcon
      />
      <Input.TextArea
        value={cookie}
        onChange={(e) => setCookie(e.target.value)}
        rows={4}
        placeholder="请输入 Cookie"
      />
      <div className="menu">

      <Button type="primary" onClick={handleLogin}>
            登录
          </Button>
        {/* {isElectron && (
          <Button type="primary" onClick={openWeb}>
            自动获取
          </Button>
        )}
        {!isElectron && (
          <Button type="primary" onClick={handleLogin}>
            登录
          </Button>
        )} */}
      </div>
    </div>
  );
};

export default LoginCookie;
