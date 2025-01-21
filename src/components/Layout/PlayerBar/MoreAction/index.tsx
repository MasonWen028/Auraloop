import More from "@/components/SvgIcon/More";
import { InfoCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import './index.css'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        Song Feedback
      </a>
    ),
    icon: <InfoCircleOutlined />,
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        Report Song
      </a>
    ),
    icon: <WarningOutlined />,
  }
];

const MoreAction: React.FC = () => {
  return (<>
    <Dropdown overlayClassName="custom-dropdown-menu" menu={{items}} trigger={['click']} placement="bottomRight">
      <More className="action-btn"/>
    </Dropdown>
  </>)
}

export default MoreAction;