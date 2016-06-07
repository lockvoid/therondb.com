---
class: docs guide
layout: doc
permalink: /docs/guide/error-handling.html
title: Error Handling
---

# Error Handling

While communicating with clients Theron would emit errors. One of them could
close a WebSocket connection while the other could affect only the particular
observables.

For example when a SQL query isn't valid Theron won't close the connection
unless there other active subscriptions, but it will throw the source observable
(the observable which sends the bad requests) with the `BAD_REQUEST` error.

Also check [the WebSocket documentation](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent).

## Error Levels

From **LEVEL 2** and **LEVEL 3** errors Theron recovers automatically, i.e. you
have to react to or recover from only the **LEVEL 1** errors.

#### 4000-4099: LEVEL 1

The connection or request **SHOULD NOT** be re-established unchanged.

- `SSL_REQUIRED` (4000)
- `ACCOUNT_SUSPENDED` (4001)
- `TOO_MANY_CONNECTION` (4002)
- `BAD_REQUEST` (4003)
- `UNAUTHORIZED_REQUEST` (4004)
- `NOT_FOUND` (4005)

#### 4100-4199: LEVEL 2

The connection or request **SHOULD** be re-established exponentially.

- `OVER_CAPACITY` (4100)
- `SERVER_RESTARTING` (4101)
- `INTERNAL_SERVER_ERROR` (4102)
- `RESOURCE_GONE` (4103)

#### 4200-4299: LEVEL 3

The connection or request **SHOULD** be re-established instantly.

- `NO_PONG` (4200)
