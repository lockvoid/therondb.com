---
class: docs api
icon: interface
layout: doc
permalink: /docs/api/TheronRescueOptions.html
title: TheronRescueOptions
---

<header class="summary" markdown="1">

# TheronRescueOptions (interface)

This is the options for enabling the exponential backoff.

{% highlight javascript linenos %}
interface TheronRescueOptions {
  retry?: boolean;
}
{% endhighlight %}

In the TypeScript environment for importing do:

{% highlight javascript %}
import { TheronRescueOptions } from 'theron';
{% endhighlight %}

## Members Summary

- [retry](#retry): boolean, optional

    An option which forces Theron to exponentially backoff on failed requests.

</header>

<section class="details" markdown="1">

### retry: boolean, optinal {#retry}

An option (set to `true` by default) which forces Theron to exponentially backoff on failed requests.

</section>
