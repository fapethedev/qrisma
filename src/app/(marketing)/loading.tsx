import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function MarketingLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Navbar Skeleton */}
      <div className="h-16 border-b border-border/60 px-4 sm:px-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <Skeleton className="size-9 rounded-xl" />
          <Skeleton className="h-5 w-28 rounded-md" />
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="size-9 rounded-lg" />
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <Skeleton className="h-7 w-48 rounded-full" />
          <Skeleton className="h-14 w-full max-w-lg rounded-xl" />
          <Skeleton className="h-20 w-full max-w-md rounded-xl" />
          <div className="flex items-center gap-4 pt-2">
            <Skeleton className="h-12 w-40 rounded-xl" />
            <Skeleton className="h-12 w-36 rounded-xl" />
          </div>
        </div>
        <div className="lg:col-span-5 flex justify-center">
          <Skeleton className="h-96 w-full max-w-md rounded-3xl" />
        </div>
      </main>
    </div>
  );
}
