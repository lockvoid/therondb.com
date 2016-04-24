---
class: api
icon: value
layout: docs
permalink: /api/ROW_REMOVED.html
title: ROW_REMOVED
---

<header class="summary" markdown="1">

# ROW_REMOVED (constant)

This action type will be emitted every time a row should be removed from a
dataset. The action type is emitted not only when a row has been removed from a
database, i.e. it will be emitted, too, when the row isn’t required for
constructing the latest dataset for a SQL query.

{% highlight javascript %}
import { ROW_REMOVED } from 'theron';
{% endhighlight %}

</header>
