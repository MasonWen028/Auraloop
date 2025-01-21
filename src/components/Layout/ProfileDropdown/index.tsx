import React from 'react';
import { Dropdown, Avatar, MenuProps, Badge } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  CrownOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

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
  return (
    <Dropdown overlayClassName="custom-dropdown-menu" menu={{items}} trigger={['click']} placement="bottomRight">
      <Badge dot style={{marginRight: 8}}>
        <Avatar
            src="http://p1.music.126.net/AWiaSRiMztcJt7Y6_Hi25A==/7874702278826849.jpg?param=180y180"
            size="default"
            style={{ cursor: 'pointer', WebkitAppRegion: 'no-drag' }}
          />
      </Badge>
    </Dropdown>
  );
};

export default ProfileDropdown;
