---
class: docs guide securing
layout: doc
permalink: /docs/guide/securing-queries.html
title: Securing Queries
---

## Securing Stream

Security is a very important topic. The SQL queries could be modified on the
client side, which leads to security vulnerability. Theron provides a signing
mechanism in order to prevent unrestricted access to the database.

By default, as a new application in development mode, Theron accepts any SQL
queries. To enable the signing mechanism, go to the application dashboard and
uncheck the development status and hit the update button. Since the queries
aren’t signed, Theron will throw an error on data synchronization. To fix it,
queries have to be signed with a secret key provided in the app dashboard.

On the server side, append a query signature to the responses with the
`querySignature` key, which is an HMAC SHA256 of the SQL query. You’re going to
use a crypto library to generate it from scratch, or you can use the
[`sign()`](../api/Theron.html#sign) method provided by Theron if you are on Node.js.

Let’s see a few examples for the most popular programming languages.

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

Then response:

{% highlight json %}
{ "queryText": "SELECT * FROM todos ORDER BY name LIMIT 3", "querySignature": "0047bcd34d5807692566c1a587748ea193b7daec13b5b07c9b3fca0b2edc2411" }
{% endhighlight %}

## Consequences

At Theron, we strive to be awesome as much and as often as possible. We are
constantly working to improve all of these scenarios and have several API
enhancements in the pipeline. The documentation is [open-sourced](https://github.com/therondb/therondb.com).
If you find a mistake in the docs or want to improve something, please send a
pull request.
