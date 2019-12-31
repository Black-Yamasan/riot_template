import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@webcomponents/template';

import * as riot from 'riot';
import hello from '../riot/hello.riot';
riot.register('hello', hello);
riot.mount('hello');


async function hoge() {
  try {
    const data = '!!!';
    return data;
  } catch(err) {
    console.error(err);
  }
}

hoge().then((data) => {
  console.log(data);
});