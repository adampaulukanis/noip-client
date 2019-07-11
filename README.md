# noip-client

I need something to update my account at [noip](https://www.noip.com/) with the correct external IP.

## How to obtain your external IP

There are a few methods of doing it:

- [NPM public-ip](https://github.com/sindresorhus/public-ip/blob/master/index.js)
- [https://ipecho.net/plain](https://ipecho.net/plain)
- Shell command **dig +short myip.opendns.com @resolver1.opendns.com**
- My router knows my external IP so I could parse it **or** google / what is my ip / ...
- [StackOverflow](https://stackoverflow.com/questions/1145899/how-do-i-find-out-what-my-external-ip-address-is)

## Installation

1. git clone *this* repo
2. npm install # on OpenBSD it may take a while and be issued more than once (SQLite3)
3. cp .env-temp .env
4. $EDITOR .env

## Documentation

[here](https://www.noip.com/integrate/request)

## How To Use

`npm run updateIP`

## My use case

I use it on my server and my crontab looks like this:
```
$ crontab  -l
SHELL=/bin/sh
MAILTO=adam
HOME=/home/adam/noip-client
#
#minute (0-59)
#|   hour (0-23)
#|   |    day of the month (1-31)
#|   |    |   month of the year (1-12 or Jan-Dec)
#|   |    |   |   day of the week (0-6 with 0=Sun or Sun-Sat)
#|   |    |   |   |   commands
#|   |    |   |   |   |
#### update IP every 3 hours and at every reboot
27  */3   *   *   *   npm run updateIP 
@reboot npm run updateIP
```

## Confirmation of your host name via email

Every once in a while I receive an email from *noip* saying **ACTION REQUIRED: $YOURHOSTNAME is Expiring Soon** and
I need to click on *Confirm Hostname*. Do not neglect it!
