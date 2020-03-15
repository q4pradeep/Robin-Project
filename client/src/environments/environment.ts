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
  fileServer : 'http://localhost/vwAssets/',
  resourcePath: '../../../assets/',
  production: false,
  vehicles: {
    type: ['SUV', 'COUPE'],
    color: ['Blau', 'Grau', 'Gelb', 'Rot', 'Grün'],
    parts: [
      {'name' : 'Dach', 'link': 'Dach.png'},
      {'name' : 'Heckklappe', 'link': 'Heckklappe.png'},
      {'name' : 'Kotflügel vorne', 'link': 'Kotfl%c3%bcgel%20vorne.png'},
      {'name' : 'Motorhaube', 'link': 'Motorhaube.png'},
      {'name' : 'Rad hinten', 'link': 'Rad%20hinten.png'},
      {'name' : 'Rad vorne', 'link': 'Rad%20vorne.png'},
      {'name' : 'Restumfang', 'link': 'Restumfang.png'},
      {'name' : 'Seitenteil', 'link': 'Seitenteil.png'},
      {'name' : 'Stoßstange hinten', 'link': 'Sto%c3%9fstange%20hinten.png'},
      {'name' : 'Stoßstange vorne', 'link': 'Sto%c3%9fstange%20vorne.png'},
      {'name' : 'Türaußenblech hinten', 'link': 'T%c3%bcrau%c3%9fenblech%20hinten.png'},
      {'name' : 'Türaußenblech vorne', 'link': 'T%c3%bcrau%c3%9fenblech%20vorne.png'},
      {'name' : 'Tür hinten', 'link': 'T%c3%bcr%20hinten.png'},
      {'name' : 'Tür vorne', 'link': 'T%c3%bcr%20vorne.png'},
      {'name' : 'Windschutzscheibe', 'link': 'Windschutzscheibe.png'},
    ],
  },
};
