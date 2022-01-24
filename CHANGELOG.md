# Changelog
All notable changes to this project will be documented in this file.


## 7.0 - Slash Commands (2021-08-13)
- Re-implementing all commands as slash commands
- Adding `/deploy` command
- Package updates

### 7.0.1
- Update logging for deprecated message-based commands
- Update logging for API endpoints
- Package updates

### 7.0.2
- Error handling failsafe for commands that don't already handle errors
- Package updates

### 7.0.3
- Update to legacy command warning
- Package updates

### 7.0.4
- Disabling legacy commands
- Package updates

### 7.0.5
- Minor embed usability update
- Package updates

### 7.0.6
- Additional embed usability update

### 7.0.7
- Update for Gelbooru API
- Package updates

### 7.0.8
- Update `node-fetch` to address [CVE-2022-0235](https://nvd.nist.gov/vuln/detail/CVE-2022-0235)
- Package updates

## 6.0 - v13 Update (2021-08-09)
- Upgrades for `discord.js` v13
- Implementing new Client builder
- Node/NPM updates
- Package updates

### 6.0.1
- Fix issue with logger filename formatting
- Fix issue with privileged intents

### 6.0.2
- Fix issue with uptime monitoring

## 5.3 - I'm Too Dependent (2021-07-12)
- Replacing `enmap` dependency with `mongoose`
- Replacing `moment` dependency with `luxon`
- Package updates

## 5.2 - The Quadfecta (2020-04-28)
- Added custom module for WLN Updates API requests
- `m-ln` command added

### 5.2.1
- Removed workaround for [WLN Updates trailing slash issue](https://github.com/fake-name/wlnupdates/issues/665)
- Package updates

### 5.2.2
- Improved error checking for `m-eval`
- Package updates

### 5.2.3
- Fixed improper handling of non-existent media in `m-anime`, `m-manga`, `m-animesearch`, and `m-mangasearch`
- Fixed issue with Safebooru scores showing as "null" in `m-booru`
- Package updates

### 5.2.4
- Added structure for using emojis for languages and platforms
- Fixed improper handling of non-existent media in `m-anime`, `m-manga`, `m-animesearch`, and `m-mangasearch`
- `m-booru` compatibility fix
- Minor background changes
- Package updates

### 5.2.5
- Backend code fix
- Node/NPM updates

### 5.2.6
- Fixed issue with emojis in `m-vn` and `m-vnsearch`
- Backend code fixes

### 5.2.7
- Add emojis to `m-random`
- Package updates
- Remove `mal-scraper`

### 5.2.8
- Package updates
- Starting to removed dependencies on Enmap

### 5.2.9
- Fix error on guild join
- Package updates

### 5.2.10
- Update `m-booru` to allow either spaces or underscores within tags

### 5.2.11
- Additional debug logging for bug investigation
- Minor fixes
- Package updates

### 5.2.12
- Fixed issue with `m-anime`, `m-animesearch`, `m-manga`, `m-mangasearch`, and `m-user` not properly handling returning no results
- Patched issue with `m-vn` not returning output

### 5.2.13
- Added support for file uploads in `m-source`
- Fixed support for AniDB results with `m-source`
- Package updates

### 5.2.14
- Added framework for exceptions to the bot filter
- Minor text fixes
- Package updates

### 5.2.15
- Package updates

## 5.1 - Are Visual Novels Games? (2020-04-22)
- [vndb-api](https://www.npmjs.com/package/vndb-api) package added
- `m-vn` command added
- `m-vnsearch` command added

### 5.1.1
- Improved error logging and reporting for `m-vn` and `m-vnsearch`

### 5.1.2
- Integrated VN support into `m-random`
- Updating error responses
- Code cleanup

### 5.1.3
- Fixed error causing `m-random` to fail to ever generate an anime or manga

## 5.0 - Version 12 Update (2020-03-03)
- Code updates to `discord.js` v12
- Removed API endpoint
- Package updates
- Node and NPM updates

### 5.0.1
- Fixed errors with stat reporting APIs

### 5.0.2
- Package updates

### 5.0.3
- Update to `mkdirp` to address vulnerability with `minimist` [(CVE-2020-7598)](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-7598)
- Additional package updates

### 5.0.4
- Added `m-fund`
- Added `FUNDING.yml`
- Package updates

### 5.0.5
- Added new error for using non-English characters in `m-anime`, `m-manga`, `m-animesearch`, and `m-mangasearch`
- Package updates

### 5.0.6
- [node-fetch](https://www.npmjs.com/package/node-fetch) package added
- Improved logging of `m-eval` output
- Added option to upload `m-eval` output to Hastebin
- Code cleanup
- Package updates

## 4.0 - Mongo Update (2019-12-23)
- `mongoose` package added
- Migrating `m-quote`, `m-clip`, and `m-list` to MongoDB
- Minor code cleanup

### 4.0.1
- Backend fixes
- Minor command updates
- Package updates

### 4.0.2
- Updated logger to automatically create logs directory
- Added stats reporting to discord.bots.gg
- `m-quote` no longer depricated
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
