'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactQRCode } from '@lglab/react-qr-code';
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
  const [code, setCode] = useState('');
  const [backupCode, setBackupCode] = useState('');
  const [useBackup, setUseBackup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!useBackup && code.length !== 6) {
      toast.error('Veuillez saisir les 6 chiffres du code d’authentification.');
      return;
    }

    if (useBackup && !backupCode.trim()) {
      toast.error('Veuillez saisir votre code de secours.');
      return;
    }

    setLoading(true);
    try {
      if (useBackup) {
        // Validation avec code de secours
        const res = await twoFactor.verifyBackupCode({
          code: backupCode.trim(),
        });

        if (res.error) {
          toast.error('Code de secours invalide', { description: res.error.message });
        } else {
          toast.success('Authentification réussie !');
          router.push('/studio');
        }
      } else {
        // Validation TOTP standard
        const res = await twoFactor.verifyTotp({
          code,
        });

        if (res.error) {
          toast.error('Code invalide', {
            description: res.error.message || 'Veuillez vérifier l’heure de votre appareil et réessayer.',
          });
        } else {
          toast.success('Double authentification validée !');
          router.push('/studio');
        }
      }
    } catch {
      toast.error('Erreur inattendue lors de la vérification 2FA.');
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
            Sécurité renforcée par double facteur (2FA)
          </p>
        </div>

        <Card className="rounded-2xl border-border/80 shadow-lg">
          <form onSubmit={handleVerify}>
            <CardHeader className="flex flex-col gap-1.5 text-center">
              <div className="mx-auto size-11 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-1">
                <ShieldCheck className="size-6" />
              </div>
              <CardTitle className="text-xl font-bold">Vérification en 2 étapes</CardTitle>
              <CardDescription className="text-xs">
                {useBackup
                  ? 'Entrez l’un de vos codes de secours de récupération'
                  : 'Ouvrez votre application d’authentification (Google Authenticator, Authy, 1Password) et saisissez le code à 6 chiffres'}
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
                  <span className="text-[11px] text-muted-foreground">Code valide pendant 30 secondes</span>
                </div>
              ) : (
                <div className="w-full flex flex-col gap-1.5">
                  <Label htmlFor="backupCode" className="text-xs font-medium">
                    Code de secours (ex: a1b2c3d4)
                  </Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="backupCode"
                      value={backupCode}
                      onChange={(e) => setBackupCode(e.target.value)}
                      placeholder="Entrez votre code de secours"
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
                {useBackup
                  ? 'Utiliser l’application d’authentification TOTP'
                  : 'Appareil perdu ? Utiliser un code de secours'}
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
                    <Loader2 className="size-4 animate-spin" />
                    <span>Vérification...</span>
                  </>
                ) : (
                  <>
                    <span>Confirmer l’accès</span>
                    <ArrowRight className="size-3.5" />
                  </>
                )}
              </Button>

              <Link
                href="/login"
                className="text-xs text-center text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="size-3.5" />
                <span>Retour à la connexion</span>
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
