import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@webcomponents/template';

import * as riot from 'riot';
import hello from '@/riot/hello';
riot.register('hello', hello);
riot.mount('hello');
