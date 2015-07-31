ympc-yo
=======

A [Yo][yo] client library to send Yos. It provides a hybrid promise /
node-style API.

## Examples

```js
var API_KEY = 'this-is-my-api-key-asdf-ghjklmnopqrs';
var Yo = require('ympc-yo');
var yo = new Yo(API_KEY);

// promise
yo.yo('YOSERNAME')
  .then(function (res) {
    console.log('Yo, nice:', res.yo_id);
  })
  .catch(function (err) {
    console.error('Yo, lame:', err);
  });


// node-style
yo.yo('YOSERNAME', function (err, res) {
  if (err) {
    return console.error('Yo, lame:', err);
  }

  console.log('Yo, nice:', res.yo_id);
});
```

## Installation

```sh
npm install ympc-yo --save
```

## API

### yo = new Yo(apiKey)

Create a new instance.

**Arguments**

 - `apiKey` *(string; required)*: Your Yo API key. Can be objained at the 
   [Yo dashboard][yodash].

```js
var API_KEY = 'this-is-my-api-key-asdf-ghjklmnopqrs';
var Yo = require('ympc-yo');
var yo = new Yo(API_KEY);
```

### promise = yo.yo(username)

Send a regular Yo.

**Returns**

 - Promise with response body

**Arguments**

 - `username` *(string; required)*: A Yo username

```js
yo.yo('YOSERNAME')
  .then(function (res) {
    console.log('sent yo:', res.yo_id);
  });
```

### promise = yo.yoLink(username, link)

Send a Yo with a link.

**Returns**

 - Promise with response body

**Arguments**

 - `username` *(string; required)*: A Yo username
 - `link` *(string; required)*: A URL

```js
yo.yoLink('YOSERNAME', 'http://example.com/')
  .then(function (res) {
    console.log('sent yo:', res.yo_id);
  });
```

### promise = yo.yoAll(link)

Send a Yo with a link to all subscribers.

**Returns**

 - Promise with response body

**Arguments**

 - `link` *(string; required)*: A URL

```js
yo.yoAll('http://example.com/')
  .then(function (res) {
    console.log('sent yo:', res.yo_id);
  });
```

### promise = yo.getSubscriberCount()

Get the number users who have subscribed to your Yo account.

**Returns**

 - Promise with number of subscribers

```js
yo.getSubscriberCount()
  .then(function (count) {
    console.log('yo, I have', count, 'subscribers');
  });
```

## Handling Errors

According to the [Yo docs][yodocs]

```js
function isErrorCode (code) {
  return function (err) {
    return err.statusCode === code;
  }
}

yo.yo('YOSERNAME')
  .then(function (res) {
    console.log('sent yo:', res.yo_id);
  })
  .catch(isErrorCode(404), function (err) {
    console.error('user does not exist');
  })
  .catch(isErrorCode(429), function (err) {
    console.error('rate limit exceeded');
  })
  .catch(isErrorCode(400), function (err) {
    console.error('bad request');
  })
  .catch(function (err) {
    console.error('something terrible happened', err);
  });
```

## License

MIT

[yo]: https://www.justyo.co/
[yodocs]: http://docs.justyo.co/docs
[yodash]: http://dev.justyo.co/
