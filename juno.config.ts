import {defineConfig} from '@junobuild/config';

export default defineConfig({
  satellite: {
    id: '4gajz-7yaaa-aaaal-ar7kq-cai',
    source: 'build',
    predeploy: ['npm run build']
  }
});
