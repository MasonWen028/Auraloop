import Icon from '@ant-design/icons';
import { GetProps } from 'antd';

const Svg = () => (
  <svg fill="currentColor" /* This makes the SVG inherit the text color */
  width="1em" /* Inherits the font size */
  height="1em" /* Inherits the font size */ viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10446"><path xmlns="http://www.w3.org/2000/svg" d="M256 256h85.333333v512H256zM405.333333 512l362.666667 256V256z" p-id="5489"/></svg>
)

type CustomIconComponentProps = GetProps<typeof Icon>;

const Previous = (props: Partial<CustomIconComponentProps>) => {

  return <Icon component={Svg} {...props} />
};

export default Previous;