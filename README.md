# noip-client

I need something to update my account at noip with the correct external IP.

## How to obtain your external IP

There are a few methods of doing it

- [NPM public-ip](https://github.com/sindresorhus/public-ip/blob/master/index.js)
- [https://ipecho.net/plain](https://ipecho.net/plain)
- Shell command **dig +short myip.opendns.com @resolver1.opendns.com**
- My router knows my external IP so I could parse it **or** google / what is my ip / ...
- [StackOverflow](https://stackoverflow.com/questions/1145899/how-do-i-find-out-what-my-external-ip-address-is)

## Instalation

Git clone the repo, npm install, cp config.json.example config.json and edit this file.
