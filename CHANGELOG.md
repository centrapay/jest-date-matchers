# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.0.3 - 2022-01-17
### Removed
- momentjs dependency
### Added
- millisecondsTo helper
- isISOString() pattern matcher
### Changed
- toBeIsoDateStringNear() to use millisecondsTo helper
- toBeIsoDateStringNear() to use isISOString pattern matcher

## 1.0.2 - 2020-09-21
### Changed
- relax dependency version constraints

## 1.0.1 - 2020-09-21
### Changed
- fix typo in readme usage instructions

## 1.0.0 - 2020-09-20
### Added
- toBeIsoDateStringNear assertion
