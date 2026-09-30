import Link from "next/link";
import { COMPANY, DEMO_MODE, SITE_NAME } from "@/lib/config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-muted border-t border-border" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <h3 className="font-medium text-text tracking-tight mb-4">{SITE_NAME}</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Les meilleures offres Black Friday sélectionnées pour vous.
              {" "}
              {DEMO_MODE && <span className="font-medium text-amber-600">(Mode démo)</span>}
            </p>
          </div>
          <nav aria-label="Informations">
            <h3 className="font-medium text-text mb-4">Informations</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link href="/livraison-retours" className="hover:underline">Livraison et retours</Link></li>
              <li><Link href="/cgv" className="hover:underline">Conditions générales de vente</Link></li>
            </ul>
          </nav>
          <nav aria-label="Légal">
            <h3 className="font-medium text-text mb-4">Légal</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link href="/mentions-legales" className="hover:underline">Mentions légales</Link></li>
              <li><Link href="/confidentialite" className="hover:underline">Confidentialité</Link></li>
            </ul>
          </nav>
          <nav aria-label="Contact">
            <h3 className="font-medium text-text mb-4">Contact</h3>
            <address className="not-italic text-sm text-text-muted space-y-2">
              <p>
                <a href={`mailto:${COMPANY.email}`} className="hover:underline">{COMPANY.email}</a>
              </p>
              <p>{COMPANY.phone}</p>
              <p>
                {COMPANY.address.line1}<br />
                {COMPANY.address.line2}
              </p>
            </address>
          </nav>
        </div>
        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-center text-sm text-text-muted">
            © {currentYear} {COMPANY.name}. Tous droits réservés.
            {DEMO_MODE && <span className="ml-2 text-amber-600">— Site de démonstration</span>}
          </p>
        </div>
      </div>
    </footer>
  );
}