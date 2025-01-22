import React, { useState } from "react";
import { Button, InputNumber, Alert, message } from "antd";
import { userDetail } from "@/api/user";

interface LoginUIDProps {
  onClose: () => void;
  onSaveLogin: (data: any, type: "uid") => void;
}

const LoginUID: React.FC<LoginUIDProps> = ({ onClose, onSaveLogin }) => {
  const [uid, setUid] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!uid) {
      message.warning("请输入 UID");
      return;
    }

    setLoading(true);
    const loadingMsg = message.loading("正在尝试登录", 0); 
    try {
      const result = await userDetail(uid); 
      message.success("登录成功");

      onSaveLogin(result, "uid");
      onClose();
    } catch (error) {
      message.error("登录失败，请重试");
      console.error("UID 登录出错：", error);
    } finally {
      loadingMsg(); // Close the loading message
      setLoading(false);
    }
  };

  return (
    <div className="login-uid">
      <Alert
        message={
          <>
            可前往 <a href="https://music.163.com/" target="_blank" rel="noopener noreferrer">网易云音乐</a>
            官网登录并前往个人中心，即可从地址栏获取到 UID，也可在客户端分享链接中获取 UID。
          </>
        }
        type="info"
        showIcon
      />
      <InputNumber
        value={uid || undefined}
        onChange={(value) => setUid(value as number)}
        placeholder="请输入 UID"
        style={{ width: "100%", marginTop: "20px" }}
      />
      <Button
        type="primary"
        loading={loading}
        onClick={handleLogin}
        style={{ width: "100%", marginTop: "20px" }}
      >
        登录
      </Button>
    </div>
  );
};

export default LoginUID;
