import Icon from '@ant-design/icons';
import { GetProps } from 'antd';

const Svg = () => (
  <svg fill="currentColor" /* This makes the SVG inherit the text color */
  width="1em" /* Inherits the font size */
  height="1em" /* Inherits the font size */ viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10446"><path xmlns="http://www.w3.org/2000/svg" d="M606.896 387.536H408c-92.784 0-168 75.216-168 168 0 92.8 75.216 168 168 168h224c87.2 0 158.88-66.416 167.2-151.424l0.16-1.808a16 16 0 0 1 15.936-14.768h17.344a14.832 14.832 0 0 1 14.784 15.904c-8.144 111.872-101.472 200.096-215.424 200.096h-224c-119.296 0-216-96.704-216-216s96.704-216 216-216h194.144l-29.456-29.456a16 16 0 0 1-4.688-11.312v-28.304a14.464 14.464 0 0 1 24.688-10.24l97.824 97.824a11.136 11.136 0 0 1 0 15.744l-97.824 97.808a14.464 14.464 0 0 1-24.688-10.24v-28.288a16 16 0 0 1 4.688-11.312l34.208-34.224z"/></svg>
)

type CustomIconComponentProps = GetProps<typeof Icon>;

const Cycle = (props: Partial<CustomIconComponentProps>) => {

  return <Icon component={Svg} {...props} />
};

export default Cycle;