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
  locations: {
    'Wolfsburg, DE': [52.4372593, 10.7637403],
    'Wolfsburg': [52.4372593, 10.7637403],

  },
  vehicles: {
    type: ['SUV', 'COUPE'],
    color: ['Blau', 'Grau', 'Gelb', 'Rot', 'Grün'],
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
    },
  },
};
