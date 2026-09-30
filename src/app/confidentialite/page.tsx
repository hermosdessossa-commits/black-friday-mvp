import LegalPage from "@/components/LegalPage";

export default function Confidentialite() {
  return (
    <LegalPage
      title="Politique de confidentialite"
      description="Politique de confidentialite du site Black Friday - Protection des donnees personnelles, cookies, droits RGPD."
    >
      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">1. Responsable du traitement</h2>
        <p className="text-text-muted mb-4">
          Le responsable du traitement des donnees collectees sur ce site est :
        </p>
        <dl className="space-y-2 text-text-muted">
          <div>
            <dt className="font-medium text-text">Raison sociale</dt>
            <dd>[A COMPLETER : Nom de l'entreprise]</dd>
          </div>
          <div>
            <dt className="font-medium text-text">Forme juridique</dt>
            <dd>[A COMPLETER : Forme juridique]</dd>
          </div>
          <div>
            <dt className="font-medium text-text">Adresse</dt>
            <dd>[A COMPLETER : Adresse complete]</dd>
          </div>
          <div>
            <dt className="font-medium text-text">E-mail DPO / Contact RGPD</dt>
            <dd><a href="mailto:[A COMPLETER : email RGPD]" className="hover:underline">[A COMPLETER : email RGPD]</a></dd>
          </div>
        </dl>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">2. Donnees collectees</h2>
        <p className="text-text-muted mb-4">
          Aucune inscription ni creation de compte n'est requise pour naviguer ou acheter sur le site.
        </p>
        <p className="text-text-muted mb-4">
          Les donnees collecteees lors d'une commande sont strictement necessaires au traitement de celle-ci :
        </p>
        <ul className="list-disc list-inside space-y-2 text-text-muted mb-4">
          <li>Nom, prenom</li>
          <li>Adresse e-mail</li>
          <li>Adresse de facturation et de livraison</li>
          <li>Numero de telephone (optionnel, pour la livraison)</li>
          <li>Donnees de paiement (traitees exclusivement par Stripe, non stockees sur nos serveurs)</li>
        </ul>
        <p className="text-text-muted mb-4">
          Donnees techniques (strictement necessaires au fonctionnement) :
        </p>
        <ul className="list-disc list-inside space-y-2 text-text-muted mb-4">
          <li>Contenu du panier (stocke localement dans le navigateur via localStorage)</li>
          <li>Preferences d'affichage (etat du panier ouvert/ferme, stocke localement)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">3. Finalites et bases legales</h2>
        <dl className="space-y-4 text-text-muted mb-4">
          <div>
            <dt className="font-medium text-text">Traitement des commandes</dt>
            <dd>Execution du contrat (art. 6.1.b RGPD)</dd>
          </div>
          <div>
            <dt className="font-medium text-text">Paiement</dt>
            <dd>Execution du contrat + obligation legale (art. 6.1.b et 6.1.c RGPD)</dd>
          </div>
          <div>
            <dt className="font-medium text-text">Livraison</dt>
            <dd>Execution du contrat (art. 6.1.b RGPD)</dd>
          </div>
          <div>
            <dt className="font-medium text-text">Gestion des reclamations / SAV</dt>
            <dd>Interet legitime (art. 6.1.f RGPD)</dd>
          </div>
          <div>
            <dt className="font-medium text-text">Fonctionnement du site (panier, preferences)</dt>
            <dd>Interet legitime / Strictement necessaire (art. 6.1.f RGPD)</dd>
          </div>
        </dl>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">3. Destinataires des donnees</h2>
        <ul className="list-disc list-inside space-y-2 text-text-muted mb-4">
          <li>Stripe (paiement) -- soustraitant, conformement a son DPA</li>
          <li>Transporteurs (livraison) -- nom, adresse, telephone</li>
          <li>Autorites judiciaires / administratives -- sur requisition legale</li>
        </ul>
        <p className="text-text-muted">
          Aucune donnee n'est vendue, louee ou cedee a des tiers a des fins commerciales.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">5. Transferts hors UE</h2>
        <p className="text-text-muted mb-4">
          Stripe (processeur de paiement) peut transferer des donnees vers les Etats-Unis dans le cadre
          de son Data Processing Agreement et des clauses contractuelles types de la Commission europeenne.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">6. Duree de conservation</h2>
        <ul className="list-disc list-inside space-y-2 text-text-muted mb-4">
          <li>Donnees de commande : 10 ans (obligation comptable et fiscale)</li>
          <li>Donnees de paiement (Stripe) : selon la politique de Stripe</li>
          <li>Donnees de panier (localStorage) : jusqu'a suppression manuelle par l'utilisateur</li>
          <li>Preferences d'affichage : duree de la session + persistance locale</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">7. Vos droits</h2>
        <p className="text-text-muted mb-4">
          Conformement au RGPD (articles 15 a 22), vous disposez des droits suivants :
        </p>
        <ul className="list-disc list-inside space-y-2 text-text-muted mb-4">
          <li>Droit d'acces : obtenir la confirmation du traitement et une copie de vos donnees</li>
          <li>Droit de rectification : corriger des donnees inexactes ou incompletes</li>
          <li>Droit a l'effacement (droit a l'oubli) dans les limites legales</li>
          <li>Droit a la limitation du traitement</li>
          <li>Droit a la portabilite : recevoir vos donnees dans un format structure</li>
          <li>Droit d'opposition : vous opposer au traitement pour des motifs legitimes</li>
          <li>Droit de ne pas faire l'objet d'une decision automatisee</li>
        </ul>
        <p className="text-text-muted mb-4">
          Pour exercer ces droits, contactez le DPO a l'adresse indiquee en section 1.
        </p>
        <p className="text-text-muted">
          Vous avez egalement le droit d'introduire une reclamation aupres de la CNIL
          (<a href="https://www.cnil.fr" target="_blank" rel="noopener" className="hover:underline">www.cnil.fr</a>).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">8. Cookies et stockage local</h2>
        <p className="text-text-muted mb-4">
          Le site n'utilise que des cookies et stockage local strictement necessaires :
        </p>
        <ul className="list-disc list-inside space-y-2 text-text-muted mb-4">
          <li><strong>localStorage (panier)</strong> : identifiants produits + quantites -- duree : jusqu'a suppression manuelle</li>
          <li><strong>localStorage (preferences UI)</strong> : etat du panier (ouvert/ferme) -- duree : jusqu'a suppression manuelle</li>
        </ul>
        <p className="text-text-muted">
          Aucun cookie publicitaire, analytique, de suivi ou tiers n'est depose.
          Aucun bandeau de consentement n'est donc necessaire.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">9. Securite</h2>
        <p className="text-text-muted mb-4">
          Le site utilise HTTPS (TLS 1.2+). Les paiements sont entierement geres par Stripe
          (certifie PCI DSS Level 1). Aucune donnee bancaire ne transite par nos serveurs.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">10. Modifications</h2>
        <p className="text-text-muted">
          La presente politique peut etre modifiee a tout moment. La version applicable est celle en ligne
          au moment de votre visite. Les modifications substantielles feront l'objet d'une information sur le site.
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