'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  ShieldCheck,
  User,
  CreditCard,
  KeyRound,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Lock,
  QrCode,
  Layers,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useSession, authClient, twoFactor } from '@/lib/auth/auth-client';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { TwoFactorSetupDialog } from '@/components/auth/two-factor-setup-dialog';

export default function SettingsPage() {
  const t = useTranslations('settings');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const { data: session, isPending } = useSession();

  // Profil
  const [name, setName] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  // Sécurité (Mot de passe)
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  // 2FA Dialog
  const [twoFactorDialogOpen, setTwoFactorDialogOpen] = useState(false);
  const [disabling2FA, setDisabling2FA] = useState(false);

  // Quotas
  const [qrCount, setQrCount] = useState<number>(0);
  const [loadingQuotas, setLoadingQuotas] = useState(true);

  // Redirection si non connecté
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login?callbackUrl=/dashboard/settings');
    }
  }, [session, isPending, router]);

  // Initialisation des données profil
  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session?.user?.name]);

  // Chargement du compte de QR codes de l'utilisateur
  useEffect(() => {
    if (session?.user?.id) {
      fetch('/api/qr')
        .then((r) => r.json())
        .then((res) => {
          if (Array.isArray(res.data)) {
            setQrCount(res.data.length);
          }
        })
        .catch(console.error)
        .finally(() => setLoadingQuotas(false));
    }
  }, [session?.user?.id]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSavingProfile(true);
    try {
      const res = await authClient.updateUser({
        name: name.trim(),
      });

      if (res.error) {
        toast.error(t('profile.errorToast'), { description: res.error.message });
      } else {
        toast.success(t('profile.successToast'));
      }
    } catch {
      toast.error(tCommon('errorOccurred'));
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;

    if (newPassword !== confirmPassword) {
      toast.error(t('security.passwordMismatch'));
      return;
    }

    setChangingPassword(true);
    try {
      const res = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });

      if (res.error) {
        toast.error(t('security.passwordError'), { description: res.error.message });
      } else {
        toast.success(t('security.passwordChanged'));
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch {
      toast.error(tCommon('errorOccurred'));
    } finally {
      setChangingPassword(false);
    }
  };

  const handleDisable2FA = async () => {
    const password = window.prompt(t('security.disable2FAPrompt'));
    if (!password) return;

    setDisabling2FA(true);
    try {
      const res = await twoFactor.disable({ password });
      if (res.error) {
        toast.error(res.error.message || tCommon('errorOccurred'));
      } else {
        toast.success(t('security.twoFactorDisabledToast'));
        window.location.reload();
      }
    } catch {
      toast.error(tCommon('errorOccurred'));
    } finally {
      setDisabling2FA(false);
    }
  };

  if (isPending || !session?.user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const user = session.user as any;
  const userPlan = (user.plan || 'free').toLowerCase();
  const isPro = userPlan === 'pro' || userPlan === 'enterprise' || userPlan === 'admin';
  const is2FAEnabled = Boolean(user.twoFactorEnabled);
  const maxQRCodes = isPro ? Infinity : 5;
  const quotaPercentage = isPro ? 100 : Math.min(Math.round((qrCount / maxQRCodes) * 100), 100);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-indigo-500/20">
      {/* En-tête du Dashboard */}
      <DashboardHeader
        searchQuery=""
        onSearchChange={() => {}}
        userEmail={session.user.email}
        userName={session.user.name}
      />

      <main id="main-content" className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* En-tête de page */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-foreground">
            {t('title')}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        {/* Onglets des Paramètres */}
        <Tabs defaultValue="profile" className="w-full space-y-6">
          <TabsList className="grid grid-cols-3 w-full h-11 p-1 bg-muted/60 rounded-xl">
            <TabsTrigger value="profile" className="text-xs font-semibold gap-2 cursor-pointer">
              <User className="h-3.5 w-3.5" />
              <span>{t('tabs.profile')}</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="text-xs font-semibold gap-2 cursor-pointer">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{t('tabs.security')}</span>
            </TabsTrigger>
            <TabsTrigger value="subscription" className="text-xs font-semibold gap-2 cursor-pointer">
              <CreditCard className="h-3.5 w-3.5" />
              <span>{t('tabs.subscription')}</span>
            </TabsTrigger>
          </TabsList>

          {/* ========================================================= */}
          {/* ONGLET 1 : PROFIL */}
          {/* ========================================================= */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="rounded-2xl border-border/80 shadow-sm">
              <form onSubmit={handleUpdateProfile}>
                <CardHeader>
                  <CardTitle className="text-lg font-heading font-bold">{t('profile.title')}</CardTitle>
                  <CardDescription className="text-xs">
                    {t('profile.desc')}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-medium">
                      {t('profile.nameLabel')}
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('profile.namePlaceholder')}
                      required
                      className="text-xs h-10 max-w-md"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-medium">
                      {t('profile.emailLabel')}
                    </Label>
                    <Input
                      id="email"
                      value={session.user.email}
                      disabled
                      className="text-xs font-mono h-10 max-w-md bg-muted/50 cursor-not-allowed"
                    />
                  </div>
                </CardContent>

                <CardFooter className="pt-2">
                  <Button
                    type="submit"
                    disabled={savingProfile}
                    className="font-heading font-bold text-xs h-10 gap-2 cursor-pointer"
                  >
                    {savingProfile ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>{t('profile.saving')}</span>
                      </>
                    ) : (
                      <span>{t('profile.saveButton')}</span>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* ========================================================= */}
          {/* ONGLET 2 : SÉCURITÉ */}
          {/* ========================================================= */}
          <TabsContent value="security" className="space-y-6">
            {/* Authentification 2FA TOTP */}
            <Card className="rounded-2xl border-border/80 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-heading font-bold flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-indigo-500" />
                      <span>{t('security.twoFactorTitle')}</span>
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {t('security.twoFactorDesc')}
                    </CardDescription>
                  </div>

                  <Badge
                    variant={is2FAEnabled ? 'default' : 'outline'}
                    className={`font-accent text-xs font-semibold px-2.5 py-1 ${
                      is2FAEnabled
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {is2FAEnabled ? t('security.twoFactorEnabled') : t('security.twoFactorDisabled')}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-2">
                {is2FAEnabled ? (
                  <div className="flex items-center justify-between p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                      <span className="text-xs font-medium text-foreground">
                        Votre compte est protégé par l&apos;authentification à deux facteurs TOTP.
                      </span>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleDisable2FA}
                      disabled={disabling2FA}
                      className="text-xs font-semibold cursor-pointer shrink-0"
                    >
                      {disabling2FA ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : t('security.disable2FA')}
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border/80 bg-secondary/30">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-foreground">
                        Activez TOTP pour exiger un code d&apos;authentification à chaque connexion.
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Compatible avec Google Authenticator, 1Password, Bitwarden, etc.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => setTwoFactorDialogOpen(true)}
                      className="font-heading font-bold text-xs gap-2 shrink-0 cursor-pointer"
                    >
                      <KeyRound className="h-3.5 w-3.5" />
                      <span>{t('security.enable2FA')}</span>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Changement de Mot de Passe */}
            <Card className="rounded-2xl border-border/80 shadow-sm">
              <form onSubmit={handleChangePassword}>
                <CardHeader>
                  <CardTitle className="text-lg font-heading font-bold flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary" />
                    <span>{t('security.passwordTitle')}</span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="currentPassword" className="text-xs font-medium">
                      {t('security.currentPassword')}
                    </Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      className="text-xs font-mono h-10 max-w-md"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="newPassword" className="text-xs font-medium">
                      {t('security.newPassword')}
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={8}
                      className="text-xs font-mono h-10 max-w-md"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="confirmPassword" className="text-xs font-medium">
                      {t('security.confirmNewPassword')}
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={8}
                      className="text-xs font-mono h-10 max-w-md"
                    />
                  </div>
                </CardContent>

                <CardFooter className="pt-2">
                  <Button
                    type="submit"
                    disabled={changingPassword}
                    className="font-heading font-bold text-xs h-10 gap-2 cursor-pointer"
                  >
                    {changingPassword ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>{t('security.changePasswordButton')}</span>
                      </>
                    ) : (
                      <span>{t('security.changePasswordButton')}</span>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* ========================================================= */}
          {/* ONGLET 3 : ABONNEMENT & QUOTAS */}
          {/* ========================================================= */}
          <TabsContent value="subscription" className="space-y-6">
            <Card className="rounded-2xl border-border/80 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-heading font-bold">{t('subscription.title')}</CardTitle>
                    <CardDescription className="text-xs">{t('subscription.desc')}</CardDescription>
                  </div>

                  <Badge className="font-accent text-xs font-bold px-3 py-1 bg-primary/10 text-primary border border-primary/20">
                    {isPro ? t('subscription.planPro') : t('subscription.planFree')}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Jauge d'utilisation des QR codes */}
                <div className="space-y-2 p-4 rounded-xl border border-border/80 bg-secondary/20">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <QrCode className="h-4 w-4 text-primary" />
                      <span>{t('subscription.quotaTitle')}</span>
                    </span>
                    <span className="font-mono text-muted-foreground font-medium">
                      {isPro
                        ? `${qrCount} QR créés (${t('subscription.unlimited')})`
                        : t('subscription.quotaValue', { used: qrCount, max: maxQRCodes })}
                    </span>
                  </div>

                  {!isPro && (
                    <Progress value={quotaPercentage} className="h-2" />
                  )}

                  <p className="text-[11px] text-muted-foreground">
                    {t('subscription.quotaDesc')}
                  </p>
                </div>

                {/* Bannière d'Upgrade Pro */}
                {!isPro ? (
                  <div className="p-6 rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 via-card to-card space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <h3 className="font-heading font-bold text-base text-foreground">
                        Débloquez la puissance maximale avec QRCraft Pro
                      </h3>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t('subscription.upgradePrompt')}
                    </p>

                    <ul className="space-y-2 text-xs text-foreground font-medium">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>QR codes dynamiques et statiques illimités</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>Exports vectoriels SVG et PNG 4K sans aucun filigrane</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>Analytiques détaillées (pays, appareils, timelines)</span>
                      </li>
                    </ul>

                    <Link href="/#pricing" className="inline-block pt-2">
                      <Button className="font-heading font-bold text-xs gap-2 shadow-md shadow-primary/20">
                        <span>{t('subscription.upgradeButton')}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>{t('subscription.proPerks')}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Boîte de dialogue 2FA TOTP */}
      <TwoFactorSetupDialog
        open={twoFactorDialogOpen}
        onOpenChange={setTwoFactorDialogOpen}
      />
    </div>
  );
}
