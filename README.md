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
        consumer_key: '6aSm4WOlxNn8uzKUsMavv8d1A',
        consumer_secret: '7i4Gg8Ib3nXQ4o4PpkVv3zL7GH6ueUmo3XtTpcxLGcufVUan6u',
        access_token_key: '158734742-VNjtruv6Sa66XWCW0d0Fgj4xifRoGwQd13wvcduh',
        access_token_secret: 'iJctekkzif70aXcyhEXyeyPyYE9HZdglMcgsKbkAWZJ4j'
    }
}
```