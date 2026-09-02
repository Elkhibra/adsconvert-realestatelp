import React from "react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#F4F4F5] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        {/* Header */}
        <div className="mb-10">
          <span className="text-[#FD1843] font-bold text-xs tracking-widest uppercase mb-2 block">
            Mentions Légales
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0D0D0F] tracking-tight mb-4">
            Politique de Confidentialité
          </h1>
          <p className="text-gray-500 text-sm">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>

        {/* Intro */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          La présente politique décrit comment AdsConvert (ci-après « nous »)
          collecte, utilise, protège et partage vos données personnelles lorsque
          vous utilisez notre site web et remplissez nos formulaires de contact.
          En utilisant notre site, vous acceptez les pratiques décrites
          ci-dessous.
        </p>

        <div className="space-y-8 text-gray-700">
          {/* Section 1 */}
          <section>
            <h2 className="text-lg font-bold text-[#0D0D0F] border-b border-gray-200 pb-2 mb-4">
              1. Responsable du Traitement
            </h2>
            <p className="leading-relaxed">
              Le responsable du traitement de vos données est{" "}
              <strong>AdsConvert</strong>. Pour toute question relative à la
              présente politique ou à vos données, vous pouvez nous contacter à
              l'adresse e-mail associée à notre domaine.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-lg font-bold text-[#0D0D0F] border-b border-gray-200 pb-2 mb-4">
              2. Données que nous collectons
            </h2>
            <p className="mb-3">
              Nous collectons uniquement les données nécessaires à la fourniture
              de nos services :
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong>Données de contact :</strong> nom, adresse e-mail,
                numéro de téléphone / WhatsApp.
              </li>
              <li>
                <strong>Données de qualification immobilière :</strong> type de
                bien, budget, urgence du projet, et autres réponses fournies via
                nos formulaires.
              </li>
              <li>
                <strong>Données de navigation :</strong> pages visitées, adresse
                IP (anonymisée), collectées via des cookies et pixels de mesure.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-lg font-bold text-[#0D0D0F] border-b border-gray-200 pb-2 mb-4">
              3. Finalités et Bases Légales (Conformité Meta)
            </h2>
            <p className="mb-3">
              Vos données sont traitées exclusivement pour les finalités
              suivantes :
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                Répondre à vos demandes et vous contacter concernant votre
                projet immobilier (Appel, WhatsApp ou E-mail).
              </li>
              <li>
                Garantir un suivi personnalisé dans notre système de gestion de
                la relation client (CRM).
              </li>
              <li>
                <strong>Engagement strict :</strong> Vos données ne seront{" "}
                <strong>jamais</strong> vendues, louées ou cédées à des tiers à
                des fins commerciales.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-lg font-bold text-[#0D0D0F] border-b border-gray-200 pb-2 mb-4">
              4. Partage avec des tiers
            </h2>
            <p className="mb-3">
              Nous partageons vos données uniquement avec les prestataires
              techniques (sous-traitants) qui nous aident à fournir le service :
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong>Meta Platforms :</strong> Mesure d'audience publicitaire
                (Pixel) conformément aux règles de Meta.
              </li>
              <li>
                <strong>Supabase / Vercel :</strong> Hébergement et stockage
                sécurisé des bases de données.
              </li>
              <li>
                <strong>Make.com :</strong> Automatisation technique et routage
                interne des notifications.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-lg font-bold text-[#0D0D0F] border-b border-gray-200 pb-2 mb-4">
              5. Durée de conservation
            </h2>
            <p className="leading-relaxed">
              Nous conservons vos données le temps nécessaire pour traiter votre
              demande immobilière, puis pour la durée imposée par nos
              obligations légales. Les données inactives sont supprimées de nos
              bases de prospection de manière sécurisée.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-lg font-bold text-[#0D0D0F] border-b border-gray-200 pb-2 mb-4">
              6. Vos Droits
            </h2>
            <p className="leading-relaxed">
              Conformément à la loi marocaine n° 09-08 relative à la protection
              des personnes physiques à l'égard du traitement des données à
              caractère personnel, vous disposez d'un droit d'accès, de
              rectification, et d'opposition au traitement de vos données. Vous
              pouvez exercer ce droit à tout moment en nous contactant.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-lg font-bold text-[#0D0D0F] border-b border-gray-200 pb-2 mb-4">
              7. Sécurité
            </h2>
            <p className="leading-relaxed">
              Nous mettons en œuvre des mesures techniques et organisationnelles
              (chiffrement, accès restreint) pour protéger vos données contre
              tout accès, altération ou divulgation non autorisée.
            </p>
          </section>
        </div>

        {/* Footer / Back Button */}
        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <Link
            to="/"
            className="inline-block bg-[#0D0D0F] text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
