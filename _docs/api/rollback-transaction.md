---
class: api
icon: value
layout: docs
permalink: /api/ROLLBACK_TRANSACTION.html
title: ROLLBACK_TRANSACTION
---

<header class="summary" markdown="1">

# ROLLBACK_TRANSACTION (constant)

This action type will be emitted when a synchronization block doesn’t end, but
there were errors or conflicts that prevent it from committing. It occurs very
rarely and most of the time you don’t have to worry about it.

{% highlight javascript %}
import { ROLLBACK_TRANSACTION } from 'theron';
{% endhighlight %}

</header>
