'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import {
  Coins,
  Globe,
  Mail,
  Palette,
  Phone,
  QrCode,
  Shapes,
  Share2,
  Sliders,
  Sparkles,
  Type,
  User,
  Wifi,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { QR_VISUAL_PRESETS } from '@/lib/qr/presets';
import { useQRStudioStore } from '@/stores/qr-studio-store';
import { QRFinderPicker } from './qr-finder-picker';
import { QRGradientEditor } from './qr-gradient-editor';
import { QRLogoUploader } from './qr-logo-uploader';
import { QRShapePicker } from './qr-shape-picker';
import type { ErrorCorrectionLevel, QRPayloadType } from '@/lib/qr/types';

const PAYLOAD_TYPES: { id: QRPayloadType; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'url', icon: Globe },
  { id: 'vcard', icon: User },
  { id: 'wifi', icon: Wifi },
  { id: 'text', icon: Type },
  { id: 'email', icon: Mail },
  { id: 'phone', icon: Phone },
  { id: 'sms', icon: Share2 },
  { id: 'crypto', icon: Coins },
];

export function QRCustomizerForm() {
  const t = useTranslations('studio');
  const tCust = useTranslations('studio.customizer');
  const {
    payloadType,
    payloadData,
    isDynamic,
    shortSlug,
    design,
    activePresetId,
    setPayloadType,
    updatePayloadData,
    toggleDynamic,
    setShortSlug,
    updateDesign,
    updateDataModules,
    updateFinderOuter,
    updateFinderInner,
    setLogo,
    removeLogo,
    applyPreset,
  } = useQRStudioStore();

  return (
    <div className="w-full bg-card rounded-2xl border border-border/80 shadow-md p-4 sm:p-6 space-y-6">
      <Tabs defaultValue="content" className="w-full">
        {/* Navigation des Onglets */}
        <TabsList className="grid grid-cols-5 w-full h-11 p-1 bg-muted/60 rounded-xl">
          <TabsTrigger value="content" className="text-xs font-medium gap-1.5 cursor-pointer">
            <QrCode className="h-3.5 w-3.5 hidden sm:inline-block" />
            <span>{t('tabs.content')}</span>
          </TabsTrigger>
          <TabsTrigger value="style" className="text-xs font-medium gap-1.5 cursor-pointer">
            <Shapes className="h-3.5 w-3.5 hidden sm:inline-block" />
            <span>{t('tabs.shapes')}</span>
          </TabsTrigger>
          <TabsTrigger value="colors" className="text-xs font-medium gap-1.5 cursor-pointer">
            <Palette className="h-3.5 w-3.5 hidden sm:inline-block" />
            <span>{t('tabs.colors')}</span>
          </TabsTrigger>
          <TabsTrigger value="logo" className="text-xs font-medium gap-1.5 cursor-pointer">
            <Sparkles className="h-3.5 w-3.5 hidden sm:inline-block" />
            <span>{t('tabs.logo')}</span>
          </TabsTrigger>
          <TabsTrigger value="presets" className="text-xs font-medium gap-1.5 cursor-pointer">
            <Sliders className="h-3.5 w-3.5 hidden sm:inline-block" />
            <span>{t('tabs.presets')}</span>
          </TabsTrigger>
        </TabsList>

        {/* ========================================================= */}
        {/* 1. ONGLET CONTENU & PAYLOAD */}
        {/* ========================================================= */}
        <TabsContent value="content" className="space-y-6 pt-4">
          {/* Switch QR Dynamique */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-primary/30 bg-primary/5">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Label htmlFor="dynamic-toggle" className="text-xs font-bold cursor-pointer text-foreground">
                  {tCust('dynamicTitle')}
                </Label>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground uppercase tracking-wide">
                  {tCust('dynamicBadge')}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                {tCust('dynamicDesc')}
              </p>
            </div>
            <Switch
              id="dynamic-toggle"
              checked={isDynamic}
              onCheckedChange={toggleDynamic}
            />
          </div>

          {isDynamic && (
            <div className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-2 animate-in fade-in-50">
              <Label htmlFor="slug-input" className="text-xs font-semibold text-muted-foreground">
                {tCust('shortSlugLabel')}
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-2 rounded-lg border border-border">
                  {tCust('shortSlugPrefix')}
                </span>
                <Input
                  id="slug-input"
                  value={shortSlug}
                  onChange={(e) => setShortSlug(e.target.value)}
                  placeholder={tCust('shortSlugPlaceholder')}
                  className="font-mono text-xs h-9"
                />
              </div>
            </div>
          )}

          {/* Sélecteur de type de contenu */}
          <div className="space-y-2.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {tCust('contentType')}
            </Label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {PAYLOAD_TYPES.map((type) => {
                const Icon = type.icon;
                const isSelected = payloadType === type.id;
                const label = tCust(`types.${type.id}` as any);
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setPayloadType(type.id)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[11px] font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary/30 shadow-2xs font-semibold'
                        : 'border-border/60 hover:bg-accent/40 text-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4 mb-1" />
                    <span className="truncate w-full text-center">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Formulaires contextuels selon le type sélectionné */}
          <div className="space-y-4 pt-2">
            {payloadType === 'url' && (
              <div className="space-y-1.5">
                <Label htmlFor="url-input" className="text-xs font-medium">{tCust('url.label')}</Label>
                <Input
                  id="url-input"
                  value={payloadData.url}
                  onChange={(e) => updatePayloadData('url', e.target.value)}
                  placeholder={tCust('url.placeholder')}
                  className="h-10 text-sm"
                />
              </div>
            )}

            {payloadType === 'vcard' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">{tCust('vcard.firstName')}</Label>
                  <Input
                    value={payloadData.vcard.firstName}
                    onChange={(e) =>
                      updatePayloadData('vcard', { ...payloadData.vcard, firstName: e.target.value })
                    }
                    placeholder={tCust('vcard.firstNamePlaceholder')}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{tCust('vcard.lastName')}</Label>
                  <Input
                    value={payloadData.vcard.lastName}
                    onChange={(e) =>
                      updatePayloadData('vcard', { ...payloadData.vcard, lastName: e.target.value })
                    }
                    placeholder={tCust('vcard.lastNamePlaceholder')}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{tCust('vcard.org')}</Label>
                  <Input
                    value={payloadData.vcard.organization || ''}
                    onChange={(e) =>
                      updatePayloadData('vcard', { ...payloadData.vcard, organization: e.target.value })
                    }
                    placeholder={tCust('vcard.orgPlaceholder')}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{tCust('vcard.title')}</Label>
                  <Input
                    value={payloadData.vcard.title || ''}
                    onChange={(e) =>
                      updatePayloadData('vcard', { ...payloadData.vcard, title: e.target.value })
                    }
                    placeholder={tCust('vcard.titlePlaceholder')}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{tCust('vcard.email')}</Label>
                  <Input
                    value={payloadData.vcard.email || ''}
                    onChange={(e) =>
                      updatePayloadData('vcard', { ...payloadData.vcard, email: e.target.value })
                    }
                    placeholder={tCust('vcard.emailPlaceholder')}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{tCust('vcard.phone')}</Label>
                  <Input
                    value={payloadData.vcard.cellPhone || ''}
                    onChange={(e) =>
                      updatePayloadData('vcard', { ...payloadData.vcard, cellPhone: e.target.value })
                    }
                    placeholder={tCust('vcard.phonePlaceholder')}
                    className="h-9 text-xs"
                  />
                </div>
              </div>
            )}

            {payloadType === 'wifi' && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs">{tCust('wifi.ssid')}</Label>
                  <Input
                    value={payloadData.wifi.ssid}
                    onChange={(e) =>
                      updatePayloadData('wifi', { ...payloadData.wifi, ssid: e.target.value })
                    }
                    placeholder={tCust('wifi.ssidPlaceholder')}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{tCust('wifi.password')}</Label>
                  <Input
                    type="password"
                    value={payloadData.wifi.password || ''}
                    onChange={(e) =>
                      updatePayloadData('wifi', { ...payloadData.wifi, password: e.target.value })
                    }
                    placeholder={tCust('wifi.passwordPlaceholder')}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <Label className="text-xs">{tCust('wifi.security')}</Label>
                    <Select
                      value={payloadData.wifi.encryption}
                      onValueChange={(val: 'WPA' | 'WEP' | 'nopass') =>
                        updatePayloadData('wifi', { ...payloadData.wifi, encryption: val })
                      }
                    >
                      <SelectTrigger className="h-9 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WPA">WPA/WPA2/WPA3</SelectItem>
                        <SelectItem value="WEP">WEP</SelectItem>
                        <SelectItem value="nopass">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <Switch
                      id="hidden-ssid"
                      checked={payloadData.wifi.hidden}
                      onCheckedChange={(checked) =>
                        updatePayloadData('wifi', { ...payloadData.wifi, hidden: checked })
                      }
                    />
                    <Label htmlFor="hidden-ssid" className="text-xs cursor-pointer">
                      {tCust('wifi.hidden')}
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {payloadType === 'text' && (
              <div className="space-y-1.5">
                <Label htmlFor="text-input" className="text-xs">{tCust('text.label')}</Label>
                <Textarea
                  id="text-input"
                  value={payloadData.text}
                  onChange={(e) => updatePayloadData('text', e.target.value)}
                  placeholder={tCust('text.placeholder')}
                  rows={4}
                  className="text-xs"
                />
              </div>
            )}

            {payloadType === 'email' && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs">{tCust('email.to')}</Label>
                  <Input
                    value={payloadData.email.to}
                    onChange={(e) =>
                      updatePayloadData('email', { ...payloadData.email, to: e.target.value })
                    }
                    placeholder={tCust('email.toPlaceholder')}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{tCust('email.subject')}</Label>
                  <Input
                    value={payloadData.email.subject || ''}
                    onChange={(e) =>
                      updatePayloadData('email', { ...payloadData.email, subject: e.target.value })
                    }
                    placeholder={tCust('email.subjectPlaceholder')}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{tCust('email.body')}</Label>
                  <Textarea
                    value={payloadData.email.body || ''}
                    onChange={(e) =>
                      updatePayloadData('email', { ...payloadData.email, body: e.target.value })
                    }
                    placeholder={tCust('email.bodyPlaceholder')}
                    rows={3}
                    className="text-xs"
                  />
                </div>
              </div>
            )}

            {payloadType === 'phone' && (
              <div className="space-y-1.5">
                <Label htmlFor="phone-input" className="text-xs">{tCust('phone.label')}</Label>
                <Input
                  id="phone-input"
                  value={payloadData.phone}
                  onChange={(e) => updatePayloadData('phone', e.target.value)}
                  placeholder={tCust('phone.placeholder')}
                  className="h-9 text-xs"
                />
              </div>
            )}

            {payloadType === 'sms' && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs">{tCust('sms.phone')}</Label>
                  <Input
                    value={payloadData.sms.phone}
                    onChange={(e) =>
                      updatePayloadData('sms', { ...payloadData.sms, phone: e.target.value })
                    }
                    placeholder={tCust('sms.phonePlaceholder')}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{tCust('sms.message')}</Label>
                  <Textarea
                    value={payloadData.sms.message || ''}
                    onChange={(e) =>
                      updatePayloadData('sms', { ...payloadData.sms, message: e.target.value })
                    }
                    placeholder={tCust('sms.messagePlaceholder')}
                    rows={3}
                    className="text-xs"
                  />
                </div>
              </div>
            )}

            {payloadType === 'crypto' && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs">{tCust('crypto.currency')}</Label>
                  <Select
                    value={payloadData.crypto.currency}
                    onValueChange={(val: 'bitcoin' | 'ethereum' | 'solana') =>
                      updatePayloadData('crypto', { ...payloadData.crypto, currency: val })
                    }
                  >
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                      <SelectItem value="solana">Solana (SOL)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{tCust('crypto.address')}</Label>
                  <Input
                    value={payloadData.crypto.address}
                    onChange={(e) =>
                      updatePayloadData('crypto', { ...payloadData.crypto, address: e.target.value })
                    }
                    placeholder={tCust('crypto.addressPlaceholder')}
                    className="h-9 text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">{tCust('crypto.amount')}</Label>
                  <Input
                    type="number"
                    step="any"
                    value={payloadData.crypto.amount || ''}
                    onChange={(e) =>
                      updatePayloadData('crypto', {
                        ...payloadData.crypto,
                        amount: e.target.value ? parseFloat(e.target.value) : undefined,
                      })
                    }
                    placeholder={tCust('crypto.amountPlaceholder')}
                    className="h-9 text-xs font-mono"
                  />
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* ========================================================= */}
        {/* 2. ONGLET FORMES & YEUX */}
        {/* ========================================================= */}
        <TabsContent value="style" className="space-y-6 pt-4">
          <QRShapePicker
            settings={design.dataModulesSettings}
            onChange={updateDataModules}
          />

          <div className="pt-4 border-t border-border/60">
            <QRFinderPicker
              outerSettings={design.finderPatternOuterSettings}
              innerSettings={design.finderPatternInnerSettings}
              onOuterChange={updateFinderOuter}
              onInnerChange={updateFinderInner}
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-border/60">
            {/* Niveau de correction d'erreur */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {tCust('errorCorrection')}
              </Label>
              <Select
                value={design.level}
                onValueChange={(lvl: ErrorCorrectionLevel) => updateDesign({ level: lvl })}
              >
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">{tCust('levels.L')}</SelectItem>
                  <SelectItem value="M">{tCust('levels.M')}</SelectItem>
                  <SelectItem value="Q">{tCust('levels.Q')}</SelectItem>
                  <SelectItem value="H">{tCust('levels.H')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Marge extérieure */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <Label className="text-muted-foreground">{tCust('margin')}</Label>
                <span className="font-mono font-medium">{tCust('modules', { count: design.marginSize })}</span>
              </div>
              <Slider
                min={0}
                max={4}
                step={1}
                value={[design.marginSize]}
                onValueChange={([val]) => updateDesign({ marginSize: val })}
              />
            </div>
          </div>
        </TabsContent>

        {/* ========================================================= */}
        {/* 3. ONGLET COULEURS & DÉGRADÉS */}
        {/* ========================================================= */}
        <TabsContent value="colors" className="pt-4">
          <QRGradientEditor
            background={design.background}
            gradient={design.gradient}
            solidColor={design.dataModulesSettings.color || '#000000'}
            onBackgroundChange={(bg) => updateDesign({ background: bg })}
            onGradientChange={(grad) => updateDesign({ gradient: grad })}
            onSolidColorChange={(color) => updateDataModules({ color })}
          />
        </TabsContent>

        {/* ========================================================= */}
        {/* 4. ONGLET LOGO */}
        {/* ========================================================= */}
        <TabsContent value="logo" className="pt-4">
          <QRLogoUploader
            imageSettings={design.imageSettings}
            onSetLogo={setLogo}
            onRemoveLogo={removeLogo}
          />
        </TabsContent>

        {/* ========================================================= */}
        {/* 5. ONGLET THÈMES PRÉDÉFINIS */}
        {/* ========================================================= */}
        <TabsContent value="presets" className="space-y-4 pt-4">
          <div className="space-y-1">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {tCust('presetsTitle')}
            </Label>
            <p className="text-xs text-muted-foreground">
              {tCust('presetsDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QR_VISUAL_PRESETS.map((preset) => {
              const isSelected = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-primary bg-primary/10 text-foreground ring-1 ring-primary/30 shadow-xs'
                      : 'border-border/60 hover:bg-accent/40 text-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-foreground">{preset.name}</span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {preset.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
