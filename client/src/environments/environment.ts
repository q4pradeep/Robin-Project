/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  fileServer: 'http://localhost/vwAssets/',
  resourcePath: '../../../assets/',
  production: false,
  vehicles: {
    type: ['SUV', 'COUPE'],
    color: ['Blau', 'Grau', 'Gelb', 'Rot', 'Grün'],
    external: ['Dach', 'Heckklappe', 'Kotflügel vorne', 'Motorhaube', 'Rad hinten', 'Rad vorne',
      'Seitenteil', 'Stoßstange hinten', 'Stoßstange vorne', 'Türaußenblech hinten', 'Türaußenblech vorne',
      'Tür hinten', 'Tür vorne', 'Windschutzscheibe',
    ],
    internal: ['Anzeige_Bedienteil', 'HUD', 'I_Tafel_Oben', 'Kombiinstrument', 'Lenkrad', 'Mittelkonsole',
      'Restumfangs', 'Tafel_Unten', 'Tuerverkleidung_hinten_oben', 'Tuerverkleidung_hinten_unten',
      'Tuerverkleidung_vorn_unten', 'Tuerverkleidung_vorn_oben' ],
    parts: {
      'Dach': 'Dach.png',
      'Heckklappe': 'Heckklappe.png',
      'Kotflügel vorne': 'Kotfl%c3%bcgel%20vorne.png',
      'Motorhaube': 'Motorhaube.png',
      'Rad hinten': 'Rad%20hinten.png',
      'Rad vorne': 'Rad%20vorne.png',
      'Restumfang': 'Restumfang.png',
      'Seitenteil': 'Seitenteil.png',
      'Stoßstange hinten': 'Sto%c3%9fstange%20hinten.png',
      'Stoßstange vorne': 'Sto%c3%9fstange%20vorne.png',
      'Türaußenblech hinten': 'T%c3%bcrau%c3%9fenblech%20hinten.png',
      'Türaußenblech vorne': 'T%c3%bcrau%c3%9fenblech%20vorne.png',
      'Tür hinten': 'T%c3%bcr%20hinten.png',
      'Tür vorne': 'T%c3%bcr%20vorne.png',
      'Windschutzscheibe': 'Windschutzscheibe.png',
      'Anzeige_Bedienteil': 'Anzeige_Bedienteil.png',
      'HUD': 'HUD.png',
      'I_Tafel_Oben': 'I_Tafel_Oben.png',
      'Kombiinstrument': 'Kombiinstrument.png',
      'Lenkrad': 'Lenkrad.png',
      'Mittelkonsole': 'Mittelkonsole.png',
      'Restumfangs': 'Restumfang.png',
      'Tafel_Unten': 'Tafel_Unten.png',
      'Tuerverkleidung_hinten_oben': 'Tuerverkleidung_hinten_oben.png',
      'Tuerverkleidung_hinten_unten': 'Tuerverkleidung_hinten_unten.png',
      'Tuerverkleidung_vorn_unten': 'Tuerverkleidung_vorn_unten.png',
      'Tuerverkleidung_vorn_oben': 'Tuerverkleidung_vorn_oben.png',
    },
  },
  locations: {
    'Wolfsburg, DE': [52.4372593, 10.7637403],
    'Wolfsburg': [52.4372593, 10.7637403],
    'Newyork' : [40.910570, -74.248589],

  },
};
