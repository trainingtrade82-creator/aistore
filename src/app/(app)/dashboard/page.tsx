
'use client';

import React from 'react';

function DashboardContent() {
  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Dashboard</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Welcome! Ready to build something new.
      </p>
      {/* The main content will be built here based on your instructions. */}
    </div>
  );
}

export default function DashboardPage() {
  return (
      <DashboardContent />
  )
}
