---
class: docs guide broadcasting
layout: doc
permalink: /docs/guide/broadcasting-data.html
title: Broadcasting Data
---

# Broadcasting Data

Channels are a fundamental concept in Theron. Channels are a flexible way to
broadcast data across segments of your users. Just in case the database
streaming internally is built on top of the channel mechanism. Theron utilizes a
Publish/Subscribe pattern for realtime data streaming which lets you push data
to global audiences instantly.

## Channel Naming Convention

Channel names should only include lower letters, numbers and the following
symbols `-` `=` `.` `,` `_` `@`. For example valid channel names are `airport.delays`,
`chat@group-1`, `jobs,exports,1`, etc...

## Subscribing to Channels

Channels don't need to be explicitly created and applications can subscribe to a
channel with just one line of code. Theron has the [`join()`](../api/Theron.html#join)
method which creates an observable that filters and streams data for a
particular channel. Let's subscribe to a channel:

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

Later, when you don't need that channel anymore, unsubscribe:

{% highlight javascript %}
subscription.unsubscribe();
{% endhighlight %}

> Read [the RxJSx documentation](http://reactivex.io/documentation/observable.html)
> about reactive programming.

Theron implements exponential backoff out of the box, i.e. it automatically
reconnects if the connection is dropped or an error has occured. You can
disable this feature:

{% highlight javascript %}
const channel = theron.join('airport.delays', { retry: false });
{% endhighlight %}

## Channel Aside Effects

With the enabled exponential backoff the observables will swallow any
recoverable errors. Check the [error handling guide]('./error-handling.html')
for more details. For observing a subscription lifecycle do:

{% highlight javascript linenos %}
import { Theron } from 'theron';

...

const channel = theron.join('airport.delays', {
  onSubscribe: {
    next: () => console.log('subscribed')
  },

  onUnsubscribe: {
    next: () => console.log('unsubscribed')
  }
});

channel.subscribe(...);
{% endhighlight %}

## Publishing on Channels

Currently, you have to pass a secret key (you can find it in the app dashboard)
to a Theron instance in order to push data to your cliens. On the Node.JS side do:

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

> We're working on a more flexible and independent way to publish on channels
> which will allow you to send data directly from within your application or via
> our JSON-based API.  We'll land it soon with the next Theron release.

> We're also about to head to return a hot observable instead of a cold one. Feel
> free to leave your comment [here](https://github.com/therondb/therondb.com/issues/1).
> We are opened for any suggestions!

Now we're moving to [the database integration section](./integrating-databases.html).
