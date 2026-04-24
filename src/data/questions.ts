/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Option {
  label: string;
  populationPercentage: number; // Approximate percentage of world population with this trait
}

export interface Question {
  id: string;
  category: 'Vital' | 'Social' | 'Material';
  text: string;
  options: Option[];
  hint?: string;
}

export const questions: Question[] = [
  // VITAL (1-15)
  {
    id: 'v1',
    category: 'Vital',
    text: 'Accès à l\'eau potable gérée en toute sécurité ?',
    hint: 'France : 100%. Ce critère est principalement rempli par les pays de l\'OCDE et quelques émergents (environ 80 pays).',
    options: [
      { label: 'Oui', populationPercentage: 74 },
      { label: 'Non (accès limité ou non amélioré)', populationPercentage: 26 }
    ]
  },
  {
    id: 'v2',
    category: 'Vital',
    text: 'Accès à des installations sanitaires privées ?',
    hint: 'Toilettes non partagées reliées aux égouts. Environ 110 pays n\'ont pas encore généralisé cet accès.',
    options: [
      { label: 'Oui', populationPercentage: 54 },
      { label: 'Non (partagé ou inexistant)', populationPercentage: 46 }
    ]
  },
  {
    id: 'v3',
    category: 'Vital',
    text: 'Consommation calorique quotidienne suffisante ?',
    hint: 'Seuil : 2000 kcal/jour. France : la sous-alimentation touche < 2.5% de la population.',
    options: [
      { label: 'Oui', populationPercentage: 89 },
      { label: 'Non (sous-alimentation)', populationPercentage: 11 }
    ]
  },
  {
    id: 'v4',
    category: 'Vital',
    text: 'Accès à des soins de santé essentiels de proximité ?',
    hint: 'Possibilité de voir un médecin en moins de 2h. Inaccessible pour 50% de l\'humanité.',
    options: [
      { label: 'Oui', populationPercentage: 50 },
      { label: 'Non / Aléatoire', populationPercentage: 50 }
    ]
  },
  {
    id: 'v7',
    category: 'Vital',
    text: 'Espérance de vie dans votre pays > 75 ans ?',
    hint: 'France : 82.5 ans. Seuls 90 pays sur 195 dépassent ce seuil.',
    options: [
      { label: 'Oui', populationPercentage: 45 },
      { label: 'Non', populationPercentage: 55 }
    ]
  },
  {
    id: 'v14',
    category: 'Vital',
    text: 'Taux de mortalité infantile dans votre pays < 5 pour 1000 ?',
    hint: 'France : 3.5. Ce critère exclut 150 pays sur 195.',
    options: [
      { label: 'Oui', populationPercentage: 18 },
      { label: 'Non', populationPercentage: 82 }
    ]
  },
  {
    id: 'v15',
    category: 'Vital',
    text: 'Accès à une alimentation variée (protéines, légumes, fruits) ?',
    hint: 'Diversité alimentaire minimale. Inaccessible pour 3.1 milliards de personnes.',
    options: [
      { label: 'Oui', populationPercentage: 60 },
      { label: 'Non (monotone)', populationPercentage: 40 }
    ]
  },
  // SOCIAL (16-33)
  {
    id: 's1',
    category: 'Social',
    text: 'Alphabétisation (savoir lire et écrire) ?',
    hint: 'France : 99%. Dans 20 pays, le taux d\'alphabétisation est encore inférieur à 50%.',
    options: [
      { label: 'Oui', populationPercentage: 87 },
      { label: 'Non', populationPercentage: 13 }
    ]
  },
  {
    id: 's3',
    category: 'Social',
    text: 'Diplôme de l\'enseignement supérieur (Bachelor+) ?',
    hint: 'France : ~40% des jeunes. Niveau mondial : Seulement 7% de l\'humanité possède un diplôme universitaire.',
    options: [
      { label: 'Oui', populationPercentage: 7 },
      { label: 'Non', populationPercentage: 93 }
    ]
  },
  {
    id: 's5',
    category: 'Social',
    text: 'Vivre dans une démocratie libérale stable ?',
    hint: 'France : OUI. Seuls 30 pays sont classés comme "démocraties libérales" par V-Dem.',
    options: [
      { label: 'Oui', populationPercentage: 14 },
      { label: 'Non', populationPercentage: 86 }
    ]
  },
  {
    id: 's8',
    category: 'Social',
    text: 'Propriétaire d\'un passeport puissant (liberté de voyage) ?',
    hint: 'France : 1er mondial. Accès sans visa à 194 pays. La majorité des humains ont besoin de visas coûteux pour voyager.',
    options: [
      { label: 'Oui', populationPercentage: 15 },
      { label: 'Non / Faible', populationPercentage: 85 }
    ]
  },
  {
    id: 's12',
    category: 'Social',
    text: 'Possession d\'un compte bancaire ?',
    hint: '76% des adultes mondiaux ont un compte, mais ce chiffre tombe à 10% dans certains pays d\'Afrique.',
    options: [
      { label: 'Oui', populationPercentage: 76 },
      { label: 'Non', populationPercentage: 24 }
    ]
  },
  {
    id: 's13',
    category: 'Social',
    text: 'Accès à un système de retraite ou sécurité sociale ?',
    hint: 'France : Système universel. Environ 4 milliards de personnes n\'ont aucune protection sociale.',
    options: [
      { label: 'Oui', populationPercentage: 45 },
      { label: 'Non', populationPercentage: 55 }
    ]
  },
  // MATERIAL (34-50)
  {
    id: 'm1',
    category: 'Material',
    text: 'Revenu quotidien supérieur à 6.85$ ?',
    hint: 'France (SMIC net/jour) : ~50$. Près de 4 milliards de personnes vivent avec moins de 6.85$ par jour.',
    options: [
      { label: 'Oui', populationPercentage: 50 },
      { label: 'Non', populationPercentage: 50 }
    ]
  },
  {
    id: 'm2',
    category: 'Material',
    text: 'Accès stable à l\'électricité 24h/24 ?',
    hint: 'Inaccessible pour 760 millions de personnes, principalement en Afrique Subsaharienne.',
    options: [
      { label: 'Oui', populationPercentage: 70 },
      { label: 'Non', populationPercentage: 30 }
    ]
  },
  {
    id: 'm4',
    category: 'Material',
    text: 'Possession d\'un ordinateur personnel ?',
    hint: 'France : 86% des foyers. Facteur de réduction majeur dans l\'hémisphère Sud où le smartphone est l\'unique outil.',
    options: [
      { label: 'Oui', populationPercentage: 48 },
      { label: 'Non', populationPercentage: 52 }
    ]
  },
  {
    id: 'm8',
    category: 'Material',
    text: 'Possession d\'un réfrigérateur fonctionnel ?',
    hint: 'France : 99%. Moyen-Orient / Afrique : Moins de 30% dans les zones rurales.',
    options: [
      { label: 'Oui', populationPercentage: 60 },
      { label: 'Non', populationPercentage: 40 }
    ]
  },
  {
    id: 'm10',
    category: 'Material',
    text: 'Épargne de précaution (3 mois de dépenses) ?',
    hint: 'France : 1 foyer sur 4 est en fragilité financière. Monde : 85% n\'ont aucune épargne liquide.',
    options: [
      { label: 'Oui', populationPercentage: 15 },
      { label: 'Non', populationPercentage: 85 }
    ]
  },
  {
    id: 'm11',
    category: 'Material',
    text: 'Avez-vous déjà voyagé en avion ?',
    hint: '80% de l\'humanité n\'a jamais mis le pied dans un avion.',
    options: [
      { label: 'Oui', populationPercentage: 20 },
      { label: 'Non', populationPercentage: 80 }
    ]
  },
  {
    id: 'm17',
    category: 'Material',
    text: 'Abonnement à un service de streaming (Netflix, Spotify...) ?',
    hint: 'Luxe immatériel. Concerne environ 1.5 milliard d\'abonnements dans le monde (souvent les mêmes personnes).',
    options: [
      { label: 'Oui', populationPercentage: 15 },
      { label: 'Non', populationPercentage: 85 }
    ]
  },
  {
    id: 'm18',
    category: 'Material',
    text: 'Possession d\'une climatisation ou chauffage central ?',
    hint: 'Seuls 8% des 2.8 milliards de personnes vivant dans les pays les plus chauds ont la clim.',
    options: [
      { label: 'Oui', populationPercentage: 25 },
      { label: 'Non', populationPercentage: 75 }
    ]
  },
  {
    id: 's20',
    category: 'Social',
    text: 'Liberté de religion ou de conviction ?',
    hint: 'Une répression sévère existe dans environ 60 pays.',
    options: [
      { label: 'Oui', populationPercentage: 35 },
      { label: 'Non', populationPercentage: 65 }
    ]
  },
  {
    id: 's21',
    category: 'Social',
    text: 'Confiance dans la police et la justice locale ?',
    hint: 'Indicateur de stabilité institutionnelle. Très bas dans 70% des pays en développement.',
    options: [
      { label: 'Oui', populationPercentage: 40 },
      { label: 'Non', populationPercentage: 60 }
    ]
  },
  {
    id: 'm22',
    category: 'Material',
    text: 'Propriétaire de votre logement ?',
    hint: 'Seuil variable selon les pays, mais un actif de sécurité majeur.',
    options: [
      { label: 'Oui', populationPercentage: 55 },
      { label: 'Non', populationPercentage: 45 }
    ]
  },
  {
    id: 'm23',
    category: 'Material',
    text: 'Possession d\'un véhicule motorisé (Voiture/Moto) ?',
    hint: 'France : 85%. Monde : Seulement 18% possèdent une voiture.',
    options: [
      { label: 'Oui', populationPercentage: 35 },
      { label: 'Non', populationPercentage: 65 }
    ]
  },
  {
    id: 'v24',
    category: 'Vital',
    text: 'Qualité de l\'air (PM2.5) conforme aux normes OMS ?',
    hint: 'Seul 1 humain sur 10 respire un air considéré comme "propre" par l\'OMS.',
    options: [
      { label: 'Oui', populationPercentage: 10 },
      { label: 'Non', populationPercentage: 90 }
    ]
  },
  {
    id: 's25',
    category: 'Social',
    text: 'Égalité des droits hommes-femmes effective ?',
    hint: 'Inégale dans la loi ou les faits dans 115 pays.',
    options: [
      { label: 'Oui', populationPercentage: 30 },
      { label: 'Non', populationPercentage: 70 }
    ]
  },
  {
    id: 's26',
    category: 'Social',
    text: 'Liberté d\'expression garantie ?',
    hint: 'Indice Reporters Sans Frontières : Seule 1 personne sur 4 vit dans un pays "libre".',
    options: [
      { label: 'Oui', populationPercentage: 24 },
      { label: 'Non', populationPercentage: 76 }
    ]
  },
  {
    id: 'm27',
    category: 'Material',
    text: 'Accès à l\'eau chaude courante ?',
    hint: 'Standard en Occident, mais un luxe technologique mondial (environ 110 pays exclus).',
    options: [
      { label: 'Oui', populationPercentage: 40 },
      { label: 'Non', populationPercentage: 60 }
    ]
  },
  {
    id: 's28',
    category: 'Social',
    text: 'Possibilité de se syndiquer ou de manifester librement ?',
    hint: 'Répression forte dans plus de 80 pays.',
    options: [
      { label: 'Oui', populationPercentage: 50 },
      { label: 'Non', populationPercentage: 50 }
    ]
  }
];
