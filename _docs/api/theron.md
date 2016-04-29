---
class: docs api
icon: class
layout: doc
permalink: /docs/api/Theron.html
title: Theron
---

<header class="summary" markdown="1">

# Theron (class)

A basic class for working with Theron.

{% highlight javascript %}
import { Theron } from 'theron';
{% endhighlight %}

## Static Methods Summary

- [sign](#sign)(query: string, secret: string): string

    Generates an HMAC SHA256 hex digest for a query signature.

## Constructor Summary

- [constructor](#constructor)(endpoint: string, options: { app: string })

    Constructs a new Theron reference for an application from an endpoint.

## Instance Methods Summary

- [watch](#watch)\<[TheronAction](./TheronAction.html)\<T\>\>(query: string, params?: Object): Observable<[TheronAction](./TheronAction.html)\<T\>\>

    Creates an observable that streams data changes for a particular SQL query.

- [setAuth](#setAuth)(auth: { params?: Object, headers?: Object }): void

    Appends authentication credentials to be sent while fetching SQL queries from your server.

</header>

<section class="details" markdown="1">

### static sign(query: string, secret: string): string {#sign}

Generates an HMAC SHA256 hex digest signature for an SQL query. By default, as a
new application in development mode, Theron accepts any SQL queries. To enable
the signing mechanism, go to the application dashboard and uncheck the
development status.

See [the securing guide](../guide/securing-queries.html) for more details.

#### Params

- **query**

    Type: string, required <br>
    A plain SQL query to sign in.

- **secret**

    Type: string, required <br>
    A secret key provided in the app dashboard.

#### Returns

Type: string <br>
A hex digest signature for an SQL query.

#### Example

{% highlight javascript linenos %}
import { Theron } from 'theron';

console.log(Theron.sign('SELECT * FROM todos ORDER BY name LIMIT 3', '79bf7c1df9280b8bbffe26a974ab714c'));
// 0047bcd34d5807692566c1a587748ea193b7daec13b5b07c9b3fca0b2edc2411
{% endhighlight %}

### constructor(endpoint: string, options: { app: string }) {#constructor}

Constructs a new Theron reference from a Theron endpoint.

#### Params

- **endpoint**

    Type: string, required <br>
    The absolute, HTTPS URL of a Theron endpoint: `https://therondb.com`.

- **options**

    Type: object, required <br>
    An object with a required app property, which is an application name you set in the application dashboard.

#### Example

{% highlight javascript linenos %}
import { Theron } from 'theron';

const theron = new Theron('https://therondb.com', { app: 'YOUR_APP_NAME' });
{% endhighlight %}

### watch\<[TheronAction](./TheronAction.html)\<T\>\>(query: string, params?: Object): Observable\<[TheronAction](./TheronAction.html)\<T\>\> {#watch}

Creates an observable that streams data changes for a particular SQL query. It
fetches the SQL query from your server, then queries your database and emits the
actions needed in order to construct the dataset. Reducing those actions you're
constructing a dataset.

See [the streaming guide](../guide/understanding-stream.html) for more details.

#### Params

- **query**

    Type: string, required <br>
    A plain SQL query to stream on.

- **params**

    Type: object, optional <br>
    An optional object with additional data to be sent while fetching SQL queries from your server.

#### Returns

Type: Observable\<[TheronAction](./TheronAction.html)\<T\>\> <br>
An observable sequence containing TheronAction objects.

#### Example

{% highlight javascript linenos %}
import { Theron, ROW_ADDED } from 'theron';

var todos = [];

const subscription = theron.watch('/todos').subscribe(
  action => {
    switch (action.type) {
      case ROW_ADDED:
        todos.push(action.row);
        break;
    }
  },

  error => {
    console.log(error);
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

### setAuth(auth: { params?: Object, headers?: Object }): void {#setAuth}

Appends authentication credentials to be sent while fetching SQL queries from
your server. It sets custom headers, or additional params as well.

See [the authentication guide](../guide/authenticating-requests.html) for more details.

#### Params

- **auth**

    Type: object, required <br>
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

</section>
