/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode } from 'react';

/**
 * Minimal mock implementation for @rn-primitives/slot
 * It just renders its children directly.
 */
export const View = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Text = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Pressable = ({ children }: { children?: ReactNode }) => <>{children}</>;
export const Image = ({ children }: { children?: ReactNode }) => <>{children}</>;

export const isTextChildren = (children: unknown): boolean =>
  typeof children === 'string' ||
  (Array.isArray(children) && children.every((c) => typeof c === 'string'));
