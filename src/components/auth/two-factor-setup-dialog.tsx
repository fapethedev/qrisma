'use client';

import React, { useState } from 'react';
import { ReactQRCode } from '@lglab/react-qr-code';
import { Check, Copy, KeyRound, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { twoFactor } from '@/lib/auth/auth-client';

interface TwoFactorSetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function TwoFactorSetupDialog({
  open,
  onOpenChange,
  onSuccess,
}: TwoFactorSetupDialogProps) {
  const [step, setStep] = useState<'password' | 'scan' | 'done'>('password');
  const [password, setPassword] = useState('');
  const [totpURI, setTotpURI] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [verifyCode, setVerifyCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRequestEnable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast.error('Veuillez saisir votre mot de passe.');
      return;
    }

    setLoading(true);
    try {
      const res = await twoFactor.enable({
        password,
      });

      if (res.error) {
        toast.error('Erreur', { description: res.error.message || 'Mot de passe incorrect.' });
      } else if (res.data && 'totpURI' in res.data) {
        setTotpURI(res.data.totpURI);
        setBackupCodes(res.data.backupCodes || []);
        setStep('scan');
        toast.info('Scannez le QR code avec votre application 2FA');
      }
    } catch {
      toast.error('Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyCode.length !== 6) {
      toast.error('Veuillez entrer les 6 chiffres du code.');
      return;
    }

    setLoading(true);
    try {
      const res = await twoFactor.verifyTotp({
        code: verifyCode,
      });

      if (res.error) {
        toast.error('Code invalide', { description: res.error.message });
      } else {
        setStep('done');
        toast.success('Double authentification activée avec succès !');
        if (onSuccess) onSuccess();
      }
    } catch {
      toast.error('Erreur de confirmation.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join('\n'));
    setCopied(true);
    toast.success('Codes de secours copiés dans le presse-papiers');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-primary" />
            <span>Activer l’authentification à deux facteurs (2FA)</span>
          </DialogTitle>
          <DialogDescription>
            Protégez votre compte QRCraft contre les accès non autorisés.
          </DialogDescription>
        </DialogHeader>

        {step === 'password' && (
          <form onSubmit={handleRequestEnable} className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="current-pwd" className="text-xs font-medium">
                Confirmez votre mot de passe pour continuer
              </Label>
              <Input
                id="current-pwd"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="h-10 text-xs"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={loading} className="gap-2">
                {loading && <Loader2 className="size-3.5 animate-spin" />}
                <span>Continuer</span>
              </Button>
            </DialogFooter>
          </form>
        )}

        {step === 'scan' && (
          <form onSubmit={handleConfirmCode} className="flex flex-col items-center gap-4 py-2 text-center">
            <p className="text-xs text-muted-foreground">
              Scannez ce QR code avec votre application (Google Authenticator, Authy, etc.) :
            </p>

            <div className="p-3 bg-white rounded-xl shadow-md border border-border">
              <ReactQRCode value={totpURI} size={170} level="M" />
            </div>

            <div className="w-full flex flex-col items-center gap-2 pt-1">
              <Label className="text-xs font-medium">Entrez le code à 6 chiffres généré :</Label>
              <InputOTP maxLength={6} value={verifyCode} onChange={setVerifyCode}>
                <InputOTPGroup className="gap-1.5">
                  <InputOTPSlot index={0} className="size-10 text-sm font-bold rounded border" />
                  <InputOTPSlot index={1} className="size-10 text-sm font-bold rounded border" />
                  <InputOTPSlot index={2} className="size-10 text-sm font-bold rounded border" />
                  <InputOTPSlot index={3} className="size-10 text-sm font-bold rounded border" />
                  <InputOTPSlot index={4} className="size-10 text-sm font-bold rounded border" />
                  <InputOTPSlot index={5} className="size-10 text-sm font-bold rounded border" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <DialogFooter className="w-full pt-2">
              <Button type="submit" disabled={loading} className="w-full gap-2">
                {loading && <Loader2 className="size-3.5 animate-spin" />}
                <span>Valider et activer la 2FA</span>
              </Button>
            </DialogFooter>
          </form>
        )}

        {step === 'done' && (
          <div className="flex flex-col gap-4 py-2">
            <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2">
              <Check className="size-4 shrink-0" />
              <span>Votre compte est désormais sécurisé par double authentification !</span>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-xs font-semibold">Conservez précieusement vos codes de secours :</Label>
              <div className="grid grid-cols-2 gap-1.5 p-3 rounded-xl bg-muted font-mono text-[11px] text-center">
                {backupCodes.map((code, idx) => (
                  <span key={idx} className="p-1 bg-background/80 rounded border border-border/60">
                    {code}
                  </span>
                ))}
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleCopyBackupCodes}
              className="gap-2 text-xs h-9"
            >
              {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
              <span>{copied ? 'Copié !' : 'Copier tous les codes de secours'}</span>
            </Button>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                onClick={() => onOpenChange(false)}
                className="w-full"
              >
                Terminer
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
