import { Badge as RadixBadge } from '@radix-ui/themes';
import { forwardRef, ComponentProps, ReactNode } from 'react';

interface BadgeProps extends ComponentProps<typeof RadixBadge> {
  children: ReactNode;
  className?: string;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({ children, className, ...props }, ref) => (
  <RadixBadge {...props} ref={ref} className={className}>
    {children}
  </RadixBadge>
));

export { Badge };
