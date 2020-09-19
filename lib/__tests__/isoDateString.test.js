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

require('../../');

describe('toBeIsoDateStringNear', () => {

  describe('default threshold', () => {

    describe('affirmative', () => {

      const examples = [
        { value: '2020-09-01T10:44:59.000Z', target: '2020-09-01T10:45:00.000Z' },
        { value: '2020-09-01T10:45:00.000Z', target: '2020-09-01T10:45:00.000Z' },
        { value: '2020-09-01T10:45:01.000Z', target: '2020-09-01T10:45:00.000Z' }
      ];

      examples.forEach(({ value, target }) => {
        test(`${value} is near ${target}`, () => {
          expect(value).toBeIsoDateStringNear(target);
        });
      });

      examples.forEach(({ value, target }) => {
        test(`failure message: ${value} near ${target}`, () => {
          try {
            expect(value).not.toBeIsoDateStringNear(target);
          } catch(e) {
            expect(e.message).toMatchSnapshot();
          }
        });
      });

    });

    describe('negative', () => {

      const examples = [
        { value: '2020-09-01T10:44:58.000Z', target: '2020-09-01T10:45:00.000Z' },
        { value: '2020-09-01T10:45:02.000Z', target: '2020-09-01T10:45:00.000Z' },
        { value: 'zzz', target: '2020-09-01T10:45:00.000Z' },
        { value: '', target: '2020-09-01T10:45:00.000Z' },
        { value: undefined, target: '2020-09-01T10:45:00.000Z' },
        { value: null, target: '2020-09-01T10:45:00.000Z' },
        { value: NaN, target: '2020-09-01T10:45:00.000Z' },
        { value: 5, target: '2020-09-01T10:45:00.000Z' },
      ];

      examples.forEach(({ value, target }) => {
        test(`${value} is not near ${target}`, () => {
          expect(value).not.toBeIsoDateStringNear(target);
        });
      });

      examples.forEach(({ value, target }) => {
        test(`failure message: ${value} near ${target}`, () => {
          try {
            expect(value).toBeIsoDateStringNear(target);
          } catch(e) {
            expect(e.message).toMatchSnapshot();
          }
        });
      });
    });

  });

  describe('custom threshold', () => {

    describe('affirmative', () => {

      const examples = [
        { value: '2020-09-01T10:45:00.010Z', target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'milliseconds' },
        { value: '2020-09-01T10:44:59.990Z', target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'milliseconds' },

        { value: '2020-09-01T10:45:10.000Z', target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'seconds' },
        { value: '2020-09-01T10:44:50.000Z', target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'seconds' },

        { value: '2020-09-01T10:55:00.000Z', target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'minutes' },
        { value: '2020-09-01T10:35:00.000Z', target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'minutes' },

        { value: '2020-09-01T20:45:00.000Z', target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'hours' },
        { value: '2020-09-01T00:45:00.000Z', target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'hours' },

        { value: '2020-09-25T10:45:00.000Z', target: '2020-09-15T10:45:00.000Z', threshold: 10, units: 'days' },
        { value: '2020-09-05T10:45:00.000Z', target: '2020-09-15T10:45:00.000Z', threshold: 10, units: 'days' },
      ];

      examples.forEach(({ value, target, threshold, units }) => {
        test(`${value} is within ${threshold} ${units} of ${target}`, () => {
          expect(value).toBeIsoDateStringNear(target, { threshold, units });
        });
      });

      examples.forEach(({ value, target, threshold, units }) => {
        test(`failure message: ${value} within ${threshold} ${units} of ${target}`, () => {
          try {
            expect(value).not.toBeIsoDateStringNear(target, { threshold, units });
          } catch(e) {
            expect(e.message).toMatchSnapshot();
          }
        });
      });

    });

    describe('negative', () => {

      const examples = [
        { value: '2020-09-01T10:45:00.020Z', target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'milliseconds' },
        { value: 'zzz', target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'milliseconds' },
        { value: 5, target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'milliseconds' },
        { value: NaN, target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'milliseconds' },
        { value: undefined, target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'milliseconds' },
        { value: null, target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'milliseconds' },
        { value: '', target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'milliseconds' },

        { value: '2020-09-01T10:45:00.020Z', target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'milliseconds' },
        { value: '2020-09-01T10:44:59.980Z', target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'milliseconds' },

        { value: '2020-09-01T10:45:20.000Z', target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'seconds' },
        { value: '2020-09-01T10:44:40.000Z', target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'seconds' },

        { value: '2020-09-01T10:56:00.000Z', target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'minutes' },
        { value: '2020-09-01T10:34:00.000Z', target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'minutes' },

        { value: '2020-09-01T21:45:00.000Z', target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'hours' },
        { value: '2020-08-30T23:45:00.000Z', target: '2020-09-01T10:45:00.000Z', threshold: 10, units: 'hours' },

        { value: '2020-09-26T10:45:00.000Z', target: '2020-09-15T10:45:00.000Z', threshold: 10, units: 'days' },
        { value: '2020-09-04T10:45:00.000Z', target: '2020-09-15T10:45:00.000Z', threshold: 10, units: 'days' },
      ];

      examples.forEach(({ value, target, threshold, units }) => {
        test(`${value} is not within ${threshold} ${units} of ${target}`, () => {
          expect(value).not.toBeIsoDateStringNear(target, { threshold, units });
        });
      });

      examples.forEach(({ value, target, threshold, units }) => {
        test(`failure message: ${value} within ${threshold} ${units} of ${target}`, () => {
          try {
            expect(value).toBeIsoDateStringNear(target, { threshold, units });
          } catch(e) {
            expect(e.message).toMatchSnapshot();
          }
        });
      });

    });

  });

});
