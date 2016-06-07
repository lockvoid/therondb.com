---
class: docs api
icon: interface
layout: doc
permalink: /docs/api/BaseRow.html
title: BaseRow
---

<header class="summary" markdown="1">

# BaseRow (interface)

A base interface for representing a database row.

{% highlight javascript linenos %}
interface BaseRow {
  id: string;
}
{% endhighlight %}

In the TypeScript environment for importing do:

{% highlight javascript %}
import { BaseRow } from 'theron';
{% endhighlight %}

## Members Summary

- [id](#id): string

    An unique id of the row.

</header>

<section class="details" markdown="1">

### id: string {#id}

An unique id of the row.

See [the streaming guide](../guide/integrating-database.html) for more details.

</section>
