import Icon from '@ant-design/icons';
import { GetProps } from 'antd';

const Svg = () => (
  <svg fill="currentColor" /* This makes the SVG inherit the text color */
  width="1em" /* Inherits the font size */
  height="1em" /* Inherits the font size */ viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10446"><path xmlns="http://www.w3.org/2000/svg" d="M256 768l362.666667-256L256 256v512zM682.666667 256v512h85.333333V256h-85.333333z" p-id="3971"/></svg>
)

type CustomIconComponentProps = GetProps<typeof Icon>;

const Cycle = (props: Partial<CustomIconComponentProps>) => {

  return <Icon component={Svg} {...props} />
};

export default Cycle;