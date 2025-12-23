import { clsx, type ClassValue } from 'clsx';
import type { LucideIcon } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { PressableStateCallbackType } from 'react-native';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names
 * @param inputs - The class names to merge
 * @returns The merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Check if the children is a string or an array of strings
 * @param children - The children to check
 * @returns True if the children is a string or an array of strings, false otherwise
 */
export function isTextChildren(
  children: React.ReactNode | ((state: PressableStateCallbackType) => React.ReactNode)
) {
  return Array.isArray(children)
    ? children.every((child) => typeof child === 'string')
    : typeof children === 'string';
}

/**
 * This is a hack to fix the type error in the lucide-react-native library
 * @see https://github.com/lucide-icons/lucide/issues/2450
 */
export function iconWithClassName(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true
      }
    }
  });
}

/**
 * Format form errors for display in an alert
 * @param errors - The errors to format
 * @returns The formatted errors
 */
export function formatFormErrors<T extends FieldValues>(errors: FieldErrors<T>) {
  return Object.entries(errors)
    .map(([_key, value]) => `* ${value?.message}`)
    .join('\n');
}
