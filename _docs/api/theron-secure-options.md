---
class: docs api
icon: interface
layout: doc
permalink: /docs/api/TheronSecureOptions.html
title: TheronSecureOptions
---

<header class="summary" markdown="1">

# TheronSecureOptions (interface)

This is the options for passing a signature endpoint url when the development
application status is unchecked. Check [the channels guide](../guide/broadcasting-data)
for more details.

{% highlight javascript linenos %}
interface TheronSecureOptions {
  sign?: string;
}
{% endhighlight %}

In the TypeScript environment for importing do:

{% highlight javascript %}
import { TheronSecureOptions } from 'theron';
{% endhighlight %}

## Members Summary

- [sign](#sign): string, optional

    A url where Theron can fetch a signature.

</header>

<section class="details" markdown="1">

### sign: string, optional {#sign}

A url where Theron can fetch a signature.

</section>
