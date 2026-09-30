import { COMPANY, DEMO_MODE, SITE_NAME } from "@/lib/config";
import Link from "next/link";

interface LegalPageProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function LegalPage({ children, title, description }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="border-b border-border bg-bg/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-lg font-medium text-text tracking-tight">
              {SITE_NAME}
            </Link>
          </div>
        </div>
      </header>
      <main id="contenu" tabIndex={-1} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-light text-text tracking-tight mb-4">{title}</h1>
          <p className="text-text-muted">{description}</p>
          {DEMO_MODE && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
              <strong>Mode demo :</strong> les informations ci-dessous sont des modeles generiques.
              Elles doivent etre adaptees et validees par un professionnel du droit avant mise en ligne.
            </div>
          )}
        </header>
        <article className="text-text leading-relaxed">
          {children}
        </article>
        <footer className="mt-12 pt-6 border-t border-border">
          <p className="text-sm text-text-muted text-center">
            <Link href="/" className="hover:underline">Retour a l'accueil</Link>
          </p>
        </footer>
      </main>
      <footer className="bg-bg-muted border-t border-border py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-text-muted">
          &copy; {new Date().getFullYear()} {COMPANY.name}
        </div>
      </footer>
    </div>
  );
}

export function LegalMetadata(title: string, description: string) {
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    robots: { index: false, follow: false },
  };
}