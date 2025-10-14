/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { forwardRef, ReactNode } from 'react';

export const Root = forwardRef<any, { children?: ReactNode }>(({ children, ...props }, ref) => (
  <>{children}</>
));
Root.displayName = 'MockCheckboxRoot';

export const Indicator = forwardRef<any, { children?: ReactNode }>(
  ({ children, ...props }, ref) => <>{children}</>
);
Indicator.displayName = 'MockCheckboxIndicator';
