import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/20">
      <div className="w-full max-w-md flex flex-col gap-6">
        {/* Logo and title skeleton */}
        <div className="flex flex-col items-center gap-2 text-center">
          <Skeleton className="size-10 rounded-xl" />
          <Skeleton className="h-6 w-32 rounded-md" />
          <Skeleton className="h-4 w-48 rounded-md" />
        </div>

        {/* Card skeleton */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-lg space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-36 rounded-md" />
            <Skeleton className="h-4 w-60 rounded-md" />
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>

          <Skeleton className="h-10 w-full rounded-lg" />

          <div className="pt-2 flex justify-center">
            <Skeleton className="h-4 w-44 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
