'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@repo/design-system/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import AuthForm from '../../_components/auth-form';
import AuthFormFields, { type AuthFormField } from '../../_components/auth-form-fields';
import { AuthFormData, AuthSchema } from '../../_schemas/auth';

export default function SignInForm() {
  const form = useForm<AuthFormData>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<AuthFormData> = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <AuthForm type="sign-in" onSubmit={form.handleSubmit(onSubmit)}>
        <AuthFormFields<AuthFormData> fields={formFields} control={form.control} />
      </AuthForm>
    </Form>
  );
}

const formFields: AuthFormField<AuthFormData>[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email*',
    placeholder: 'Enter your email',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password*',
    placeholder: 'Enter your password',
  },
];
