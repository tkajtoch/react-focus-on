import * as React from 'react';
import { SideCarComponent } from 'use-sidecar';

import { RemoveScroll } from 'react-remove-scroll/UI';
import ReactFocusLock from 'react-focus-lock/UI';

import { EffectProps, ReactFocusOnSideProps, LockProps } from './types';
import { effectCar } from './medium';

export const FocusOn = React.forwardRef<HTMLElement, ReactFocusOnSideProps>(
  (props, parentRef) => {
    const [lockProps, setLockProps] = React.useState<LockProps>(false as any);

    const {
      children,
      autoFocus,
      shards,
      crossFrame,
      enabled = true,
      scrollLock = true,
      focusLock = true,
      returnFocus = true,
      inert,
      allowPinchZoom,
      sideCar,
      className,
      shouldIgnore,
      preventScrollOnFocus,
      style,
      as,
      gapMode,
      ...rest
    } = props;

    const SideCar: SideCarComponent<EffectProps> = sideCar;

    const { onActivation, onDeactivation, ...restProps } = lockProps;

    const appliedLockProps = {
        ...restProps,

        as,
        style,

        sideCar,

        shards,

        allowPinchZoom,
        gapMode,
        inert,

        enabled: enabled && scrollLock,
    } as const;

    return (
      <>
        <ReactFocusLock
          ref={parentRef}
          sideCar={sideCar}
          disabled={!(lockProps && enabled && focusLock)}
          returnFocus={returnFocus}
          autoFocus={autoFocus}
          shards={shards}
          crossFrame={crossFrame}
          onActivation={onActivation}
          onDeactivation={onDeactivation}
          className={className}
          whiteList={shouldIgnore}
          lockProps={appliedLockProps}
          focusOptions={preventScrollOnFocus ? { preventScroll: true } : undefined}
          as={RemoveScroll}
        >
          {children}
        </ReactFocusLock>
        {enabled && (
          <SideCar
            {...rest}
            sideCar={effectCar}
            setLockProps={setLockProps}
            shards={shards}
          />
        )}
      </>
    );
  }
);

export * from './reExports';
