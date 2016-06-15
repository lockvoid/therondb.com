---
author: "[Dimitri Rosenberg](https://github.com/rosendi)"
class: blog post
date: 2016-05-15
description: Learn about building realtime applications with Theron.
layout: post
title: New Core Is Here!
---

# New Core Is Here!

For the last few months we have been working hard on a new Theron core, and
today we’ve finally landed it. This is a big update, which includes significant
improvements on the reliability, functionality, and usability of Theron.

## Channels Support.

Channels are a fundamental concept in Theron. Originally, we used it internally
for the database streaming, but now it’s a public API. Channels are a flexible
way to broadcast data across segments of your users. Theron utilizes a Pub/Sub
pattern for data streaming, which lets you push data to global audiences
instantly. Check [the channels guide](/docs/guide/broadcasting-data.html) for more
details, and we’d really appreciate your feedback.

## Exponential Backoff.

Another new important feature is the exponential backoff. Theron now
exponentially recovers from the non-critical errors. The backoff is turned on by
default. It works both for database streaming as well as your private channels.
Check [the errors handling](/docs/guide/error-handling.html)  guide for more details.

## Database Locking

This is a big topic of how Theron locks databases, and we’re working on an
article series about Theron’s architecture and infrastructure. Briefly, the very
first core of Theron didn't share database connections across clients and
instances. Now with a new distributed state Theron’s connection pool is limited
to up to 20 connections to a single database.

## Distributed State

We mentioned below that we’ve completely rethought our internals: our core now
is more flexible, loosely coupled, and scalable. This makes Theron easier to
develop and amenable to change. As a result, now, for example, it would be
simple to add the presence channel features, i.e current members count, tracking
of members lifecycle, etc... We have that and other great improvements on the
list.

## New Landing

Last but not least, we’ve updated [our landing page](/home). Yeah!
