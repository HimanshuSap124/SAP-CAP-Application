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


# Different ways to declare entity

## 1. In schema.cds file (Domain Model Entity or Persistent entity)
- It is a Persistence entity - means data is stored to non-volatile storage (like SSDs, hard drives, or databases) so it survives system reboots and application closures.
- It by default creates the DB Table.
- It doesnot directly exposed as OData API.

## 2. In service.cds file (Service Entity or Non-Projected Entity)
- It is a non-projected service entity because it is defined directly inside the service and is not a projection on a database entity.
- It is non-persisted and handled with custom logic in service.js file.
- It doesnot create DB Table by default.
- It is exposed as OData API.

```
service EmployeeService {

    entity EmployeeSummary {
        key ID   : UUID;
            name : String;
            count: Integer;
    };

}
```

## Association

- An Association is a relationship between two entities that allows one entity to reference another entity.
- In an Association, the relationship between the entities is weak, meaning records in both entities can exist independently.
- It means the lifecycle of both entities is independent, and the child entity records remain even if the associated parent record is deleted.

## Composition

- A Composition is a strong parent-child relationship between two entities where the child belongs to the parent and is part of the parent's lifecycle.
- In Composition, the relationship between the entities is strong, meaning records in both entities cannot exist independently.
- It means the lifecycle of both entities is dependent, and the child entity records gets deleted if the associated parent record is deleted.



### Deep Insertion
Deep insertion means creating a parent entity and its composed child entity/entities in a single request.