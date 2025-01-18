import Icon from '@ant-design/icons';
import { GetProps } from 'antd';

const RestoreSvg = () => (
  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4215" width="48" height="48"><path d="M795.5 230.6v727.2H64V230.6h731.5z m-82.2 78H146.2V880h567V308.6zM228.5 66.2H960v731.5H795.5v-82.2h82.2V148.4h-567v82.2h-82.2V66.2z" p-id="4216"></path></svg>
);

type CustomIconComponentProps = GetProps<typeof Icon>;

const RestoreIcon = (props: Partial<CustomIconComponentProps>) => {

  return <Icon component={RestoreSvg} {...props} />
};

export default RestoreIcon;