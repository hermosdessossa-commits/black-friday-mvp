import LegalPage from "@/components/LegalPage";

export default function CGV() {
  return (
    <LegalPage
      title="Conditions generales de vente"
      description="Conditions generales de vente applicables aux achats effectues sur le site Black Friday."
    >
      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">1. Objet</h2>
        <p className="text-text-muted mb-4">
          Les presentes conditions generales de vente (CGV) regissent les relations contractuelles entre
          l'editeur du site et tout client effectuant un achat sur le site Black Friday.
        </p>
        <p className="text-text-muted">
          Toute commande implique l'acceptation sans reserve des presentes CGV.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">2. Produits et prix</h2>
        <p className="text-text-muted mb-4">
          Les produits proposes a la vente sont ceux figurant sur le site au jour de la consultation par l'utilisateur.
        </p>
        <p className="text-text-muted mb-4">
          Les prix sont indiques en euros, toutes taxes comprises (TTC) <strong className="text-text">[A CONFIRMER : TTC ou HT ?]</strong>,
          hors frais de livraison qui sont factures en supplement et indiques avant la validation de la commande.
        </p>
        <p className="text-text-muted">
          L'editeur se reserve le droit de modifier les prix a tout moment, mais les produits sont factures
          sur la base des tarifs en vigueur au moment de l'enregistrement de la commande.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">3. Commande</h2>
        <p className="text-text-muted mb-4">
          La commande est passee en ligne. Le client doit suivre la procedure de commande indiquee sur le site.
        </p>
        <p className="text-text-muted mb-4">
          La validation de la commande implique l'acceptation des presentes CGV, la reconnaissance
          d'en avoir parfait connaissance et la renonciation a se prevaloir de ses propres conditions d'achat.
        </p>
        <p className="text-text-muted">
          L'editeur se reserve le droit de refuser ou d'annuler toute commande d'un client avec lequel
          existerait un litige relatif au paiement d'une commande anterieure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">4. Paiement</h2>
        <p className="text-text-muted mb-4">
          Le paiement s'effectue en ligne par carte bancaire via Stripe, ou par tout autre moyen propose sur le site.
        </p>
        <p className="text-text-muted mb-4">
          La commande n'est consideree comme effective qu'apres confirmation du paiement par l'organisme bancaire.
        </p>
        <p className="text-text-muted">
          En cas de refus d'autorisation de paiement par l'organisme emetteur, la commande est automatiquement annulee.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">5. Livraison</h2>
        <p className="text-text-muted mb-4">
          Les delais et frais de livraison sont indiques sur la page <a href="/livraison-retours" className="hover:underline">Livraison et retours</a>.
        </p>
        <p className="text-text-muted mb-4">
          Les produits sont livres a l'adresse indiquee par le client lors de la commande.
          L'editeur ne saurait etre tenu responsable en cas d'erreur dans la saisie des coordonnees du destinataire.
        </p>
        <p className="text-text-muted">
          Les risques sont transferes au client des la remise des produits au transporteur.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">6. Droit de retractation</h2>
        <p className="text-text-muted mb-4">
          Conformement a l'article L. 221-18 du Code de la consommation, le consommateur dispose d'un delai
          de 14 jours calendaires pour exercer son droit de retractation sans avoir a justifier de motifs ni a payer de penalites.
        </p>
        <p className="text-text-muted mb-4">
          Le delai court a compter de la reception du bien par le consommateur ou un tiers designe par lui.
        </p>
        <p className="text-text-muted mb-4">
          Pour exercer ce droit, le client doit notifier sa decision de se retracter par une declaration depourvue d'ambiguite
          (par courrier postal ou e-mail) a l'adresse indiquee dans les mentions legales.
        </p>
        <p className="text-text-muted mb-4">
          <strong className="text-text">Formulaire type de retractation :</strong>
        </p>
        <blockquote className="border-l-4 border-border pl-4 my-4 text-text-muted italic">
          A l'attention de [NOM DE L'ENTREPRISE],<br />
          [ADRESSE]<br />
          [EMAIL]<br /><br />
          Je vous notifie par la presente ma retractation du contrat portant sur la vente du bien ci-dessous :<br />
          -- Commande le [*] / recu le [*]<br />
          -- Numero de commande : [*]<br />
          -- Nom du consommateur : [*]<br />
          -- Adresse du consommateur : [*]<br /><br />
          Fait le [*], Signature du consommateur (uniquement en cas de notification sur papier)
        </blockquote>
        <p className="text-text-muted mb-4">
          En cas de retractation, l'editeur rembourse la totalite des sommes versees, y compris les frais de livraison
          (a l'exception des frais supplementaires si le consommateur a choisi un mode de livraison plus couteux
          que la livraison standard), sans retard excessif et au plus tard dans les 14 jours a compter de la
          reception de la notification de retractation.
        </p>
        <p className="text-text-muted">
          Le remboursement est effectue en utilisant le meme moyen de paiement que celui utilise pour la transaction initiale,
          sauf accord exprime du consommateur pour un autre moyen.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">7. Garanties legales</h2>
        <p className="text-text-muted mb-4">
          L'editeur est tenu des defauts de conformite du bien au contrat dans les conditions de
          l'article L. 217-4 et suivants du Code de la consommation, ainsi que des defauts caches de la chose vendue
          dans les conditions prevues aux articles 1641 et suivants du Code civil.
        </p>
        <p className="text-text-muted mb-4">
          En cas de defaut de conformite, le consommateur a droit a la reparation ou au remplacement du bien,
          ou a une reduction du prix ou a la resolution du contrat, dans les conditions prevues par la loi.
        </p>
        <p className="text-text-muted">
          La garantie legale de conformite s'applique pendant 2 ans a compter de la delivrance du bien.
          La garantie des vices caches s'applique pendant 2 ans a compter de la decouverte du vice.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">8. Responsabilite</h2>
        <p className="text-text-muted mb-4">
          L'editeur ne saurait etre tenu pour responsable de l'inexecution du contrat en cas de rupture de stock,
          d'indisponibilite du produit, de force majeure, de perturbation ou greve totale ou partielle notamment
          des services postaux et moyens de transport et/ou communications, inondation, incendie.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">9. Mediation de la consommation</h2>
        <p className="text-text-muted mb-4">
          Conformement aux articles L. 612-1 et suivants du Code de la consommation, le consommateur a la possibilite
          de recourir gratuitement a un mediateur de la consommation en vue de la resolution amiable du litige
          qui l'oppose a l'editeur.
        </p>
        <p className="text-text-muted">
          Le mediateur competent est : <strong>[A COMPLETER : Nom et coordonnees du mediateur]</strong>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">10. Droit applicable et juridiction competente</h2>
        <p className="text-text-muted">
          Les presentes CGV sont regies par le droit francais. En cas de litige, les tribunaux francais seront seuls competents,
          sans prejudice des regles imperatives de protection du consommateur.
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