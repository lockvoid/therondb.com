---
class: api
icon: value
layout: docs
permalink: /api/BEGIN_TRANSACTION.html
title: BEGIN_TRANSACTION
---

<header class="summary" markdown="1">

# BEGIN_TRANSACTION (constant)

This action type will be emitted once every time a new synchronization block
starts.  It means that the current dataset is stale and after there will be
another action emitted such as `ROW_ADDED`, `ROW_REMOVED`, `ROW_MOVED`, `ROW_CHANGED`.

{% highlight javascript %}
import { BEGIN_TRANSACTION } from 'theron';
{% endhighlight %}

</header>
