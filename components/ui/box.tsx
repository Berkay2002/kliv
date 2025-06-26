import { cn } from "@/lib/utils";
import { forwardRef, ComponentProps, ElementType } from 'react';

type BoxProps<T extends ElementType = 'div'> = {
  as?: T;
  sx?: Record<string, string | number>;
} & Omit<ComponentProps<T>, 'as' | 'sx'>;

const Box = forwardRef<HTMLElement, BoxProps>(({
  as: Component = 'div',
  className = '',
  sx = {},
  ...props
}, ref) => {
  // Convert MUI sx prop to Tailwind classes
  const sxClasses = Object.entries(sx).map(([key, value]) => {
    // Convert camelCase to kebab-case and handle some common MUI props
    const prop = key
      .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
      .toLowerCase();
    
    // Map common MUI props to Tailwind classes
    const classMap: Record<string, string> = {
      'display': 'flex',
      'flex-direction': 'flex-col',
      'justify-content': 'justify-center',
      'align-items': 'items-center',
      'text-align': 'text-center',
      'margin': 'm-2',
      'padding': 'p-2',
      'background-color': 'bg-opacity-50',
    };

    return classMap[prop] || `${prop}-${value}`;
  }).join(' ');

  return (
    <Component
      ref={ref}
      className={cn(sxClasses, className)}
      {...props as any}
    />
  );
});

Box.displayName = 'Box';

export { Box };
