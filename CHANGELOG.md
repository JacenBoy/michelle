# Changelog
All notable changes to this project will be documented in this file.

## 4.0 - Mongo Update (2019-12-23)
- `mongoose` package added
- Migrating `m-quote`, `m-clip`, and `m-list` to MongoDB
- Minor code cleanup

### 4.0.1
- Backend fixes
- Minor command updates
- Package updates

## 3.1 - A Video Is Worth 1000 Words (2019-12-18)
- `m-clip` command added
- `m-quote` command depricated
- Backend fix for `m-eval` command
- Package updates

### 3.1.1
- Rollback of update to `booru` package

### 3.1.2
- Package updates
- Updated `m-source` for support with Sagiri v3
- Improved logging of unhandled rejections

### 3.1.3
- Package updates
- Improved logging for unhandled rejections

## 3.0 - Inside Joke (2019-06-13)
- Private command framework added
- Removed restrictions for Safebooru searches
- Move changelog link back to GitHub
- Update to bot list stats function
- Remove timestamp from Booru results
- Package updates

### 3.0.1
- Adjust priority of titles in `m-anime`, `m-animesearch`, `m-manga`, and `m-mangasearch` results

### 3.0.2
- Backend command tweaks
- Package updates

### 3.0.3
- Fixed [issue #88: mp4 will not play](https://github.com/JacenBoy/michelle/issues/88)
- node.js and npm updates
- Package updates

### 3.0.4
- Backend bug fixes
- Minor backend improvements
- Package updates

### 3.0.5
- Arguments are no longer optional
- Added new quotes
- Adjusted priority of titles in `m-anime`, `m-animesearch`, `m-manga`, and `m-mangasearch` results 
- Added new API method
- Minor API tweaks
- Minor backend tweaks

## 2.2 - Sauce Pls (2019-03-28)
- [sagiri](https://www.npmjs.com/package/sagiri) package added
- `m-source` command added
- Various code tweaks

### 2.2.1
- Added function to send stats to Bots On Discord
- Package updates

### 2.2.2
- Tweaks to inferior bot stat APIs
- Log failed commands

### 2.2.3
- Disable everyone pings
- Package updates

### 2.2.4
- Add colors to embed responses
- Fixed bugs with `m-animesearch` and `m-resetapi`
- Minor style tweaks

### 2.2.5
- API endpoint added
- Package updates

### 2.2.6
- Fixed issue with `m-source` not outputting
- Package updates

### 2.2.7
- Backend logging bug fixes

## 2.1 - Michelle API (2019-03-22)
- Introduced improved Michelle API. API is modular and modules can be added to the API folder

### 2.1.1
- `m-apireset` command added
- Additional API endpoints added
- Tweaks made to API

### 2.1.2
- Logger updated to log to file.
- Minor tweak to command loader
- mal-scraper package updated

### 2.1.3
- Fixed [issue #33: webm will not play](https://github.com/JacenBoy/michelle/issues/33)

## 2.0 - That Makes It Twice As Good, Right? (2019-02-27)
- Revamp of permissions system to check user permissions instead of user roles
- Various code tweaks
- Arguments are no longer required. Missing arguments will be prompted for

### 2.0.1
- node.js and npm updates
- Reduce maximum synopsis length from 1024 characters to 512 characters
- `m-booru` assumes `-bikini` and `-underwear` tags

### 2.0.2
- Updated status page to return JSON response
- Added additional error handling in the Kitsu commands to prevent crashes on downtime
- Minor code tweaks

### 2.0.3
- Kitsu commands temporarily disabled until Kitsu comes back online or a new API is implemented

### 2.0.4
- [mal-scraper](https://www.npmjs.com/package/mal-scraper) package added
- MAL code added. While ultimately unneeded, it will remain archived in case of a similar incident
- Kitsu commands re-enabled

## 1.4 - A Random Update (2019-02-21)
- `m-random` command added
- Package updates
- Changelog typo fixed
- Error fixed in example config file

### 1.4.1
- Added message at beginning of `m-random` to let user know something is happening
- package.js update to lastest stable version of node and npm

### 1.4.2
- Added extra wait between retries of `m-random` to try to prevent an accidental DDoS

### 1.4.3
- [is-image-url](https://www.npmjs.com/package/is-image-url) package added
- [xmlhttprequest](https://www.npmjs.com/package/xmlhttprequest) package added
- Tokens added to example config file
- Function added to send stats to DiscordBotList.com

### 1.4.4
- Various code tweaks
- Fixed typo in `m-version` command
- Replaced `m-help` with link to support site.

### 1.4.5
- Minor code tweaks
- `m-say` command added
- Move changelog link to support site

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
