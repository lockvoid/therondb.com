---
class: docs api
icon: interface
layout: doc
permalink: /docs/api/TheronDataArtefact.html
title: TheronDataArtefact
---

<header class="summary" markdown="1">

# TheronDataArtefact (interface)

A generic interface for the data-based methods.

{% highlight javascript linenos %}
export interface TheronDataArtefact<T> extends BaseAction {
  payload?: T;
}
{% endhighlight %}

In the TypeScript environment for importing do:

{% highlight javascript %}
import { TheronDataArtefact } from 'theron';
{% endhighlight %}

## Members Summary

- [payload](#payload): object, optional

    A data itself.

</header>

<section class="details" markdown="1">

### payload: object, optional {#payload}

A data itself.

</section>
