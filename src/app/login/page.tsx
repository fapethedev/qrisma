'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowRight, Loader2, Lock, Mail, QrCode } from 'lucide-react';
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
import { signIn } from '@/lib/auth/auth-client';

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations('auth.login');
  const tCommon = useTranslations('common');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(tCommon('requiredFields'));
      return;
    }

    setLoading(true);
    try {
      const result = await signIn.email({
        email,
        password,
        callbackURL: `${window.location.origin}/studio`,
      });

      if (result.error) {
        toast.error(t('errorToast'), {
          description: result.error.message || t('invalidCredentials'),
        });
      } else {
        toast.success(t('successToast'), {
          description: t('redirecting'),
        });
        router.push('/studio');
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
            <span className="font-bold text-xl tracking-tight">QRCraft</span>
          </Link>
          <p className="text-xs text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        <Card className="rounded-2xl border-border/80 shadow-lg">
          <form onSubmit={handleSubmit}>
            <CardHeader className="flex flex-col gap-1.5">
              <CardTitle className="text-xl font-bold">{t('title')}</CardTitle>
              <CardDescription className="text-xs">
                {t('formSubtitle')}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
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
                    className="pl-9 text-xs h-10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <Label htmlFor="password" className="font-medium">
                    {t('passwordLabel')}
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-primary hover:underline text-[11px]"
                  >
                    {t('forgotPassword')}
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="pl-9 text-xs h-10"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full text-xs font-semibold h-10 gap-2 cursor-pointer"
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
                {t('noAccount')}{' '}
                <Link href="/register" className="text-primary font-semibold hover:underline">
                  {t('createAccount')}
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
