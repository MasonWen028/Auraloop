import Icon from '@ant-design/icons';
import { GetProps } from 'antd';

const MaxSvg = () => (
  <svg viewBox="64 64 896 896" focusable="false" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="48" aria-hidden="true" width="1em" height="1em">
    <rect x="128" y="128" width="768" height="768" rx="0"></rect>
  </svg>
);

type CustomIconComponentProps = GetProps<typeof Icon>;

const Max = (props: Partial<CustomIconComponentProps>) => {

  return <Icon component={MaxSvg} {...props} />
};

export default Max;