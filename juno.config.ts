import {defineConfig} from '@junobuild/config';

export default defineConfig({
  satellite: {
    id: '4icer-eiaaa-aaaal-ar7lq-cai',
    source: 'out',
    predeploy: ['npm run build']
  }
});
