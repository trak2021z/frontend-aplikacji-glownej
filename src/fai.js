import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faUserSecret);
library.add(faSearchPlus);

Vue.component('font-awesome-icon', FontAwesomeIcon);