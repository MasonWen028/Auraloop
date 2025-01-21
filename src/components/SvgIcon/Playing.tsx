import Icon from '@ant-design/icons';
import { GetProps } from 'antd';

const Svg = () => (
  <svg fill="currentColor" /* This makes the SVG inherit the text color */
  width="1em" /* Inherits the font size */
  height="1em" /* Inherits the font size */ viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10446"><rect x="171" y="299" width="128" height="426" fill="currentColor">
  <animate attributeName="y" values="299; 213; 299" dur="1s" repeatCount="indefinite"></animate>
  <animate attributeName="height" values="426; 598; 426" dur="1s" repeatCount="indefinite"></animate>
</rect>
<rect x="427" y="299" width="128" height="426" fill="currentColor">
  <animate attributeName="y" values="299; 128; 299" dur="1s" repeatCount="indefinite" begin="0.2s"></animate>
  <animate attributeName="height" values="426; 768; 426" dur="1s" repeatCount="indefinite" begin="0.2s"></animate>
</rect>
<rect x="683" y="299" width="128" height="426" fill="currentColor">
  <animate attributeName="y" values="299; 213; 299" dur="1s" repeatCount="indefinite" begin="0.4s"></animate>
  <animate attributeName="height" values="426; 598; 426" dur="1s" repeatCount="indefinite" begin="0.4s"></animate>
</rect></svg>
)

type CustomIconComponentProps = GetProps<typeof Icon>;

const Playing = (props: Partial<CustomIconComponentProps>) => {

  return <Icon component={Svg} {...props} />
};

export default Playing;