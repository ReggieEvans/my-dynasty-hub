import './globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';

import { AppProvider } from './provider';

const roboto = localFont({
  src: [
    {
      path: './fonts/Roboto-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Roboto-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Roboto-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Roboto-Semibold.ttf',
      weight: '600',
      style: 'bold',
    },
    {
      path: './fonts/Roboto-Bold.ttf',
      weight: '700',
      style: 'bold',
    },
    {
      path: './fonts/Roboto-Black.ttf',
      weight: '900',
      style: 'bold',
    },
  ],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MyDynastyHub',
  description:
    'MyDynastyHub is a tool for tracking your EASports College Football dynasty.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${roboto.variable} antialiased`}>
        <AppProvider>
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
