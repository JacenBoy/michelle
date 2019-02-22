# Changelog
All notable changes to this project will be documented in this file.

## 1.4 - A Random Update (2019-02-21)
- `m-random` command added
- Package updates
- Changelog typo fixed
- Error fixed in example config file

### 1.4.1
- Added message at beginning of `m-random` to let user know something is happening
- package.js update to lastest stable version of node and npm

## 1.3 - Updatebooru (2019-02-06)
- `m-booru` command added
- [booru](https://www.npmjs.com/package/booru) wrapper added
- Various package upgrades
- Various styling fixes

### 1.3.1
- Added more useful title link for `m-booru` results
- Comma separated tags instead of space separated

### 1.3.2
- `m-version` command added
- `m-stats` reopened for use by all users
- Fixed [issue #38: underscores not properly added](https://github.com/JacenBoy/michelle/issues/38)

### 1.3.3
- Added status page for third-party services to check uptime
- Tweaked `randInt` function

## 1.2 - The Great List-ening (2019-01-23)
- `m-list` command added

### 1.2.1
- Added error for missing Romaji titles in `m-mangasearch`
- Added randInt function
- package-lock.json updates

### 1.2.2
- Fixed [issue #15: Missing romaji titles](https://github.com/JacenBoy/michelle/issues/15)

## 1.1 - Logging Update (2019-01-23)
- `m-support` command added
- Added logging to various commands to assist with debugging and troubleshooting
- Edited example config.js for streamlining
- Various style and consistency tweaks

### 1.1.1
- Changed format of changelog to be more friendly towards patch releases
- Fixed [issue #21: Support command not sending message](https://github.com/JacenBoy/michelle/issues/21)

### 1.1.2
- Fixed [issue #23: Unhandled rejection on blank search](https://github.com/JacenBoy/michelle/issues/23)

## 1.0 - Initial Release (2019-01-22)
- `m-anime` command added
- `m-manga` command added
- `m-animesearch` command added
- `m-mangasearch` command added
- `m-user` command added
- `m-quote` command added
- [node-kitsu](https://www.npmjs.com/package/node-kitsu) wrapper added
- Replaced permissions error with a more compact emoji
- Various style and consistency tweaks

## 0.1 - Development Begins (2019-01-21)
- [Guide Bot](https://github.com/AnIdiotsGuide/guidebot) base code added
- Moved various commands to "System" category from "Miscelaneous"
- Edited output of various commands to be a more professional format
- Edited help information of various commands to be a more professional format
- Changed `m-reboot` to return exit code 0 instead of 1
- Various other minor tweaks
- Removed `m-set`
- Removed welcome messages
- Removed setting bot status
