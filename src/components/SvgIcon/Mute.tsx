import Icon from '@ant-design/icons';
import { GetProps } from 'antd';

const Svg = () => (
  <svg fill="currentColor" /* This makes the SVG inherit the text color */
  width="1em" /* Inherits the font size */
  height="1em" /* Inherits the font size */ viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path xmlns="http://www.w3.org/2000/svg" d="M240 601.392h91.248a16 16 0 0 1 10.416 3.856L528 765.168V261.568l-186.688 159.968a16 16 0 0 1-10.4 3.84H240v176z m-48 32v-240a16 16 0 0 1 16-16h111.072L549.584 179.84A16 16 0 0 1 576 192v642.8a16 16 0 0 1-26.416 12.144L319.392 649.392H208a16 16 0 0 1-16-16z m528-155.328l62.24-62.24a16 16 0 0 1 22.608 0l11.312 11.328a16 16 0 0 1 0 22.624L753.936 512l62.24 62.24a16 16 0 0 1 0 22.608l-11.328 11.312a16 16 0 0 1-22.624 0L720 545.936l-62.24 62.24a16 16 0 0 1-22.608 0l-11.312-11.328a16 16 0 0 1 0-22.624L686.064 512l-62.24-62.24a16 16 0 0 1 0-22.608l11.328-11.312a16 16 0 0 1 22.624 0L720 478.064z"/></svg>
)

type CustomIconComponentProps = GetProps<typeof Icon>;

const Mute = (props: Partial<CustomIconComponentProps>) => {

  return <Icon component={Svg} {...props} />
};

export default Mute;