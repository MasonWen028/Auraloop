import React, { useState } from 'react';
import { Dropdown, Avatar, MenuProps, Badge, Modal } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  CrownOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Provider, useSelector } from 'react-redux';
import Login from '@/components/Auth/Login';
import store from '@/stores';



const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        My Profile
      </a>
    ),
    icon: <UserOutlined />,
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        Settings
      </a>
    ),
    icon: <SettingOutlined />,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        Membership
      </a>
    ),
    icon: <CrownOutlined />,
  },
  {
    key: '4',
    danger: true,
    label: 'Log Out',
    icon: <LogoutOutlined />,
  },
];

const ProfileDropdown: React.FC = () => {

  const { userLoginStatus } = useSelector((state: any) => state.data);

  const [isLoginUiShown, setIsLoginUIShown] = useState(false);

  const openUserLogin = () => {
    setIsLoginUIShown(true);
  };

  const loginUIClosed = () => {

  }

  const styles = {
    nonLogin: {
      width: 75,
      borderRadius: 20,
      backgroundColor: 'rgb(255,255,255,0.3)',
      color: 'white',
      height: 32,
      display: 'flex',
      justifyContent: 'center',
      gap: 3,
      alignItems: 'center',
      WebkitAppRegion: "no-drag",
    },
    icon: {
      fontSize: 18
    }
  }

  return (
    <>
      { userLoginStatus && <Dropdown overlayClassName="custom-dropdown-menu" menu={{items}} trigger={['click']} placement="bottomRight">
        <Badge dot style={{marginRight: 8}}>
          <Avatar
              src="http://p1.music.126.net/AWiaSRiMztcJt7Y6_Hi25A==/7874702278826849.jpg?param=180y180"
              size="default"
              style={{ cursor: 'pointer', WebkitAppRegion: 'no-drag' }}
            />
        </Badge>
      </Dropdown> }
      {
        !userLoginStatus && 
        <div style={styles.nonLogin} onClick={openUserLogin}>
          Login <UserOutlined style={styles.icon}></UserOutlined>
        </div>
      }
      <Login visible={isLoginUiShown} onClose={loginUIClosed}/>
    </>
  );
};

export default ProfileDropdown;
