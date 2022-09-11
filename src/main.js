import {
	createApp
} from 'vue';
import App from './App.vue';
import router from './router';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

// createApp(App).use(router).mount('#app')
const app = createApp(App);
app.component('Datepicker', Datepicker);
app.use(router);
app.mount('#app');