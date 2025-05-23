import GoogleIcon from '@/components/atoms/google-icon';
import { Button, buttonVariants } from '@repo/design-system/components/ui/button';
import { Separator } from '@repo/design-system/components/ui/separator';
import { cn } from '@repo/design-system/lib/utils';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  type: 'sign-in' | 'sign-up';
  className?: string;
  onSubmit: () => void;
}

export default function AuthForm({ children, type, className, onSubmit }: Props) {
  const text = type === 'sign-in' ? 'Welcome back!' : 'Get started!';
  const href: typeof type = type === 'sign-in' ? 'sign-up' : 'sign-in';
  const href_text =
    type === 'sign-in'
      ? "Don't have an account? Sign up"
      : 'Already have an account? Sign in';

  function formatTypeText(text: typeof type) {
    return text
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <form onSubmit={onSubmit} className={cn(className, 'flex flex-col gap-2')} noValidate>
      <h4 className="font-sans text-4xl font-black md:text-5xl">{text}</h4>
      <p className="text-muted-foreground mb-5 text-xs md:text-sm">
        Scry helps you track and reveal hidden errors and logs in your JavaScript apps.
      </p>
      {children}
      <Button type="submit">{formatTypeText(type)}</Button>
      <div className="inline-flex items-center gap-2">
        <Separator className="my-5">OR</Separator>
      </div>
      <Button type="button" variant="outline">
        <GoogleIcon className="fill-muted-foreground" />
        Continue with Google
      </Button>
      <Link href={`/${href}`} className={buttonVariants({ variant: 'link' })}>
        {href_text}
      </Link>
    </form>
  );
}
