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

const expect = require('expect');

/**
 * Checks if a given string is in ISO Date format
 *
 * @param {string} dateString A string to test for ISO Date format
 * @returns bool Whether the given string matches ISO Date format
 */
const isISOString = (dateString) => {
  const matchISODate =
    /^([\\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\\:?00)([\\.,]\d+(?!:))?)?(\17[0-5]\d([\\.,]\d+)?)?([zZ]|([\\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
  return matchISODate.test(dateString);
};

/**
 * Helper function to convert a millisecond value to a given unit of time
 */
const millisecondsTo = {
  milliseconds: (value) => value,
  seconds: (value) => value / 1000,
  minutes: (value) => value / 1000 / 60,
  hours: (value) => value / 1000 / 60 / 60,
  days: (value) => value / 1000 / 60 / 60 / 24,
};

expect.extend({
  toBeIsoDateStringNear(actual, expected, options = {}) {
    const threshold = options.threshold || 1;
    const units = options.units || 'seconds';
    const isString = typeof actual === 'string';
    const diffMilliseconds = new Date(actual) - new Date(expected);
    const diff = Math.abs(Math.floor(millisecondsTo[units](diffMilliseconds)));
    const pass = isString && diff <= threshold;
    let observed;
    if (!isString) {
      observed = 'not a string';
    } else if (!isISOString(actual)) {
      observed = 'not an ISO date string';
    } else {
      observed = `${diff} ${units}`;
    }
    return {
      pass,
      message: () =>
        `expected ${actual} ${
          pass ? 'not ' : ''
        }to be ISO Date String within ${threshold} ${units} of ${expected} (was ${observed})`,
    };
  },
});
