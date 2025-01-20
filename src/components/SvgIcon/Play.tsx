import Icon from '@ant-design/icons';
import { GetProps } from 'antd';

const Svg = () => (
  <svg fill="currentColor" /* This makes the SVG inherit the text color */
  width="1em" /* Inherits the font size */
  height="1em" /* Inherits the font size */ viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10446"><path xmlns="http://www.w3.org/2000/svg" d="M341.333333 213.333333v597.333334l469.333334-298.666667z" p-id="5805"/></svg>
)

type CustomIconComponentProps = GetProps<typeof Icon>;

const Play = (props: Partial<CustomIconComponentProps>) => {

  return <Icon component={Svg} {...props} />
};

export default Play;