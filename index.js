/*
 * Copyright 2020 Centrapay
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const moment = require('moment');
const expect = require('expect');

expect.extend({
  toBeIsoDateStringNear(actual, expected, options = {}) {
    const threshold = options.threshold || 1;
    const units = options.units || 'seconds';
    const isString = typeof actual === 'string';
    const m = moment(actual, moment.ISO_8601);
    const diff = Math.abs(m.diff(expected, units));
    const pass = isString && diff <= threshold;
    let observed = `${diff} ${units}`;
    if (!isString) {
      observed = 'not a string';
    } else if (!m.isValid()) {
      observed = 'not an ISO date string';
    }
    return {
      pass,
      message: () => `expected ${actual} ${ pass ? 'not ' : ''}to be ISO Date String within ${threshold} ${units} of ${expected} (was ${observed})`
    };
  },
});
