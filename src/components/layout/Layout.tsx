import { Footer } from './Footer';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  siteName?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  siteName = 'SEO Media',
}) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header siteName={siteName} />
      <main className="flex-1">{children}</main>
      <Footer siteName={siteName} />
    </div>
  );
};

export default Layout;
