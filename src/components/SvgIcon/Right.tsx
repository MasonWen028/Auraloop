import Icon from '@ant-design/icons';
import { GetProps } from 'antd';

const Svg = () => (
  <svg fill="currentColor" /* This makes the SVG inherit the text color */
  width="1em" /* Inherits the font size */
  height="1em" /* Inherits the font size */ viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10446"><path xmlns="http://www.w3.org/2000/svg" d="M128 156.16h768v71.68h-768v-71.68zM128 369.5104h490.6496v71.68H128v-71.68zM128 582.8096h490.6496v71.68H128v-71.68zM845.312 512l-81.3056-81.3056 50.688-50.688L946.688 512l-131.9936 132.0448-50.688-50.688L845.312 512zM128 796.16h768v71.68h-768v-71.68z" p-id="14222"/></svg>
)

type CustomIconComponentProps = GetProps<typeof Icon>;

const Right = (props: Partial<CustomIconComponentProps>) => {

  return <Icon component={Svg} {...props} />
};

export default Right;