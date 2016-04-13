# Open Ispilu

Inspired on: [Magic Mirror by Michael Teeuw](http://michaelteeuw.nl/tagged/magicmirror)

## Server

### Prerequisites
* node v0.12.6
* pm2

### Setting up
Clone this repo
```bash
git clone https://github.com/irontec/open-ispilua.git open-ispilua && cd open-ispilua/server
npm install
```
[Optional] Enable Homerun support
```bash
npm link
```

### Tasks

#### Using the native npm scripts
Start the server
```bash
npm start
```

Restart the server
```bash
npm restart
```

Stop the server
```bash
npm stop
```

Watch the logs
```bash
npm run logs
```

Kill the server
```bash
npm run kill
```

Show all tasks
```bash
npm run help
```

#### Using Homerun

Homerun allows the service to be used as a command line tool
```bash
open-ispilua-server start
open-ispilua-server stop
open-ispilua-server restart
open-ispilua-server logs
open-ispilua-server kill
open-ispilua-server help
```


## Client
Client is served by the node server

To open it go to http://localhost:9030/static


## License

[EUPL v1.1](https://raw.githubusercontent.com/irontec/open-ispilua/master/LICENSE.txt)

```
Copyright 2015 Irontec SL

Licensed under the EUPL, Version 1.1 or - as soon they will be approved by the European
Commission - subsequent versions of the EUPL (the "Licence"); You may not use this work
except in compliance with the Licence.

You may obtain a copy of the Licence at:
http://ec.europa.eu/idabc/eupl.html

Unless required by applicable law or agreed to in writing, software distributed under 
the Licence is distributed on an "AS IS" basis, WITHOUT WARRANTIES OR CONDITIONS OF 
ANY KIND, either express or implied. See the Licence for the specific language 
governing permissions and limitations under the Licence.
```
