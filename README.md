# Jest Date Matchers

Centrapay Jest date matchers.

Matches date strings within a configurable threshold range.


## Installation

```bash
npm install @centrapay/jest-date-matchers
```

## Usage

```javascript
// Add to jest.config.js:
module.exports = {
  setupFilesAfterEnv: [ '@centrapay/jest-date-matchers' ],
};

// or add to a cucumber support file:
require('@centrapay/jest-date-matchers');

// then use assertion in test or step definition:
const payload = { createdAt: '2020-09-01T10:45:00.250Z' };
expect(payload.createdAt).toBeIsoDateStringNear('2020-09-01T10:45:00.000Z'); // default match within 1 second
expect(payload.createdAt).toBeIsoDateStringNear(moment(), { threshold: 10, unit: 'seconds' });
```


## History

See [Changelog](./CHANGELOG.md)

## Legal

Copyright © 2020 [Centrapay][].

This software is licensed under Apache-2.0 License. Please see [LICENSE](/LICENSE) for details.


[Centrapay]: https://centrapay.com/
