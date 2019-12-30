import * as riot from 'riot'
import hello from '../riot/hello.riot';

riot.register('hello', hello);
riot.mount('hello');