import Icon from '@ant-design/icons';
import { GetProps } from 'antd';

const Svg = () => (
  <svg fill="currentColor" width="1em" height="1em" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <rect x="200" y="350" width="100" height="300" rx="10" />
  <rect x="450" y="200" width="100" height="600" rx="10" />
  <rect x="700" y="350" width="100" height="300" rx="10" />
</svg>
)

type CustomIconComponentProps = GetProps<typeof Icon>;

const Pausing = (props: Partial<CustomIconComponentProps>) => {

  return <Icon component={Svg} {...props} />
};

export default Pausing;