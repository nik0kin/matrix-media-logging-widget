# matrix-media-logging-widget

Log your your tv show viewings directly to a matrix room to share what you've been watching.

Uses [TheMovieDatabase API](https://www.themoviedb.org/documentation/api) to look up TvShows/Seasons.

Widget pages require matrix authentication (seemlessly thru the widget-api, if the matrix client supports it), so your TMDB proxy endpoints aren't public to the world

> ⚠️ Use `allowlistHomeserver` setting to restrict access. Restrict access by room is on roadmap

## Example

Imagine a search input for tv shows, a dropdown to select a season and a submit button. When you submit, it sends a matrix message like "I watched Season 6 of Game of Thrones". That message will also embed an external tv show id so it can be cross referenced by any other future matrix application with access to the chat room.

[Demo](https://www.youtube.com/watch?v=KlVnMrRcyug)

## Develop

This project uses Sveltekit

```
yarn install

# create & configure .env

yarn dev

# if debug=true, open http://localhost:5173/auth in browser, else see Run step 2 below
```

## Run

### 1. Bootstrap server & widget webapp

Use node 16.9+

```
# clone repo
yarn install

yarn build

# create & configure .env

# optionally configure port in pm2.config.js

yarn global add pm2
pm2 start pm2.config.js
```

### 1.5. Optional, but recommended: Setup reverse-proxy for https

The widget server uses http, so you'll need to put it behind a reverse-proxy (like Caddy, Traefik, or Nginx) to access the widget securely with https.

### 2. Add Widget to your matrix room

Element-Web command:
`/addwidget https://your-homeserver.tld:3047/auth?widgetId=$matrix_widget_id&userId=$matrix_user_id`

## Config

Configured via `.env` file in the root of this project.

See `./src/lib/settings.ts` for descriptions of each setting

### Restricted config example

```
tmdbApiKey=topsecret1234
allowlistHomeserver=your-homeserver.tld
```

Restricts use of the widget ui and the api's they communicate with, to matrix user id's that use the `your-homeserver.tld` homeserver, eg `@nik0kin:your-homeserver.tld`

### Open config example

```
tmdbApiKey=topsecret1234
debug=true
```

Debug mode turns authentication off, opening up the widget server & ui to be used by anyone to request tv show info.

Importantly, this still does not allow anyone to post on anyone's behalf via the widget.

## Matrix requirements

MSC1690 - Widget Authenticiation (Client & Server)

MSC2762 - Widget sending messages on user's behalf (Client only)

## Known Issues

Widget server authentication does not work in Element-Desktop (userid cookie is missing for subsequent api requests - `./src/hooks.ts` might need to be rewritten/rethought)
