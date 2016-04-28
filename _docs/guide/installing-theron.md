---
class: guide installing
layout: docs
permalink: /docs/guide/installing-theron.html
title: Installing Theron
---

## Create an Account

First, [sign up for a free account](/signup). Create a new application by giving
it a unique name and then connect Theron to your [Postgres](http://postgresql.org)
database by entering it credentials. If the credentials are correct, Theron will
setup the database triggers.

> Currently, Theron only works with Postgres. We're working on the adapters for
> Mongo and other popular databases.

## Install Theron

You have a few options to install Theron’s client library. We recommend to
install it via [npm](https://www.npmjs.com/package/theron) or [jspm](http://jspm.io).

-	Inject the script directly from our CDN:

{% highlight html %}
<script src="//cdn.therondb.com/bundles/0.1.4/theron.umd.js"></script>
{% endhighlight %}

-	Install it via npm for Node.js:

{% highlight bash %}
$ npm install theron --save
{% endhighlight %}

> The Theron JavaScript Api and the Theron Node.js Api are exactly the same.

> The npm package is shipping with the TypeScript typings.

-	Install it via jspm:

{% highlight bash %}
$ jspm install npm:theron
{% endhighlight %}

## Import Theron

If you installed it via npm or jspm (overwise it's avaiable as global object) to
use the library in your application, import it using ES6 syntax:

{% highlight javascript %}
import { Theron } from 'theron';
{% endhighlight %}

Now we’re ready to start streaming data from your database with Theron, which
we’ll cover in [the next section](./understanding-stream.html).
