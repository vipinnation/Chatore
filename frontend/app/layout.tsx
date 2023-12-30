import Navbar from '@/components/ui/navbar.ui';
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/utils/theme';
import { SnackbarProvider } from '@/components/alert/alert.context';
import AuthContextProvider from '@/middleware/check-auth.middleware';

export const metadata: Metadata = {
  title: 'Chatore',
  description: 'A chat application'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={` h-screen`}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <AuthContextProvider>
              <Navbar />
              {children}
            </AuthContextProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
