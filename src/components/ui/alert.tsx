import { Callout } from '@radix-ui/themes';
import { forwardRef, ComponentProps, ReactNode } from 'react';

interface AlertProps extends ComponentProps<typeof Callout.Root> {
  children: ReactNode;
  className?: string;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(({ children, className, ...props }, ref) => (
  <Callout.Root {...props} ref={ref} className={className}>
    {children}
  </Callout.Root>
));

interface AlertDescriptionProps extends ComponentProps<typeof Callout.Text> {
  children: ReactNode;
  className?: string;
}

const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(({ children, className, ...props }, ref) => (
  <Callout.Text {...props} ref={ref} className={className}>
    {children}
  </Callout.Text>
));

export { Alert, AlertDescription };
