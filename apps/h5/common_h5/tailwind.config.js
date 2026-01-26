// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   ...require('@all-in-one/tailwind-config'),
//   content: [
//     './src/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
// }

import tailwindConfig from '@all-in-one/tailwind-config';

module.exports = {
  ...tailwindConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}
