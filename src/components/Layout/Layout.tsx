import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'user' | 'admin' | 'moderator';
  } | null;
}

export default function Layout({ children, user }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
