import '@/app/globals.css';
import { AuthProvider } from '@/hooks/useAuth';

export const metadata = {
  title: 'Hotel Management System',
  description: 'Book rooms and manage your hotel reservations',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen bg-white">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
