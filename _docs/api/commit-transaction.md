---
class: api
icon: value
layout: docs
permalink: /api/COMMIT_TRANSACTION.html
title: COMMIT_TRANSACTION
---

<header class="summary" markdown="1">

# COMMIT_TRANSACTION (constant)

This action type will be emitted every time a synchronization block ends. It
means that all the actions required for constructing a fresh dataset were emitted.

{% highlight javascript %}
import { COMMIT_TRANSACTION } from 'theron';
{% endhighlight %}

</header>
