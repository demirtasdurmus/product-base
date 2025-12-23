/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { forwardRef, ReactNode } from 'react';

export type RootRef = any;
export type RootProps = {
  children?: ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  [key: string]: any;
};

export const Root = forwardRef<RootRef, RootProps>(({ children, ...props }, ref) => (
  <>{children}</>
));
Root.displayName = 'MockSeparatorRoot';
