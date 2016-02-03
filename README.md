# Open Ispilua

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
Client is served by server

To open it go to http://localhost:9030/static
