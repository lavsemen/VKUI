import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import { Platform } from '../../lib/platform';
import { COMMON_WARNINGS, warnOnce } from '../../lib/warnOnce';
import { Tappable, TappableProps } from '../Tappable/Tappable';
import styles from './IconButton.module.css';

const sizeYClassNames = {
  none: styles['IconButton--sizeY-none'],
  [SizeType.COMPACT]: styles['IconButton--sizeY-compact'],
};

export interface IconButtonProps extends TappableProps {
  children?: React.ReactNode;
}

const warn = warnOnce('IconButton');

/**
 * @see https://vkcom.github.io/VKUI/#/IconButton
 */
export const IconButton = ({
  children,
  Component = 'button',
  className,
  ...restProps
}: IconButtonProps) => {
  const platform = usePlatform();
  const { sizeY = 'none' } = useAdaptivity();

  if (process.env.NODE_ENV === 'development') {
    const isAccessible = restProps['aria-label'] || restProps['aria-labelledby'];

    if (!isAccessible) {
      warn(COMMON_WARNINGS.a11y[restProps.href ? 'link-name' : 'button-name'], 'error');
    }
  }

  return (
    <Tappable
      activeEffectDelay={200}
      activeMode="background"
      {...restProps}
      Component={restProps.href ? 'a' : Component}
      className={classNames(
        styles['IconButton'],
        sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY],
        platform === Platform.IOS && styles['IconButton--ios'],
        className,
      )}
    >
      {children}
    </Tappable>
  );
};
