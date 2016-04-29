---
author: "[Dimitri Rosenberg](https://github.com/rosendi)"
class: blog post
date: 2016-04-27
description: Painless forms for designers and developers.
layout: post
title: Introducing Figure
---

# Introducing Figure

We’re excited to announce the launch of [Figure](https://figure-app.com): an
[open-source](https://github.com/rosendi/figure) application that makes putting
forms on static sites fast and easy; no more evil iFrame and CSS overrides.
Build forms with plain HTML and JavaScript for additional features.

## Handy Companion for Static Sites

In the modern web, static sites are [quite popular](https://www.staticgen.com/).
Unfortunately, moving to static means you need to find alternatives for things
that simply can’t be static, such as forms or comments. Developers have come up
with microservice solutions to resolve some of these issues, and Figure is one
of them.

Figure lets you create HTML forms for static sites. Put simply, Figure gives
developers and designers - tech-savvy individuals like you - a place to point
form submissions, handle the processing, transform input data, and finally,
interact with users by redirecting them to another page.

## No Cons, Only Pros

Let’s say you need to collect data from users, but you don’t want to (or you
can’t because of static) build a backend from scratch to manage data, fight
spam, or integrate with other services. Or you just don’t like to mix
functionalities with your primary application goals (e.g. capturing user emails
for invitations before launch, surveying your customers about their experience
with a new feature, etc…).

There are tons of form builders, but Figure isn’t one of them. We believe that
with the current web evolution, it’s much simpler to markup forms by hand and
not get stuck with those services and hack their internals, in order to make
forms a little bit more flexible than they provide by default. Put simply, those
services don’t fit technically savvy individuals like us.

## Try It Out

First, [sign up for a free account](https://figure-app.com/signup) (we haven’t
figure out the plans yet, but it’s open-sourced, and you can always deploy
Figure on your own server). Create a new form by giving it a name, and then
simply point your form at the provided Figure url:

{% highlight html %}
<form action="https://figure-app.com/f/YOUR_FORM_ID" method="POST">
{% endhighlight %}

That’s it. The form submissions will appear in Figure’s friendly dashboard where
you can manage or export them, integrate with other services using webhooks
(yep, Figure likes to talk with other apps), or setup additional reducers that
transform an incoming data, and fetch the result back later using the API.

## Open Source

At Theron, we enjoy open-source! We released Figure under [the MIT License](https://github.com/rosendi/figure/blob/master/LICENSE)
The development stack is React, Redux, and Node and Figure itself is written in
TypeScript. Check [the feature issues](https://github.com/rosendi/figure/issues?q=is%3Aissue+is%3Aopen+label%3A%22type%3A+feature%22)
to learn about our plans, and send pull requests with new features. We really
appreciate it.

Last but not least, we built Figure as a complete, production-ready, and
open-sourced application powered by Theron, a reactive storage for realtime
apps. Check out [our documentation](../docs) and create amazing apps with us.
For each new user who has [registered](/signup) before this summer we will offer
a free six-month subscription.

## Conclusion

We’ve got all sorts of ideas for making Figure even better, but the most
important features are the ones users want – so please, sign up, try it out, and
let us know what you’re looking for. See ya!
