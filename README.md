## KONG-UI

> A web UI for [KONG](https://github.com/Mashape/kong) (not endorsed or affiliated with Kong or Mashape)

# This is not ready for use at all!

> Currently it only reads routes and consumers for a hard coded server. Wait for the 
tagged 0.1.0 release. 

### TODO

* Ship as a container
* Tests would be cool
* Support all the built-in plugins
* Implement a better plugin system
* Clean up UI

## Prerequisites

* One or more Kong servers.

## Getting Started

> These are temporary options, for version 0.1.0 it will be more practical

### Self Proxy 

1. Clone repo to a dedicated linux server
2. Install httpd server
3. Setup / to go to [repo home]/app
4. Configure /bower_components to go to [repo home]/bower_components
5. Configure /admin to proxy_pass to your kong server
6. Copy [repo home]/app/settings.js.example to settings.js and edit server connection
7. in [repo home] run ```bower install```
8. Go to app in browser

### Proxy Kong Admin through Kong (So Meta)

1. Clone repo to a dedicated linux server
2. Install httpd server
3. Setup / to go to [repo home]/app
4. In repo directory run npm install
5. In repo directory run bower install
6. Copy [repo home]/app/settings.js.example to settings.js and edit server connection
7. Using Admin API, add Admin API as an API
```Example: curl -X POST  --url http://localhost:8001/apis/  -d 'name=kong_managment'  -d 'target_url=http://localhost:8001/'  -d 'public_dns=localhost' -d 'path=/admin' -d 'strip_path=true'```
8. Go to app in browser

## Contributing

#### Contributions After 0.1.0 are welcome!
Docs, code, design stuff, bug reports, unit tests; Anything you think would improve the experience is welcome.

Eventually specifics will be in [CONTRIBUTING.md](CONTRIBUTING.md)

### License

See [LICENSE.md](LICENSE.md)

### Attribution

Made with [Polymer](https://www.polymer-project.org/1.0/) using the [Polymer Starter Kit](https://github.com/polymerelements/polymer-starter-kit). 
