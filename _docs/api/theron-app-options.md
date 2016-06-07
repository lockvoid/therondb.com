---
class: docs api
icon: interface
layout: doc
permalink: /docs/api/TheronAppOptions.html
title: TheronAppOptions
---

<header class="summary" markdown="1">

# TheronAppOptions (interface)

This is the options for creating a new Theron instance.

{% highlight javascript linenos %}
interface TheronAppOptions {
  app: string;
  secret?: string;
  onConnect?: NextObserver<any>;
  onDisconnect?: NextObserver<any>;
}
{% endhighlight %}

In the TypeScript environment for importing do:

{% highlight javascript %}
import { TheronAppOptions } from 'theron';
{% endhighlight %}

## Members Summary

- [app](#app): string

    A Theron application name you set in the application dashboard.

- [secret](#secret): string, optional

    A secret key from the application dashboard.

- [onConnect](#onConnect): NextObserver<any>, optional

    An optional observer to capture the connect event.

- [onDisconnect](#onDisconnect): NextObserver<any>, optional

    An optional observer to capture the the moment before the underlying socket is closed.

</header>

<section class="details" markdown="1">

### app: string {#app}

A Theron application name you set in the application dashboard.

### secret: string, options {#secret}

A secret key from the application dashboard.

### onConnect: NextObserver<any>, optional {#onConnect}

An optional observer to capture the connect event.

### onDisconnect: NextObserver<any>, optional {#onDisconnect}

An optional observer to capture the the moment before the underlying socket is closed.

</section>
