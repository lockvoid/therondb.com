---
class: docs api
icon: interface
layout: doc
permalink: /docs/api/TheronAsideEffects.html
title: TheronAsideEffects
---

<header class="summary" markdown="1">

# TheronAsideEffects (interface)

This is the interface for handling a subscription lifecycle. It's a way to
perform some side effects since the recoverable subscription swallows errors.

{% highlight javascript linenos %}
interface TheronAsideEffects {
  onSubscribe?: NextObserver<any>;
  onUnsubscribe?: NextObserver<any>;
}
{% endhighlight %}

In the TypeScript environment for importing do:

{% highlight javascript %}
import { TheronAsideEffects } from 'theron';
{% endhighlight %}

## Members Summary

- [onSubscribe](#onSubscribe): NextObserver\<any\>, optional

    An optional observer to capture the subscribe event.

- [onUnsubscribe](#onUnsubscribe): NextObserver\<any\>, optional

    An optional observer to capture the unsubscribe event.

</header>

<section class="details" markdown="1">

### onSubscribe: NextObserver\<any\>, optional {#onSubscribe}

An optional observer to capture the connect event.

### onUnsubscribe: NextObserver\<any\>, optional {#onUnsubscribe}

An optional observer to capture the unsubscribe event.

</section>
