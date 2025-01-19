import Icon from '@ant-design/icons';
import { GetProps } from 'antd';

const Svg = () => (
  <svg fill="currentColor" /* This makes the SVG inherit the text color */
  width="1em" /* Inherits the font size */
  height="1em" /* Inherits the font size */ viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path xmlns="http://www.w3.org/2000/svg" d="M321.488 546.992a33.488 33.488 0 1 1 0-66.992 33.488 33.488 0 0 1 0 66.992z m194.784 0a33.488 33.488 0 1 1 0-66.992 33.488 33.488 0 0 1 0 66.992z m194.784 0a33.488 33.488 0 1 1 0-66.992 33.488 33.488 0 0 1 0 66.992z"/></svg>
)

type CustomIconComponentProps = GetProps<typeof Icon>;

const More = (props: Partial<CustomIconComponentProps>) => {

  return <Icon component={Svg} {...props} />
};

export default More;