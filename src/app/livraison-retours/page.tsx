import LegalPage from "@/components/LegalPage";

export default function LivraisonRetours() {
  return (
    <LegalPage
      title="Livraison et retours"
      description="Informations sur les modes de livraison, les delais, les frais et la procedure de retour."
    >
      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">1. Zones de livraison</h2>
        <p className="text-text-muted mb-4">
          Nous livrons actuellement dans les pays suivants :
        </p>
        <ul className="list-disc list-inside space-y-2 text-text-muted mb-4">
          <li>France metropolitaine (incl. Corse)</li>
          <li>[A COMPLETER : Autres pays -- ex: Belgique, Suisse, Luxembourg, Monaco]</li>
        </ul>
        <p className="text-text-muted">
          Pour les DOM-TOM et autres destinations, merci de nous contacter.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">2. Modes et delais de livraison</h2>
        <p className="text-text-muted mb-4">
          Les delais indiques sont des delais moyens en jours ouvres, a compter de l'expedition de la commande.
        </p>
        <table className="w-full border-collapse text-sm text-text-muted mb-4">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 font-medium text-text">Mode</th>
              <th className="text-left py-2 px-3 font-medium text-text">Delai indicatif</th>
              <th className="text-left py-2 px-3 font-medium text-text">Frais</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/50">
              <td className="py-2 px-3">Standard (Colissimo / Mondial Relay)</td>
              <td className="py-2 px-3">3 a 5 jours ouvres</td>
              <td className="py-2 px-3">[A COMPLETER : ex: 5,90 EUR / offert des 100 EUR]</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2 px-3">Express (Chronopost / DHL)</td>
              <td className="py-2 px-3">1 a 2 jours ouvres</td>
              <td className="py-2 px-3">[A COMPLETER : ex: 12,90 EUR]</td>
            </tr>
          </tbody>
        </table>
        <p className="text-text-muted text-sm">
          Les delais sont donnes a titre indicatif et ne constituent pas un engagement contractuel.
          En cas de retard, le client est informe par e-mail.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">3. Frais de port</h2>
        <ul className="list-disc list-inside space-y-2 text-text-muted mb-4">
          <li>France metropolitaine : [A COMPLETER : montant] -- offert des [A COMPLETER : seuil] d'achat</li>
          <li>Autres pays : [A COMPLETER : selon destination]</li>
        </ul>
        <p className="text-text-muted">
          Les frais de port exacts sont calcules et affiches avant la validation du paiement.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">3. Suivi de commande</h2>
        <p className="text-text-muted mb-4">
          Des l'expedition, un e-mail contenant le numero de suivi et le lien vers le site du transporteur
          est envoye a l'adresse e-mail indiquee lors de la commande.
        </p>
        <p className="text-text-muted">
          Le client peut egalement suivre sa commande depuis son espace client (si compte cree)
          ou en contactant le service client.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">4. Problemes de livraison</h2>
        <h3 className="text-lg font-medium text-text mb-2">Colis endomage / Produit manquant</h3>
        <p className="text-text-muted mb-4">
          Le client doit emettre des reserves precises sur le bon de livraison du transporteur
          et nous contacter sous 48 heures avec photos a l'appui.
        </p>
        <h3 className="text-lg font-medium text-text mb-2">Colis non recu / Retard anormal</h3>
        <p className="text-text-muted mb-4">
          Au-dela du delai indicatif majore de 5 jours ouvres, le client peut nous signaler
          la non-reception. Nous ouvrons une enquete aupres du transporteur.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">5. Retours et remboursements</h2>
        <h3 className="text-lg font-medium text-text mb-2">Droit de retractation (14 jours)</h3>
        <p className="text-text-muted mb-4">
          Conformement a la loi, le consommateur dispose de 14 jours calendaires a compter de la reception
          pour retourner tout article, sans justification, a ses frais (sauf si le produit est defectueux
          ou non conforme).
        </p>
        <h3 className="text-lg font-medium text-text mb-2">Procedure de retour</h3>
        <ol className="list-decimal list-inside space-y-2 text-text-muted mb-4">
          <li>Contacter le service client (<a href="mailto:[A COMPLETER : email]" className="hover:underline">[A COMPLETER : email]</a>)
              en indiquant le numero de commande et le(s) article(s) concerne(s).</li>
          <li>Recevoir l'autorisation de retour et l'etiquette (si applicable).</li>
          <li>Emballer soigneusement le(s) produit(s) dans leur emballage d'origine avec tous les accessoires.</li>
          <li>Deposer le colis en point relais ou bureau de poste selon les instructions fournies.</li>
        </ol>
        <h3 className="text-lg font-medium text-text mb-2">Conditions d'acceptation</h3>
        <ul className="list-disc list-inside space-y-2 text-text-muted mb-4">
          <li>Produit dans son etat d'origine, non utilise, non lave, non endommage</li>
          <li>Etiquettes et emballage d'origine presents</li>
          <li>Tous les accessoires et notices inclus</li>
        </ul>
        <h3 className="text-lg font-medium text-text mb-2">Remboursement</h3>
        <ul className="list-disc list-inside space-y-2 text-text-muted mb-4">
          <li>Effectue sous 14 jours a compter de la reception du retour dans nos entrepots</li>
          <li>Sur le meme moyen de paiement que la commande initiale</li>
          <li>Frais de retour a la charge du client (sauf produit defectueux/non conforme)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">4. Produits defectueux / Non-conformes</h2>
        <p className="text-text-muted mb-4">
          En cas de produit defectueux ou non conforme, les frais de retour sont a notre charge.
          Le client beneficie de la garantie legale de conformite (2 ans) et de la garantie des vices caches (2 ans).
        </p>
        <p className="text-text-muted">
          Contactez-nous avec photos et description du probleme pour une prise en charge rapide.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-medium text-text mb-4">5. Contact</h2>
        <p className="text-text-muted">
          Pour toute question relative a la livraison ou aux retours :<br />
          <a href="mailto:[A COMPLETER : email]" className="hover:underline">[A COMPLETER : email]</a><br />
          [A COMPLETER : telephone]<br />
          Du lundi au vendredi, 9h-18h (hors jours feries)
        </p>
      </section>

      <hr className="border-border my-8" />

      <p className="text-sm text-text-muted italic">
        {/* A FAIRE RELIRE PAR UN JURISTE */}
        Ce document est un modele generique. Les delais, frais et pays doivent etre confirmes
        selon vos accords transporteurs et votre strategie commerciale.
      </p>
    </LegalPage>
  );
}