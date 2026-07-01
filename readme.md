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


## 1. uuid
- UUID (Universally Unique Identifier) is a data type in SAP CAP that stores a globally unique 128-bit identifier. 
- It is used when you want every record to have a unique ID that is extremely unlikely to duplicate, even across different systems.

We can use UUID in entity like - 
```
entity Warehouse {
    key ID : UUID;
    name : String;
    owner : String;
    address : String;
}
```


## 2. cuid
- cuid is a built-in aspect provided by SAP CAP that automatically adds a primary key named ID of type UUID to an entity. 
- It saves you from manually declaring the UUID key.

We can use CUID aspect in entity like - 
```
using { cuid } from '@sap/cds/common';
entity Warehouse : cuid{
   name : String;
   owner : String;
   address : String;
}
```
and the actual entity internally will look like - 
```
entity Warehouse {
   key ID : UUID;
   name : String;
   owner : String;
   address : String;
}
```

So we don't need to add or manage the ID manually.

## 3. managed

- managed is a built-in aspect that automatically adds and maintains audit fields such as who created or modified a record and when those actions occurred.

We can use this aspect in entity like -
```using { cuid, managed } from '@sap/cds/common';
entity Warehouse : cuid, managed{
   name : String;
   owner : String;
   address : String;
}
```

and the actual entity internally will look like - 
```
entity Warehouse {
   key ID : UUID;
   name : String;
   owner : String;
   address : String;

   createdAt  : Timestamp;
   createdBy  : User;
   modifiedAt : Timestamp;
   modifiedBy : User;
}
```

## 4. temporal
- temporal is a built-in aspect that adds validity period fields (validFrom and validTo) to an entity. 
- It is used for storing historical or time-dependent data.

We can use this aspect in entity like -
```
using { cuid, temporal } from '@sap/cds/common';
entity Warehouse : cuid, temporal{
    name : String;
    owner : String;
    address : String;
}
```

and the actual entity internally will look like - 
```
entity Warehouse {
   key ID : UUID;
   name : String;
   owner : String;
   address : String;

   validFrom : Timestamp;
   validTo   : Timestamp;
}
```

## 5. localized

- localized is a keyword that enables multilingual support for a field. 
- CAP automatically creates the required translation tables and returns values in the users language when available.

We can use this aspect in entity like -
```
using { cuid, managed } from '@sap/cds/common';
entity Warehouse : cuid, managed{
    name : String;
    owner : String;
    address : localized String ;
}
```

## 6. CodeList

- A CodeList in SAP CAP is a predefined aspect used to create lookup (master) data. 
- It stores a fixed list of values that can be reused across your application instead of typing the same text repeatedly.

For Example, if we are repeatedly using the Region to define country, we can instead define it in a Region entity and rest other entity can use it simply.

Aspect CodeList actually is - 
```
aspect CodeList {
    key code : String;
    name      : localized String;
    descr     : localized String;
}
```

and we can use it on entity as - 
```
using { cuid, sap.common.CodeList as CodeList} from '@sap/cds/common';

entity Regions : CodeList {};

entity Warehouse : cuid {
    name       : String;
    owner      : String;
    address    : localized String;

    region : Association to Regions;
}
```

## 7. Custom Aspect
- A custom aspect is a reusable collection of fields, associations, or annotations created by the developer. 
- It allows the same structure to be shared across multiple entities.

We can create an aspect like - 

```
aspect SoftDelete {
    isDeleted : Boolean default false;
}
```

and can use it on entity like - 
```
using { cuid } from '@sap/cds/common';

aspect SoftDelete {
    isDeleted : Boolean default false;
}

entity Warehouse : cuid, SoftDelete {
    name       : String;
    owner      : String;
    address    : localized String;
}
```

and our entity will actually looks like - 

```
entity Warehouse : cuid, SoftDelete {
    name       : String;
    owner      : String;
    address    : localized String;
    isDeleted  : Boolean default false;
}
```