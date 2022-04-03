import * as riot from 'riot';
import hello from '@/riot/hello';
import '../styles/pages/demo.scss';
riot.register('hello', hello);
riot.mount('hello');
