# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide


## Next Steps

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).


## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.


# Handlers in SAP CAP

- In SAP CAP (Cloud Application Programming Model), handlers are used to add custom logic to service operations (like CRUD or custom actions/functions). 
- They are typically implemented in JavaScript (Node.js) or Java and are registered on service events.

In SAP CAP, different methods are represented as - 
- GET → READ
- POST → CREATE
- PATCH → UPDATE
- DELETE → DELETE

- These are Default handlers which are built-in service provided automatically by the SAP CAP runtime that process standard CRUD operations (CREATE, READ, UPDATE, DELETE) for the entities without requiring custom implementation.

## Main Types of Handlers in SAP CAP

### 1. Before Handlers (before)

- It gets executed before the actual operation is performed.

- It is used for - Input validation, Data modification or Authorization checks, etc.

- It can modify request data (req.data) or 
can reject request using req.error()


### 2. On Handlers (on)

- It Replace or fully handle the core processing logic.
- It is used when You want to override default CAP behavior or Implement custom business logic.

### 3. After Handlers (after)

- It gets executed after the operation has finished.
- It is used for - Enriching response data, Logging or Post-processing etc.

- It cannot reject the request, instead it works on response data and useful for formatting the response data.


## Additional Handler Variants

### 4. Event-Specific Handlers

- It work with - Standard events: CREATE, READ, UPDATE, DELETE and Custom events: myAction, myFunction

```
this.on('myAction', (req) => {
  return { result: 'Success' };
});
```


### 5. Wildcard Handlers

- It is used to attach handler to multiple entities/events.

```
this.before('*', (req) => {
  console.log('Triggered for all events');
});
```

### 6. Entity-Specific vs Global Handlers

Entity-specific:
```
this.before('CREATE', 'Books', ...)
```

Global (service-level):
```
this.before('CREATE', ...)
```

@odata.draft.enabled
@requires: 'Admin'

Validation Handler - 
```
entity Books {
  title : String @mandatory;
  price : Decimal @assert.range: [0, 1000];
}
```


### Function

- A function in SAP CAP is a read-only operation defined in CDS that retrieves or computes data without causing any side effects or modifying the database.

- Function is used to fetch or calculate data without changing anything.

### Action

- An action in SAP CAP is an operation defined in CDS that performs business logic and can modify data or cause side effects in the system.

- Action is used to execute operations that change data or trigger business processes.