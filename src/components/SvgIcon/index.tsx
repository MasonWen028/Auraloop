import React, { useEffect } from 'react';
import Icon from '@ant-design/icons';
import { GetProps } from 'antd';
export const getSvgByName = async (name: string): Promise<React.FC | null> => {
  try {
    const module = await import(`@/assets/icons/${name}.svg`);
    console.log(module);
    return module.ReactComponent; // Use ReactComponent for inline rendering
  } catch (error) {
    console.error(`Failed to load SVG: ${name}`, error);
    return null;
  }
};


type CustomIconComponentProps = GetProps<typeof Icon>;

const HeartIcon = (props: { name: string } & Partial<CustomIconComponentProps>) => {
  const { name, ...restProps } = props;
  const [SvgComponent, setSvgComponent] = React.useState<React.FC | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      const component = await getSvgByName(name);
      setSvgComponent(() => component);
    };
    loadIcon();
  }, [name]);

  if (!SvgComponent) {
    return <div>Loading...</div>;
  }

  return <Icon component={SvgComponent} {...restProps} />
};

export default HeartIcon;