'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Veuillez saisir votre adresse email.');
      return;
    }

    setLoading(true);
    try {
      // Flow de réinitialisation Better Auth
      const { error } = await authClient.requestPasswordReset({
        email: email.trim(),
        redirectTo: `${window.location.origin}/login`,
      });

      if (error) {
        toast.error('Erreur', { description: error.message || 'Impossible d’envoyer l’email de réinitialisation.' });
      } else {
        setSubmitted(true);
        toast.success('Lien envoyé !', {
          description: 'Consultez votre boîte de réception pour réinitialiser votre mot de passe.',
        });
      }
    } catch {
      toast.error('Une erreur est survenue.');
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
            Récupération de l’accès à votre compte
          </p>
        </div>

        <Card className="rounded-2xl border-border/80 shadow-lg">
          {submitted ? (
            <CardContent className="pt-6 flex flex-col items-center gap-4 text-center">
              <div className="size-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="size-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-lg text-foreground">Email de réinitialisation envoyé</h3>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Si un compte est associé à <span className="font-medium text-foreground">{email}</span>, vous recevrez un lien sécurisé d’ici quelques instants.
                </p>
              </div>

              <Link href="/login" className="w-full pt-2">
                <Button variant="outline" className="w-full text-xs font-medium gap-2">
                  <ArrowLeft className="size-3.5" />
                  <span>Retour à la connexion</span>
                </Button>
              </Link>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardHeader className="flex flex-col gap-1.5">
                <CardTitle className="text-xl font-bold">Mot de passe oublié</CardTitle>
                <CardDescription className="text-xs">
                  Entrez votre email pour recevoir les instructions de réinitialisation
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email" className="text-xs font-medium">
                    Adresse email de votre compte
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alexandre@exemple.com"
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
                      <Loader2 className="size-4 animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <span>Envoyer le lien de réinitialisation</span>
                  )}
                </Button>

                <Link
                  href="/login"
                  className="text-xs text-center text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="size-3.5" />
                  <span>Retour à la page de connexion</span>
                </Link>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
