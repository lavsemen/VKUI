import React from 'react';
import { Meta, Story } from '@storybook/react';
import { useAdaptivityConditionalRender } from '../../hooks/useAdaptivityConditionalRender';
import { CanvasFullLayout, DisableCartesianParam } from '../../storybook/constants';
import { AdaptivityProvider, AdaptivityProviderProps } from './AdaptivityProvider';

const story: Meta<AdaptivityProviderProps> = {
  title: 'Service/AdaptivityProvider',
  component: AdaptivityProvider,
  parameters: { ...CanvasFullLayout, ...DisableCartesianParam },
};

export default story;

const DisplayAdaptivityProvider = () => {
  const { sizeX, sizeY } = useAdaptivityConditionalRender();

  return (
    <>
      {sizeX.compact && <div style={{ padding: 5 }}>Size X: Compact</div>}
      {sizeX.regular && <div style={{ padding: 5 }}>Size X: Regular</div>}
      {sizeY.compact && <div style={{ padding: 5 }}>Size Y: Compact</div>}
      {sizeY.regular && <div style={{ padding: 5 }}>Size Y: Regular</div>}
    </>
  );
};

const Template: Story<AdaptivityProviderProps> = (args) => (
  <AdaptivityProvider {...args}>
    <DisplayAdaptivityProvider />
  </AdaptivityProvider>
);

export const Playground = Template.bind({});
Playground.args = {};
