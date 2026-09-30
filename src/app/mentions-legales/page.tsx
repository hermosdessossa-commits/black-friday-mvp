import LegalPage from "@/components/LegalPage";
import { COMPANY } from "@/lib/config";

export default function MentionsLegales() {
  return (
    <LegalPage
      title="Mentions legales"
      description="Mentions legales du site Black Friday - Informations sur l'editeur, l'hebergeur et la publication."
    >
      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">1. Editeur du site</h2>
        <dl className="space-y-3 text-text-muted">
          <div>
            <dt className="font-medium text-text">Raison sociale</dt>
            <dd>{COMPANY.name}</dd>
          </div>
          <div>
            <dt className="font-medium text-text">Forme juridique</dt>
            <dd>{COMPANY.legalForm}</dd>
          </div>
          <div>
            <dt className="font-medium text-text">Capital social</dt>
            <dd>{COMPANY.capital}</dd>
          </div>
          <div>
            <dt className="font-medium text-text">SIRET / RCS</dt>
            <dd>{COMPANY.registration}</dd>
          </div>
          <div>
            <dt className="font-medium text-text">Numero TVA intracommunautaire</dt>
            <dd>{COMPANY.vatNumber}</dd>
          </div>
          <div>
            <dt className="font-medium text-text">Adresse du siege social</dt>
            <dd>
              <address className="not-italic">
                {COMPANY.address.line1}<br />
                {COMPANY.address.line2}
              </address>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-text">E-mail</dt>
            <dd><a href={`mailto:${COMPANY.email}`} className="hover:underline">{COMPANY.email}</a></dd>
          </div>
          <div>
            <dt className="font-medium text-text">Telephone</dt>
            <dd>{COMPANY.phone}</dd>
          </div>
        </dl>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">2. Directeur de la publication</h2>
        <p className="text-text-muted">{COMPANY.publicationDirector}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">3. Hebergeur du site</h2>
        <dl className="space-y-3 text-text-muted">
          <div>
            <dt className="font-medium text-text">Nom de l'hebergeur</dt>
            <dd>{COMPANY.host.name}</dd>
          </div>
          <div>
            <dt className="font-medium text-text">Adresse de l'hebergeur</dt>
            <dd>{COMPANY.host.address}</dd>
          </div>
        </dl>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">4. Propriete intellectuelle</h2>
        <p className="text-text-muted mb-4">
          L'ensemble des elements du site (textes, images, logos, marques, etc.) est la propriete exclusive de {COMPANY.name}
          ou fait l'objet d'une autorisation d'utilisation. Toute reproduction, representation, modification,
          publication, adaptation de tout ou partie des elements du site est interdite sans autorisation prealable ecrite.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">5. Donnees personnelles</h2>
        <p className="text-text-muted mb-4">
          Conformement au Reglement General sur la Protection des Donnees (RGPD) et a la loi Informatique et Libertes,
          vous disposez d'un droit d'acces, de rectification, d'effacement, de limitation, de portabilite et d'opposition
          au traitement de vos donnees personnelles.
        </p>
        <p className="text-text-muted">
          Pour exercer ces droits, contactez-nous a l'adresse <a href={`mailto:${COMPANY.email}`} className="hover:underline">{COMPANY.email}</a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">6. Cookies</h2>
        <p className="text-text-muted mb-4">
          Le site utilise des cookies strictement necessaires a son fonctionnement (panier, preferences d'affichage).
          Aucun traceur publicitaire ni analytique n'est depose sans votre consentement.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">6. Droit applicable et juridiction competente</h2>
        <p className="text-text-muted">
          Les presentes mentions legales sont regies par le droit francais. En cas de litige,
          les tribunaux francais seront seuls competents.
        </p>
      </section>

      <hr className="border-border my-8" />

      <p className="text-sm text-text-muted italic">
        {/* A FAIRE RELIRE PAR UN JURISTE */}
        Ce document est un modele generique. Il doit etre adapte a votre situation specifique
        et valide par un professionnel du droit avant mise en ligne.
      </p>
    </LegalPage>
  );
}