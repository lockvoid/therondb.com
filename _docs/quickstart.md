---
class: docs guide quickstart
layout: doc
permalink: /docs/quickstart.html
title: Quickstart
---

# Quickstart

## 1. Create an Account

First, [sign up for a free account](/signup). Create a new application by giving
it a unique name.

## 2. Install Theron

You have a few options to install Theron’s client library. We recommend to
install it via [npm](https://www.npmjs.com/package/theron) or [jspm](http://jspm.io).

-	Inject the script directly from our CDN:

{% highlight html %}
<script src="//cdn.therondb.com/bundles/0.2.1/theron.umd.js"></script>
{% endhighlight %}

-	Install it via npm for Node.js:

{% highlight bash %}
$ npm install theron --save
{% endhighlight %}

-	Install it via jspm:

{% highlight bash %}
$ jspm install npm:theron
{% endhighlight %}

Read [the installation guide](./guide/installing-theron.html).

## 3. Broadcasting Data

Channels are a fundamental concept in Theron. Channels are a flexible way to
broadcast data across segments of your users. Theron utilizes a
Publish/Subscribe pattern for realtime data streaming which lets you push data
to global audiences instantly.

Subscribe to a channel:

{% highlight javascript linenos %}
import { Theron } from 'theron';

const theron = new Theron('https://therondb.com', { app: 'YOUR_APP_NAME' });

const subscription = theron.join('airport.delays').subscribe(
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

Publish to a channel (only on the Node.JS side):

{% highlight javascript linenos %}
import { Theron } from 'theron';

const theron = new Theron('https://therondb.com', { app: 'YOUR_APP_NAME', secret: 'YOUR_SECRET_KEY' });

theron.publish('around-the-world', { message: 'Greatings from Cybertron!' }).subscribe(
  res => {
    console.log(res);
  },

  err => {
    console.log(err);
  },

  () => {
    console.log('done');
  },
);
{% endhighlight %}



Read [the broadcasting guide](./guide/broadcasting-data).

## 4. Connect to Database

Connect Theron to your Postgres database by entering it credentials in the
application dashboard. If the credentials are correct, Theron will setup the
database.

Since Theron works with SQL queries, your server responses should be a JSON
string, that includes the `query` property with a plain SQL query, instead
of the data itself:

{% highlight json %}
{ "query": "SELECT * FROM todos ORDER BY name LIMIT 3" }
{% endhighlight %}

On the client side, import Theron and create a reference to the application you
created before:

{% highlight javascript linenos %}
import { Theron } from 'theron';

const theron = new Theron('https://therondb.com', { app: 'YOUR_APP_NAME' });
{% endhighlight %}

Now, you can stream data:

{% highlight javascript linenos %}
import { ROW_ADDED } from 'theron';

var todos = [];

const subscription = theron.watch('/todos').subscribe(
  action => {
    switch (action.type) {
      case ROW_ADDED:
        todos.push(action.row);
        break;
    }
  },

  err => {
    console.log(err);
  },

  () => {
    console.log('completed');
  }
);
{% endhighlight %}

Read [the database guide](./guide/integrating-database).

## 5. Authenticate Requests

Theron sends requests to your server while fetching SQL queries or channel
signatures. Let’s say you have [the JWT authentication mechanism](https://jwt.io);
then in order to sign each Theron’s request to your server, try something like this:

{% highlight javascript linenos %}
theron.setAuth({
  headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.VGhlcm9u.twb3AZHNU4t_7KSyJsyNCW6JlkznjFeec0yhXsMspsE' }
});
{% endhighlight %}

Read [the authenticating guide](./guide/authenticating-requests.html).

## 6. Secure Channels

Theron provides a signing mechanism in order to prevent unrestricted access to
the database and channels. To enable the signing mechanism, go to the application dashboard,
uncheck the development status and copy a secret key. On the server side append
a query signature to the responses with the `signature` property, which is
an HMAC SHA256 of the SQL query:

{% highlight javascript linenos %}
console.log(Theron.sign('SELECT * FROM todos ORDER BY name LIMIT 3', '79bf7c1df9280b8bbffe26a974ab714c'));
// 0047bcd34d5807692566c1a587748ea193b7daec13b5b07c9b3fca0b2edc2411
{% endhighlight %}

Then response:

{% highlight json %}
{ "query": "SELECT * FROM todos ORDER BY name LIMIT 3", "signature": "0047bcd34d5807692566c1a587748ea193b7daec13b5b07c9b3fca0b2edc2411" }
{% endhighlight %}

Read [the securing guide](./guide/securing-channels.html).

## 6. Further Reading

- Read [the development guides](./guide/installing-theron.html).
- View [the JavaScript Api](./api/Theron.html).
- Watch [the screencasts](/home#screencasts) where we build a chat application.
- Explore a complete, production-ready, and open-sourced application [Figure](https://figure-app.com).
