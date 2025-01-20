import Icon from '@ant-design/icons';
import { GetProps } from 'antd';

const Svg = () => (
  <svg fill="currentColor" /* This makes the SVG inherit the text color */
  width="1em" /* Inherits the font size */
  height="1em" /* Inherits the font size */ viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10446"><path xmlns="http://www.w3.org/2000/svg" d="M256 810.666667h170.666667V213.333333H256v597.333334z m341.333333-597.333334v597.333334h170.666667V213.333333h-170.666667z" p-id="5647"/></svg>
)

type CustomIconComponentProps = GetProps<typeof Icon>;

const Pause = (props: Partial<CustomIconComponentProps>) => {

  return <Icon component={Svg} {...props} />
};

export default Pause;