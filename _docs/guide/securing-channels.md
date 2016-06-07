---
class: docs guide securing
layout: doc
permalink: /docs/guide/securing-channels.html
title: Securing Channels
---

# Securing Channels

Security is a very important topic. SQL queries could be modified on the client
side, unauthorized users could subscribe to private channels, which leads to
security vulnerability. Theron provides a signing mechanism in order to prevent
unrestricted access to channels and your database.

By default, as a new application in development mode, Theron accepts any
incoming requests. To enable the signing mechanism, go to the application
dashboard and uncheck the development status and hit the update button. Since
the request aren’t signed, Theron will throw an error. To fix it, requests have
to be signed with a secret key provided in the app dashboard.

## Generating Signature

You’re going to use a crypto library to generate an HMAC SHA256 signature from
scratch, or you can use the [`sign()`](../api/Theron.html#sign) method provided
by Theron if you are on Node.js. Let’s see a few examples of how to sign a SQL
query in the most popular programming languages.

- **Node example:**

{% highlight javascript linenos %}
import { Theron } from 'theron';

console.log(Theron.sign('SELECT * FROM todos ORDER BY name LIMIT 3', '79bf7c1df9280b8bbffe26a974ab714c'));
// 0047bcd34d5807692566c1a587748ea193b7daec13b5b07c9b3fca0b2edc2411
{% endhighlight %}

- **Node example (native crypto library):**

{% highlight javascript linenos %}
import * as crypto from 'crypto';

console.log(crypto.createHmac('sha256', '79bf7c1df9280b8bbffe26a974ab714c').update('SELECT * FROM todos ORDER BY name LIMIT 3').digest('hex'));
// 0047bcd34d5807692566c1a587748ea193b7daec13b5b07c9b3fca0b2edc2411
{% endhighlight %}

- **Ruby example:**

{% highlight ruby linenos %}
require 'openssl'

puts OpenSSL::HMAC.hexdigest(OpenSSL::Digest::SHA256.new, '79bf7c1df9280b8bbffe26a974ab714c', 'SELECT * FROM todos ORDER BY name LIMIT 3')
# 0047bcd34d5807692566c1a587748ea193b7daec13b5b07c9b3fca0b2edc2411
{% endhighlight %}

- **Python example:**

{% highlight python linenos %}
import hashlib
import hmac

print hmac.new('79bf7c1df9280b8bbffe26a974ab714c', 'SELECT * FROM todos ORDER BY name LIMIT 3', hashlib.sha256).hexdigest()
# 0047bcd34d5807692566c1a587748ea193b7daec13b5b07c9b3fca0b2edc2411
{% endhighlight %}

Then a response for [`watch()`](../api/Theron.html#watch) could be:

{% highlight json %}
{ "query": "SELECT * FROM todos ORDER BY name LIMIT 3", "signature": "0047bcd34d5807692566c1a587748ea193b7daec13b5b07c9b3fca0b2edc2411" }
{% endhighlight %}

## Channel Signatures

While the [`watch()`](../api/Theron.html#watch) method fetches signatures
alongside with queries, the [`join()`](../api/Theron.html#watch) method provides
a special `sign` option. Theron JavaScript library will send a POST request with
the channel name and the authentication credentials to this url and fetch a
signature back. Later Theron Server will validate it before subscribing the
client to the channel:

{% highlight javascript linenos %}
import { Theron } from 'theron';

const theron = new Theron('https://therondb.com', { app: 'YOUR_APP_NAME' });

const subscription = theron.join('airport.delays', { sign: '/signatures' }).subscribe(
  message => {
    console.log(message.payload);
  },

  err => {
    console.log(err);
  },

  () => {
    console.log('done');
  }
);
{% endhighlight %}

Your server response must be a valid JSON response with the `signature` property:

{% highlight json %}
{ "signature": "2f37f6f9413f6d35d3d639bea7e5c56bd68fec074be0a1e427b7bb5c97f169f7" }
{% endhighlight %}

## Consequences

At Theron, we strive to be awesome as much and as often as possible. We are
constantly working to improve all of these scenarios and have several API
enhancements in the pipeline. The documentation is [open-sourced](https://github.com/therondb/therondb.com).
If you find a mistake in the docs or want to improve something, please send a
pull request.
