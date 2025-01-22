import React, { useEffect, useState } from "react";
import { message, Skeleton, Typography } from "antd";
import { QRCodeCanvas  }  from "qrcode.react";
import { qrKey, checkQr } from "@/api/login";
import { useInterval } from "@/hooks/useInterval"; // Replace with your custom hook for intervals
import "./index.css";
import qrlogin from '@/assets/images/qrlogin.jpg';

const { Text } = Typography;

interface LoginQRCodeProps {
  pause?: boolean;
  onSaveLogin: (data: any, type: "qr") => void;
}

const qrCodeTip = {
  800: "QR code expired, retrying shortly",
  801: "Please open the Cloud Music app to scan the code",
  802: "Scan successful, please confirm login in the app",
  803: "Login successful",
} as const;


const LoginQRCode: React.FC<LoginQRCodeProps> = ({ pause = false, onSaveLogin }) => {
  const [qrImg, setQrImg] = useState<string>("");
  const [qrUnikey, setQrUnikey] = useState<string>("");
  const [qrStatusCode, setQrStatusCode] = useState<keyof typeof qrCodeTip>(801);
  const [loginName, setLoginName] = useState<string>("");
  const [loginAvatar, setLoginAvatar] = useState<string>("");

  const qrTipText = qrCodeTip[qrStatusCode] || "遇到未知状态，请重试";

  // Fetch QR data
  const getQrData = async () => {
    try {
      pauseCheck();
      setQrStatusCode(801);
      setLoginName("");
      setLoginAvatar("");
      const res = await qrKey();
      setQrImg(`https://music.163.com/login?codekey=${res.unikey}`);
      setQrUnikey(res.unikey);

      resumeCheck();
    } catch (error) {
      pauseCheck();
      console.error("二维码获取失败：", error);
    }
  };

  // Check QR Code Status
  const checkQrStatus = async () => {
    if (!qrUnikey || pause) return;

    try {
      const { code, cookie, nickname, avatarUrl } = await checkQr(qrUnikey);
      switch (code) {
        case 800: // QR code expired
          setQrStatusCode(800);
          getQrData();
          break;
        case 801: // Waiting for scan
          setQrStatusCode(801);
          break;
        case 802: // Scanned
          setQrStatusCode(802);
          setLoginName(nickname);
          setLoginAvatar(avatarUrl);
          break;
        case 803: // Login successful
          setQrStatusCode(803);
          pauseCheck();
          if (cookie?.includes("MUSIC_U")) {
            onSaveLogin({ code: 200, cookie }, "qr");
          } else {
            message.error("登录出错，请重试");
            getQrData();
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("检查二维码状态出错：", error);
    }
  };

  const { pause: pauseCheck, resume: resumeCheck } = useInterval(checkQrStatus, 1000, false);

  useEffect(() => {
    getQrData();
    return () => pauseCheck();
  }, []);

  return (
    <div className="login-qrcode">
      <div className="qr-login-container">
        <div className="info-text">
          <span>Sync benefits   ·   Smarter recommendations   ·   Enjoy your playlist</span>
        </div>
        <div className="content">
          <div className="preview-section">
            <img src={qrlogin} alt="播放器点击搜索" />
            <div className="qr-section">
            <div className="qr-code">
                <div className={`qr`}>
                  {qrImg ? (
                    <QRCodeCanvas value={qrImg} size={188} level="H" />
                    ) : (
                      <div></div>
                    // <Skeleton.Avatar active size={188} shape="square"/>
                  )}
                  
                  <Text>{qrTipText}</Text>
                </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginQRCode;
