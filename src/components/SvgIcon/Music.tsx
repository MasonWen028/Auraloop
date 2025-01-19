import Icon from '@ant-design/icons';
import { GetProps } from 'antd';

const MusicSvg = () => (
  <svg fill="currentColor" /* This makes the SVG inherit the text color */
  width="1em" /* Inherits the font size */
  height="1em" /* Inherits the font size */ viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7713" stroke="currentColor" ><path d="M444.330667 128.512A64 64 0 0 1 405.333333 210.176a320 320 0 1 0 393.429334 159.658667 64.085333 64.085333 0 0 1 28.8-85.845334 64 64 0 0 1 85.845333 28.842667A446.378667 446.378667 0 0 1 960 512c0 247.424-200.576 448-448 448S64 759.424 64 512c0-195.157333 124.757333-361.002667 298.666667-422.485333a64 64 0 0 1 81.664 38.997333z m89.002666 0.085333a64.426667 64.426667 0 0 1 79.36-62.72l5.461334 1.578667 127.402666 42.496a64 64 0 0 1-34.56 123.093333l-5.888-1.664-43.776-14.592V512l-0.213333 8.192a149.333333 149.333333 0 1 1-134.826667-156.842667l7.04 0.853334V128.597333z"></path></svg>
);

type CustomIconComponentProps = GetProps<typeof Icon>;

const Music = (props: Partial<CustomIconComponentProps>) => {

  return <Icon component={MusicSvg} {...props} />
};

export default Music;