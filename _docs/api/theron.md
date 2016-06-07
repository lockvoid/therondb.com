---
class: docs api
icon: class
layout: doc
permalink: /docs/api/Theron.html
title: Theron
---

<header class="summary" markdown="1">

# Theron (class)

A basic class for working with Theron inherited from Rx.AnonymousSubject.

{% highlight javascript %}
import { Theron } from 'theron';
{% endhighlight %}

## Static Methods Summary

- [sign](#sign)(data: string, secret: string): string

    Generates an HMAC SHA256 hex digest for a given data.

## Constructor Summary

- [constructor](#constructor)(url: string, options: [TheronAppOptions](./TheronAppOptions))

    Constructs a new Theron reference for an application from an endpoint.

## Instance Methods Summary

- [isConnected](#isConnected)(): boolean

    Returns true if there is at least one active subscription and the connection is established.

- [setAuth](#setAuth)(auth: [TheronAuthOptions](./TheronAuthOptions)): void

    Appends credentials to be sent to your server while fetching SQL queries or channel signatures.

- [request](#request)\<T, R\>(type: string, data?: T, options?: [TheronRescueOptions](./TheronRescueOptions)): Observable\<[TheronTransport](./TheronTransport)\<R\>\>

    Sends a request to the remote procedure call system via a WebSocket connection.

- [publish](#publish)\<T\>(channel: string, payload?: T, options?: [TheronRescueOptions](./TheronRescueOptions)): Observable\<[TheronTransport](./TheronTransport)\<{}\>\>

    Broadcasts a payload to all subscribers of a channel.

- [join](#join)\<T\>(channel: string, options?: [TheronRescueOptions](./TheronRescueOptions) & [TheronSecureOptions](./TheronSecureOptions) & [TheronAsideEffects](./TheronAsideEffects)): Observable\<[TheronDataArtefact](./TheronDataArtefact)\<T\>\>

    Creates an observable that streams data payloads for a particular channel.

- [watch](#watch)\<T extends [BaseRow](./BaseRow)>(url: string, params?: any, options?: [TheronRescueOptions](./TheronRescueOptions) & [TheronAsideEffects](./TheronAsideEffects)): Observable\<[TheronRowArtefact](./TheronRowArtefact)\<T\>\>

    Creates an observable that streams data changes for a particular SQL query fetched from the URL.

</header>

<section class="details" markdown="1">

### static sign(data: string, secret: string): string {#sign}

Generates an HMAC SHA256 hex digest signature for a given data. By default, as a
new application in development mode, Theron accepts any incoming queries. To
enable the signing mechanism, go to the application dashboard and uncheck the
development status.

See [the securing guide](../guide/securing-channels.html) for more details.

#### Params

- **data**

    Type: string, required <br>
    A plain data to sign in.

- **secret**

    Type: string, required <br>
    A secret key provided in the app dashboard.

#### Returns

Type: string <br>
A hex digest signature for a given data.

#### Example

{% highlight javascript linenos %}
import { Theron } from 'theron';

console.log(Theron.sign('SELECT * FROM todos ORDER BY name LIMIT 3', '79bf7c1df9280b8bbffe26a974ab714c'));
// 0047bcd34d5807692566c1a587748ea193b7daec13b5b07c9b3fca0b2edc2411
{% endhighlight %}

### constructor(url: string, options: [TheronAppOptions](./TheronAppOptions)) {#constructor}

Constructs a new Theron reference from a Theron endpoint.

#### Params

- **endpoint**

    Type: string, required <br>
    An absolute, HTTPS URL of a Theron endpoint: `https://therondb.com`.

- **options**

    Type: [TheronAppOptions](./TheronAppOptions), required <br>
    An object with a required app property, which is an application name you set in the application dashboard.

#### Example

{% highlight javascript linenos %}
import { Theron } from 'theron';

const theron = new Theron('https://therondb.com', { app: 'YOUR_APP_NAME' });
{% endhighlight %}

### isConnected(): boolean {#isConnected}

Returns true if there is at least one active subscription and the connection is established.

#### Returns

Type: boolean <br>
An instance connection state.

### setAuth(auth: [TheronAuthOptions](./TheronAuthOptions)): void {#setAuth}

Appends authentication credentials to be sent while fetching SQL queries or
channel signatures from your server. It sets custom headers, or additional
params as well.

See [the authentication guide](../guide/authenticating-requests.html) for more details.

#### Params

- **auth**

    Type: [TheronAuthOptions](./TheronAuthOptions), required <br>
    An object with the `headers` or `params` properties.

#### Example

{% highlight javascript linenos %}
import { Theron } from 'theron';

const theron = new Theron('https://therondb.com', { app: 'YOUR_APP_NAME' });

theron.setAuth({
  headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.VGhlcm9u.twb3AZHNU4t_7KSyJsyNCW6JlkznjFeec0yhXsMspsE' }
});

theron.watch('/todos').subscribe(...); // the headers have been sent to your server
{% endhighlight %}

### request\<T, R\>(type: string, data?: T, options?: [TheronRescueOptions](./TheronRescueOptions)): Observable\<[TheronTransport](./TheronTransport)\<R\>\> {#request}

Sends a request to the RPC via a WebSocket connection. It is reserved for the
next Theron release where you'll be able to send request to your server via
Theron's network.

#### Params

- **type**

    Type: string, required <br>
    An instruction to Theron.

- **data**

    Type: object, optional <br>
    An optional object with additional data to be sent while performing request to Theron.

- **options**

    Type: [TheronRescueOptions](./TheronRescueOptions), optional <br>
    An optional object with the `retry` property (set to `true` by default) which forces Theron to exponentially retry failed requests.

#### Returns

Type: Observable\<[TheronTransport](./TheronTransport)\<R\>\> <br>
An observable containing server response that shares a single subscription to
the underlying sequence containing the response. Check the `publishLast()`
method of RxJS for more details.

#### Example

For example the publish method is a wrapper of the request method:

{% highlight javascript linenos %}
import { Theron } from 'theron';

const theron = new Theron('https://therondb.com', { app: 'YOUR_APP_NAME' });

theron.request('TN:PUBLISH', { channel: 'YOUT_CHANNEL_NAME', payload: { message: 'Hello, Theron!', secret: 'YOUT_SECRET_KEY' } }).subscribe(
  res => {
    console.log(res);
  },

  err => {
    console.log(err);
  },

  () => {
   console.log('done');
  }
);

{% endhighlight %}

### publish\<T\>(channel: string, payload?: T, options?: [TheronRescueOptions](./TheronRescueOptions)): Observable\<[TheronTransport](./TheronTransport)\<{}\>\> {#publish}

Broadcasts a payload to all subscribers of a channel. Right now you can
broadcasts only from the server side since the method requires a secret key.
This is a temporary limitation.

See [the channels guide](../guide/broadcasting-data) for more details.

#### Params

- **channel**

    Type: string, required <br>
    A channel name.

- **payload**

    Type: object, optional <br>
    An optional object with data to be sent to the channel subscribers.

- **options**

    Type: [TheronRescueOptions](./TheronRescueOptions), optional <br>
    An optional object with the `retry` property (set to `true` by default) which forces Theron to exponentially retry failed requests.

#### Returns

Type: Observable\<[TheronTransport](./TheronTransport)\<R\>\> <br>
An observable containing server response.

#### Example

{% highlight javascript linenos %}
import { Theron } from 'theron';

const theron = new Theron('https://therondb.com', { app: 'YOUR_APP_NAME', secret: 'YOUR_SECRET_KEY' /* imporant */ });

theron.publish('airport.delays', { delay: true, /* other excerpts */ } }).subscribe(
  res => {
    console.log(res);
  },

  err => {
    console.log(err);
  },

  () => {
   console.log('done');
  }
);

{% endhighlight %}

### join\<T\>(channel: string, options?: [TheronRescueOptions](./TheronRescueOptions) & [TheronSecureOptions](./TheronSecureOptions) & [TheronAsideEffects](./TheronAsideEffects)): Observable\<[TheronDataArtefact](./TheronDataArtefact)\<T\>\> {#join}

Creates an observable that streams messages for a particular channel. Channel
names should only include lower and uppercase letters, numbers and the following
punctuation `-=.,:_@`.

In the production mode you also have to specify the `sign' property, i.e. the
endpoint where Theron can fetch a signature for the channel in order to create a
subscribtion.

See [the channels guide](../guide/broadcasting-data) for more details.

#### Params

- **channel**

    Type: string, required <br>
    A channel name.

- **options**

    Type: [TheronRescueOptions](./TheronRescueOptions) & [TheronAsideEffects](./TheronAsideEffects), optional <br>
    An optional object with the `retry` property (set to `true` by default) which
    forces Theron to exponentially retry failed requests, a signature endpoint
    property `sign` and aside effects such as the `onSubscribe` and `onUnsubscribe` observers.

#### Returns

Type: Observable\<[TheronRowArtefact](./TheronRowArtefact)\<T\> <br>
An observable sequence containing messages emitted by the `publish()` method.

#### Example

{% highlight javascript linenos %}
import { Theron } from 'theron';

const theron = new Theron('https://therondb.com', { app: 'YOUR_APP_NAME' });

const channel = theron.join('airport.delays').subscribe(
  status => {
    console.log(status);
  },

  err => {
    console.log(err);
  },

  () => {
    console.log('done');
  }
);
{% endhighlight %}

Later, when you don't need that data anymore, unsubscribe:

{% highlight javascript %}
channel.unsubscribe();
{% endhighlight %}

### watch\<T extends [BaseRow](./BaseRow)>(url: string, params?: any, options?: [TheronRescueOptions](./TheronRescueOptions) & [TheronAsideEffects](./TheronAsideEffects)): Observable\<[TheronRowArtefact](./TheronRowArtefact)\<T\>\> {#watch}

Creates an observable that streams data changes for a particular SQL query. It
fetches the SQL query from your server, then queries your database and emits the
actions needed in order to construct the dataset. Reducing those actions you're
constructing a dataset.

See [the streaming guide](../guide/integrating-database.html) for more details.

#### Params

- **query**

    Type: string, required <br>
    A plain SQL query to stream on.

- **params**

    Type: any, optional <br>
    An optional object with additional params to generate a SQL query on your server.

- **options**

    Type: [TheronRescueOptions](./TheronRescueOptions) & [TheronAsideEffects](./TheronAsideEffects), optional <br>
    An optional object with the `retry` property (set to `true` by default)
    which forces Theron to exponentially retry failed requests and aside effects
    such as the `onSubscribe` and `onUnsubscribe` observers.

#### Returns

Type: Observable\<[TheronRowArtefact](./TheronRowArtefact)\<T\> <br>
An observable sequence containing data artefacts.

#### Example

{% highlight javascript linenos %}
import { Theron, ROW_ADDED } from 'theron';

const theron = new Theron('https://therondb.com', { app: 'YOUR_APP_NAME' });

var todos = [];

const subscription = theron.watch('/todos').subscribe(
  action => {
    switch (action.type) {
      case ROW_ADDED:
        todos.push(action.row);
        break;
    }
  },

  err => {
    console.log(err);
  },

  () => {
    console.log('completed');
  }
);
{% endhighlight %}

Later, when you don't need that data anymore, unsubscribe:

{% highlight javascript %}
subscription.unsubscribe();
{% endhighlight %}

</section>
