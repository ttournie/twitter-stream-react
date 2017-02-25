# Display a streaming flow coming from twitter.

This project use :
- React
- Redux
- Mongodb
- Express
- ntwitter
- Socket io

## Installation

- Run npm start in one terminal
- Run npm server in another : npm run server
- You also need to have mongodb running
- Finally you need to add a .config file in the root looking like this :

```
module.exports = {
    twitter: {
        consumer_key: 'consumer',
        consumer_secret: 'secret',
        access_token_key: 'tocken',
        access_token_secret: 'tokensecret'
    }
}
```