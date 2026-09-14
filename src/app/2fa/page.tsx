'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, KeyRound, Loader2, QrCode, ShieldCheck } from 'lucide-react';
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { twoFactor } from '@/lib/auth/auth-client';

export default function TwoFactorPage() {
  const router = useRouter();
  const t = useTranslations('auth.twoFactor');
  const tCommon = useTranslations('common');

  const [code, setCode] = useState('');
  const [backupCode, setBackupCode] = useState('');
  const [useBackup, setUseBackup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!useBackup && code.length !== 6) {
      toast.error(t('codeLengthError'));
      return;
    }

    if (useBackup && !backupCode.trim()) {
      toast.error(t('backupCodeRequired'));
      return;
    }

    setLoading(true);
    try {
      if (useBackup) {
        const res = await twoFactor.verifyBackupCode({
          code: backupCode.trim(),
        });

        if (res.error) {
          toast.error(t('invalidBackupCode'), { description: res.error.message });
        } else {
          toast.success(t('successToast'));
          router.push('/studio');
        }
      } else {
        const res = await twoFactor.verifyTotp({
          code,
        });

        if (res.error) {
          toast.error(t('invalidCode'), {
            description: res.error.message,
          });
        } else {
          toast.success(t('successToast'));
          router.push('/studio');
        }
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
          <form onSubmit={handleVerify}>
            <CardHeader className="flex flex-col gap-1.5 text-center">
              <div className="mx-auto size-11 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1">
                <ShieldCheck className="size-6" aria-hidden="true" />
              </div>
              <CardTitle className="text-xl font-bold">{t('title')}</CardTitle>
              <CardDescription className="text-xs">
                {useBackup ? t('backupCodeSubtitle') : t('formSubtitle')}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col items-center gap-5 pt-2">
              {!useBackup ? (
                <div className="flex flex-col items-center gap-3">
                  <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={(val) => setCode(val)}
                  >
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={0} className="size-11 text-base font-bold rounded-lg border border-border/80" />
                      <InputOTPSlot index={1} className="size-11 text-base font-bold rounded-lg border border-border/80" />
                      <InputOTPSlot index={2} className="size-11 text-base font-bold rounded-lg border border-border/80" />
                      <InputOTPSlot index={3} className="size-11 text-base font-bold rounded-lg border border-border/80" />
                      <InputOTPSlot index={4} className="size-11 text-base font-bold rounded-lg border border-border/80" />
                      <InputOTPSlot index={5} className="size-11 text-base font-bold rounded-lg border border-border/80" />
                    </InputOTPGroup>
                  </InputOTP>
                  <span className="text-[11px] text-muted-foreground">TOTP (30s)</span>
                </div>
              ) : (
                <div className="w-full flex flex-col gap-1.5">
                  <Label htmlFor="backupCode" className="text-xs font-medium">
                    {t('backupCodeLabel')}
                  </Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden="true" />
                    <Input
                      id="backupCode"
                      value={backupCode}
                      onChange={(e) => setBackupCode(e.target.value)}
                      placeholder={t('backupPlaceholder')}
                      className="pl-9 text-xs h-10 font-mono"
                    />
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setUseBackup(!useBackup);
                  setCode('');
                  setBackupCode('');
                }}
                className="text-xs text-primary font-medium hover:underline cursor-pointer"
              >
                {useBackup ? t('useTotpCode') : t('useBackupCode')}
              </button>
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

              <Link
                href="/login"
                className="text-xs text-center text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                <span>{t('backToLogin')}</span>
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
