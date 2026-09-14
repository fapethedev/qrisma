'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowLeft, CheckCircle2, Loader2, Mail, QrCode } from 'lucide-react';
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
import { authClient } from '@/lib/auth/auth-client';

export default function ForgotPasswordPage() {
  const t = useTranslations('auth.forgotPassword');
  const tCommon = useTranslations('common');

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error(tCommon('requiredFields'));
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.requestPasswordReset({
        email: email.trim(),
        redirectTo: `${window.location.origin}/login`,
      });

      if (error) {
        toast.error(tCommon('errorOccurred'), {
          description: error.message || tCommon('errorOccurred'),
        });
      } else {
        setSubmitted(true);
        toast.success(t('successTitle'), {
          description: t('successDesc'),
        });
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
          {submitted ? (
            <CardContent className="pt-6 flex flex-col items-center gap-4 text-center">
              <div className="size-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="size-6" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-lg text-foreground">{t('sentTitle')}</h3>
                <p className="text-xs text-muted-foreground max-w-xs">
                  {t('sentDesc', { email })}
                </p>
              </div>

              <Link href="/login" className="w-full pt-2">
                <Button variant="outline" className="w-full text-xs font-medium gap-2">
                  <ArrowLeft className="size-3.5" aria-hidden="true" />
                  <span>{t('backToLogin')}</span>
                </Button>
              </Link>
            </CardContent>
          ) : (
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
                    <span>{t('submitButton')}</span>
                  )}
                </Button>

                <Link
                  href="/login"
                  className="text-xs text-center text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="size-3.5" aria-hidden="true" />
                  <span>{t('backToLogin')}</span>
                </Link>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
