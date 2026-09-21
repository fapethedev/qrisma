'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowRight, CheckCircle2, Loader2, Lock, Mail, QrCode, User } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUp } from '@/lib/auth/auth-client';

export default function RegisterPage() {
  const router = useRouter();
  const t = useTranslations('auth.register');
  const tCommon = useTranslations('common');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      toast.error(tCommon('requiredFields'));
      return;
    }

    if (password.length < 8) {
      toast.error(t('passwordLengthError'));
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t('passwordMismatch'));
      return;
    }

    setLoading(true);
    try {
      const result = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        callbackURL: `${window.location.origin}/dashboard/studio`,
      });

      if (result.error) {
        toast.error(t('errorToast'), {
          description: result.error.message || tCommon('errorOccurred'),
        });
      } else {
        toast.success(t('successToast'), {
          description: t('redirecting'),
        });
        router.push('/dashboard/studio');
      }
    } catch {
      toast.error(tCommon('errorOccurred'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/20">
      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <QrCode className="size-5" />
            </div>
            <span className="font-heading font-extrabold text-xl tracking-wider">QRCraft</span>
          </Link>
          <p className="text-xs text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        <Card className="rounded-2xl border-border/80 shadow-lg">
          <form onSubmit={handleSubmit}>
            <CardHeader className="flex flex-col gap-1.5">
              <CardTitle className="text-xl font-heading font-bold">{t('title')}</CardTitle>
              <CardDescription className="text-xs">
                {t('formSubtitle')}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name" className="text-xs font-medium">
                  {t('nameLabel')}
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('namePlaceholder')}
                    required
                    className="pl-9 text-xs h-10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className="text-xs font-medium">
                  {t('emailLabel')}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder')}
                    required
                    className="pl-9 text-xs font-mono h-10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password" className="text-xs font-medium">
                  {t('passwordLabel')} ({t('passwordHelper')})
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={8}
                    className="pl-9 text-xs font-mono h-10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="confirmPassword" className="text-xs font-medium">
                  {t('confirmPasswordLabel')}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={8}
                    className="pl-9 text-xs font-mono h-10"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-muted-foreground">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" aria-hidden="true" />
                <span className="font-accent font-semibold text-primary">QRCraft SaaS</span>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full text-xs font-heading font-bold h-10 gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    <span>{t('submitting')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('submitButton')}</span>
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                {t('alreadyAccount')}{' '}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  {t('signIn')}
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
