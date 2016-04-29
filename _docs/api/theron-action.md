---
class: docs api
icon: interface
layout: doc
permalink: /docs/api/TheronAction.html
title: TheronAction
---

<header class="summary" markdown="1">

# TheronAction (interface)

A generic interface for data changes.

{% highlight javascript linenos %}
interface TheronAction<T> {
  type: string;
  payload?: { row: T & { id: string | number }, prevRowId: string | number };
}
{% endhighlight %}

In the TypeScript environment for importing do:

{% highlight javascript %}
import { TheronAction } from 'theron';
{% endhighlight %}

## Members Summary

- [type](#type): string

    An instruction on how to react to data changes.

- [payload](#payload): { row: T & { id: string \| number }, prevRowId: string \| number }

    An optional object contains data with a row itself and previous row id for ordering purposes.

</header>

<section class="details" markdown="1">

### type: string {#type}

An instruction on how to react to data changes. Can be one of the following constants:

- [`ROW_ADDED`](./ROW_ADDED.html) - a row has been added.
- [`ROW_REMOVED`](./ROW_REMOVED.html) - a row has been changed.
- [`ROW_MOVED`](./ROW_MOVED.html) - a row has been removed.
- [`ROW_CHANGED`](./ROW_CHANGED.html) - a row has been changed.
- [`BEGIN_TRANSACTION`](./BEGIN_TRANSACTION.html) - a dataset it stale.
- [`COMMIT_TRANSACTION`](./COMMIT_TRANSACTION.html) - a dataset is fresh.
- [`ROLLBACK_TRANSACTION`](./ROLLBACK_TRANSACTION.html) - a dataset is invalid.

See [the streaming guide](../guide/understanding-stream.html) for more details.

### payload: { row: T & { id: string | number }, prevRowId: string | number } {#payload}

An optional object contains data with a row itself and previous row id for
ordering purposes.  The payload object is present if and only if the action is
of the following constants `ROW_ADDED`, `ROW_REMOVED`, `ROW_MOVED` or `ROW_CHANGED`.

See [the streaming guide](../guide/understanding-stream.html) for more details.

</section>
