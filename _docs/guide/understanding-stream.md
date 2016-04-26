---
layout: docs
class: guide streaming
title: Understanding Stream
permalink: /guide/understanding-stream.html
---

## Reactive Nature

Theron works with plain SQL queries and uses all of the advantages of SQL
databases. It’s able to understand which data is important for clients,
depending on the query to the database, and sends only payloads: the small
artefacts of data needed in order to construct an entire dataset.

Theron’s client library is built on top of [RxJS](http://reactivex.io/rxjs/).
Data stored in your database is streamed by creating an asynchronous emitter:
the RxJS observable object. It emits the appropriate artefacts of data and stays
in sync with your database.

> Theron only reads data: it doesn’t write to your database.

Let’s consider Theron’s stream through a lifecycle of the first three todos
ordered by its name.

## Server Side

Since Theron works with SQL queries, your server responses should be a JSON
string, that includes the `queryText` property with a plain SQL query for
fetching todos, instead of the todos themselves. For example, the server
response of the first three todos ordered by the name for the `/todos` resource
could be:

{% highlight json %}
{ "queryText": "SELECT * FROM todos ORDER BY name LIMIT 3" }
{% endhighlight %}

> You can use any backend frameworks such as Express, Rails, Django to declare
> the same API.

## Client Side

Import Theron and create a reference to the application you created before:

{% highlight javascript linenos %}
import { Theron } from 'theron';

const theron = new Theron('https://therondb.com', { app: 'YOUR_APP_NAME' });
{% endhighlight %}

Creating a reference establishes a WebSocket connection to Theron’s server but
doesn’t begin downloading data. Data is not fetched until a stream subscription
is created. Once the data is retrieved, it stays cached locally until the last
subscription is disposed of.

Now, we can stream data by creating a new subscription. For that, Theron
provides the [`watch()`](../api/Theron.html#watch) method, which fetches the SQL
query from your server, then queries your database and emits the actions needed
in order to construct the dataset.

{% highlight javascript linenos %}
const subscription = theron.watch('/todos').subscribe(
  action => {
    console.log(action);
  },

  error => {
    console.log(error);
  },

  () => {
    console.log('complete');
  }
);
{% endhighlight %}

Later, when you don’t need that data anymore, unsubscribe:

{% highlight javascript %}
subscription.unsubscribe();
{% endhighlight %}

> Read [the RxJSx documentation](http://reactivex.io/documentation/observable.html)
> about reactive programming.

## Theron Action Payload

[Theron’s action payload](../api/TheronAction.html) is an instruction on how to
react to data changes. It’s a plain JavaScript object with a data artefact
contains the `type` and `payload` property. For now, just check the possible
action types, we’ll introduce each action type later:

- [`ROW_ADDED`](../api/ROW_ADDED.html) - row has been added.
- [`ROW_REMOVED`](../api/ROW_REMOVED.html) - row has been changed.
- [`ROW_MOVED`](../api/ROW_MOVED.html) - row has been removed.
- [`ROW_CHANGED`](../api/ROW_CHANGED.html) - row has been changed.
- [`BEGIN_TRANSACTION`](../api/BEGIN_TRANSACTION.html) - dataset is stale.
- [`COMMIT_TRANSACTION`](../api/COMMIT_TRANSACTION.html) - dataset is fresh.
- [`ROLLBACK_TRANSACTION`](../api/ROLLBACK_TRANSACTION.html) - dataset is invalid.

These action types can be imported:

{% highlight javascript %}
import { ROW_ADDED, ROW_CHANGED, ROW_MOVED, ROW_REMOVED, etc... } from 'theron';
{% endhighlight %}

> If you injected Theron directly from our CDN, these actions are available
> globally.

Now let’s dive into what Theron emits in the case of our todos.

## Todos Stream

Let’s go through this todo’s lifecycle:

<ul class="lifecycle">
  <li>
    <h4>Subscribe Todos</h4>
    <i>1</i>
  </li>
  <li>
    <h4>Rename A(1) to D(1)</h4>
    <i>2</i>
  </li>
  <li>
    <h4>Create A(4)</h4>
    <i>3</i>
  </li>
  <li>
    <h4>Delete D(1)</h4>
    <i>4</i>
  </li>
  <li>
    <h4>Unsubscribe Todos</h4>
    <i>5</i>
  </li>
</ul>

### 1. Subscribe Todos

In this section we will reduce the `ROW_ADDED` action type. Assume that your
database is seeded with the **A(1)**, **B(2)**, **C(3)** todos:

{:.diff.diff-1}
- | Id | Name |
  |:--:|:----:|
  |    |      |
  |    |      |
  |    |      |

  #### Before (Empty)

- | Id | Name |
  |:--:|:----:|
  | 1  | A    |
  | 2  | B    |
  | 3  | C    |

  #### After

Then right after the subscription is created, Theron emits the following actions:

{:.stream}
1. `{ type: BEGIN_TRANSACTION }`
3. {:.row-added} `{ type: ROW_ADDED, payload: { row: { id: 1, name: 'A' }, prevRowId: null } }`
4. {:.row-added} `{ type: ROW_ADDED, payload: { row: { id: 2, name: 'B' }, prevRowId: 1 } }`
5. {:.row-added} `{ type: ROW_ADDED, payload: { row: { id: 3, name: 'C' }, prevRowId: 2 } }`
6. `{ type: COMMIT_TRANSACTION }`

> For each synchronization block, Theron wraps with the `BEGIN_TRANSACTION` and
> `COMMIT_TRANSACTION` actions.

Reducing those actions we can construct an initial dataset:

{% highlight javascript linenos %}
import { ROW_ADDED, ROW_CHANGED, ROW_MOVED, ROW_REMOVED } from 'theron';

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

But it doesn’t preserve the right order of the rows. Let’s refactor our reducer
with the previous row id property in order to preserve the correct order:

{% highlight javascript linenos %}
function indexForRow(rows, rowId) {
  return rows.findIndex(row => row.id === rowId);
}

function nextIndexForRow(rows, prevRowId) {
  if (prevRowId === null) {
    return 0;
  }

  const index = indexForRow(rows, prevRowId);

  if (index === -1) {
    return rows.length;
  } else {
    return index + 1;
  }
}

const subscription = theron.watch('/todos').subscribe(
  action => {
    switch (action.type) {
      case ROW_ADDED:
        const index = nextIndexForRow(rows, action.prevRowId);
        if (index !== -1) {
          rows.splice(index, 0, action.row);
        }
        break;
    }
  },

  ...
);
{% endhighlight %}

> In the production, you would use something like [Immutable.js](https://facebook.github.io/immutable-js)
to deal with arrays. Check [the complete example](https://github.com/rosendi/figure/blob/master/app/client/utils/syncronize_array.ts) of a reducer.

### 2. Rename A(1) to D(1)

In this section we will reduce the `ROW_CHANGED` and `ROW_MOVED` action types.
Assume that someone renamed the **A(1)** todo to **C(1)**. Since the todos are
ordered by their names, the order of the todos needs to be changed:

{:.diff.diff-2}
- | Id | Name |
  |:--:|:----:|
  | 1  | A    |
  | 2  | B    |
  | 3  | C    |

  #### Before

- | Id | Name |
  |:--:|:----:|
  | 2  | B    |
  | 3  | C    |
  | 1  | D    |

  #### After

Theron emits the following actions:

{:.stream}
1. `{ type: BEGIN_TRANSACTION }`
2. {:.row-changed} `{ type: ROW_CHANGED, payload: { row: { id: 1, name: 'D' }, prevRowId: 3 } }`
3. {:.row-moved} `{ type: ROW_MOVED, payload: { row: { id: 1, name: 'D' }, prevRowId: 3 } }`
4. {:.row-moved} `{ type: ROW_MOVED, payload: { row: { id: 2, name: 'B' }, prevRowId: null } }`
5. {:.row-moved} `{ type: ROW_MOVED, payload: { row: { id: 3, name: 'C' }, prevRowId: 2 } }`
6. `{ type: COMMIT_TRANSACTION }`

Reducing those actions we can construct a fresh dataset:

{% highlight javascript linenos %}
const subscription = theron.watch('/todos').subscribe(
  action => {
    switch (action.type) {
      case ROW_ADDED:
        const index = nextIndexForRow(rows, action.prevRowId)
        if (index !== -1) {
          rows.splice(index, 0, action.row);
        }
        break;

      case ROW_CHANGED:
        const index = indexForRow(rows, action.row.id);
        if (index !== -1) {
          rows[index] = action.row;
        }
        break;

      case ROW_MOVED:
        const index = indexForRow(rows, action.row.id);
        if (index !== -1) {
          const row = list.splice(curPos, 1)[0];
          const newIndex = nextIndexForRow(rows, action.prevRowId);
          rows.splice(newIndex, 0, row);
        }
        break;
     }
  }

  ...
);
{% endhighlight %}

### 3. Create A(4)

In this section we will reduce the `ROW_REMOVED` action type. Assume that
someone created a new todo with the name ‘A’. Since our query is limiting todos
to the first three, the todo that we previously renamed should be removed from
the dataset:

{:.diff.diff-3}
- | Id | Name |
  |:--:|:----:|
  | 2  | B    |
  | 3  | C    |
  | 1  | D    |

  #### Before

- | Id | Name |
  |:--:|:----:|
  | 4  | A    |
  | 2  | B    |
  | 3  | C    |

  #### After

  |:--:|:----:|
  | 1  | D    |

Theron emits the following actions:

{:.stream}
1. `{ type: BEGIN_TRANSACTION }`
3. {:.row-added} `{ type: ROW_ADDED, payload: { row: { id: 4, name: 'A' }, prevRowId: null } }`
4. {:.row-moved} `{ type: ROW_MOVED, payload: { row: { id: 2, name: 'B' }, prevRowId: 4 } }`
5. {:.row-moved} `{ type: ROW_MOVED, payload: { row: { id: 3, name: 'C' }, prevRowId: 2 } }`
5. {:.row-removed} `{ type: ROW_REMOVED, payload: { row: { id: 1, name: 'D' }, prevRowId: 3 } }`
6. `{ type: COMMIT_TRANSACTION }`

Reducing those actions we can construct a fresh dataset:

{% highlight javascript linenos %}
const subscription = theron.watch('/todos').subscribe(
  action => {
    switch (action.type) {
      case ROW_ADDED:
        const index = nextIndexForRow(rows, action.prevRowId)
        if (index !== -1) {
          rows.splice(index, 0, action.row);
        }
        break;

      case ROW_CHANGED:
        const index = indexForRow(rows, action.row.id);
        if (index !== -1) {
          rows[index] = action.row;
        }
        break;

      case ROW_MOVED:
        const index = indexForRow(rows, action.row.id);
        if (index !== -1) {
          const row = list.splice(curPos, 1)[0];
          const newIndex = nextIndexForRow(rows, action.prevRowId);
          rows.splice(newIndex, 0, row);
        }
        break;

      case ROW_REMOVED:
        const index = indexForRow(rows, action.row.id);
        if (index !== -1) {
          list.splice(index, 1);
        }
        break;
     }
  }

  ...
);
{% endhighlight %}

### 4. Delete D(1)

Assume that someone deleted the previously renamed todo from the database.
Theron won’t emit a new action because it doesn’t affect the current dataset:

{:.diff.diff-4}
- | Id | Name |
  |:--:|:----:|
  | 4  | A    |
  | 2  | B    |
  | 3  | C    |

  #### Before

- | Id | Name |
  |:--:|:----:|
  | 4  | A    |
  | 2  | B    |
  | 3  | C    |

  #### After (No Diff)

### 5. Unsubscribe Todos

Assume, that your application doesn’t need that data anymore and subscription
was disposed, then Theron invokes the complete handler that logs the `completed`
message in a browser console.

## Tracking State

Last but not least, if you want to track the syncing process and show a loader,
you can do it by doing something like this:

{% highlight javascript linenos %}

import { BEGIN_TRANSACTIN, COMMIT_TRANSACTION } from 'theron';

const subscription = theron.watch('/todos').subscribe(
  action => { switch (action.type) {
    case BEGIN_TRANSACTION:
      // Show a loader...
      break:

    case COMMIT_TRANSACTION:
      // Hide a loader...
      break;
    }
  }

  ...
);

{% endhighlight %}

Great, our todos are completely synchronized with the remote data and we’re
moving to [the authentication section](./authenticating-requests.html).
