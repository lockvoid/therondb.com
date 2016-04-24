---
class: api
icon: value
layout: docs
permalink: /api/ROW_CHANGED.html
title: ROW_CHANGED
---

<header class="summary" markdown="1">

# ROW_CHANGED (constant)

This action type will be emitted when the row data changes. The action type is
emitted not only when a row has been changed in a database, i.e. it will be
emitted, too, then subquery (if present) value of a SQL query is stale.

{% highlight javascript %}
import { ROW_CHANGED } from 'theron';
{% endhighlight %}

</header>
