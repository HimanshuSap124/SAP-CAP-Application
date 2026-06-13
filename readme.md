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


# Path Variables

A Path Variable is a dynamic value embedded directly within the URL path that is used to identify, locate, or operate on a specific resource in an application.

It allows the same API endpoint to work with different resources by passing unique values in the URL itself.

In SAP CAP, a path variable is a value passed in the URL path that uniquely identifies a specific resource (entity instance). In OData services, path variables are typically represented by the entity key inside parentheses.

Path Variable must have Primary Key field atleast.

CAP provides inbuild path variable feature which you can consume directly.

For Example - 

```
GET http://localhost:4004/odata/v4/warehouse/Warehouses(550e8400-e29b-41d4-a716-446655440009)
Content-Type: application/json
```

OR 
```
GET http://localhost:4004/odata/v4/warehouse/Warehouses(ID=550e8400-e29b-41d4-a716-446655440008)
Content-Type: application/json
```

And we can customize the custom logic based on request.params.


## next in cap
`next` is a function available in CAP on event handlers that passes control to the next handler in the processing chain or to CAP's built-in Generic Provider.

So, since we know CAP automatically provides CRUD operations through its Generic Provider without any custom logic.

When you implement any custom logic then we are affecting CAP's normal flow.

At that point CAP doesn't know whether you want to completely replace the READ operation OR you only want to add validation and continue.

next() resolves this ambiguity.

So without next(), Your handler becomes responsible for everything.

```
Request
   ↓
Custom Handler
   ↓
STOP
```

and with next(), your handler act as a validation check.

```
Request
   ↓
Custom Handler
   ↓
next()
   ↓
CAP Generic Provider
   ↓
Database
   ↓
Response
```

Remember, if you are using next and also performing some CRUD operation on DB through custom logic, then you are already reading the database once and then next() causes CAP to read it again.

So there will be two database calls.

### When Should You Use next()?

Use it when you want to:

- Validate input and still use standard CRUD.
- Check authorization.
- Log requests.
- Enrich responses.
- Add business rules before or after CAP processing.

### When Should You Avoid next()?

Avoid it when:

- You want complete control over the response.
- You are replacing CAP's default CRUD behavior.
- You are reading from an external API instead of the database.
- You are building a completely custom query.



## Query Parameter

A Query Parameter is a key-value pair appended to the URL after a `?` symbol and is used to filter, search, sort, paginate, or modify the behavior of an API request without changing the resource path.

Path parameters identify a resource, while query parameters refine or filter the result.

Different Query Params provided by CAP are - 
1. $select
2. $search
3. $filter
4. $orderby
5. $top
6. $skip 
7. $count


### 1. $select

If we want to display only specific fields in the response, we can use the $select query option.

Example -
```
GET http://localhost:4004/odata/v4/warehouse/Warehouses?$select=ID,name
Content-Type: application/json
```


### 2. $search

If we want to search for a specific value in the response data, we can use the $search query option.

Example -
```
GET http://localhost:4004/odata/v4/warehouse/Warehouses?$search=Warehouse
Content-Type: application/json
```


### 3. $filter

The $filter query option is used to retrieve data that matches a specified condition.

Example -
```
GET http://localhost:4004/odata/v4/warehouse/Warehouses?$filter=name eq 'Elite Storage'
Content-Type: application/json
```

```
GET http://localhost:4004/odata/v4/warehouse/Warehouses?$filter=ID gt 550e8400-e29b-41d4-a716-446655440004
Content-Type: application/json
```

```
GET http://localhost:4004/odata/v4/warehouse/Warehouses?$filter=ID gt 550e8400-e29b-41d4-a716-446655440004 and name eq 'Elite Storage'
Content-Type: application/json
```

### 4. $orderby

The $orderby query option is used to sort the response data in ascending or descending order based on a specified field.

Example -
```
GET http://localhost:4004/odata/v4/warehouse/Warehouses?$orderby=name desc
Content-Type: application/json
```


### 5. $top

The $top query option is used to limit the number of records and return specific number of response data.

Example-
```
GET http://localhost:4004/odata/v4/warehouse/Warehouses?$top=5
Content-Type: application/json
```

### 6. $skip

Use the $skip query option to ignore the first N records in the response. It is typically combined with $top to implement paging.

Example- 
```
GET http://localhost:4004/odata/v4/warehouse/Warehouses?$top=5&$skip=2
Content-Type: application/json
```

### 7. $count

The $count query parameter allows us to obtain the total count of records that match the query criteria.

Example- 
```
GET http://localhost:4004/odata/v4/warehouse/Warehouses?$top=5&$skip=2&$count=true
Content-Type: application/json
```



## Paging

Paging in SAP CAP is the process of retrieving data in smaller chunks instead of fetching the entire dataset at once. 

CAP supports paging through the OData query options $top and $skip.


### 1. Client-Side Paging

Client-side paging can be implemented by using the $top and $skip OData query options to retrieve a specific subset of records from the complete dataset.

Example- 
```
GET http://localhost:4004/odata/v4/warehouse/Warehouses?$top=5&$skip=2
Content-Type: application/json
```


### 2. Server-Side Paging (Default Page Size)

We can configure a default and maximum page size in our service definition in service.cds file.

We can use @cds.query.limit.default and @cds.query.limit.max annotation on the service file.

like - 
```
service WarehouseService @(path : 'warehouse') {
    
    @cds.query.limit.default: 5
    @cds.query.limit.max: 8
    entity Warehouses as projection on schema.Warehouse;

    function getWarehouseCount() returns Integer ;

    action updateWarehouseOwner(warehouseId : String, newOwner : String) returns String ;
}
```

and then request data will return default of 5 records using - 
```
GET http://localhost:4004/odata/v4/warehouse/Warehouses
Content-Type: application/json
```

and will return max of 8 records if we try to fetch more than 8 records -
```
GET http://localhost:4004/odata/v4/warehouse/Warehouses?$top=12
Content-Type: application/json
```


### 3. Global Paging Configuration

You can define limits for all services of the application and can define define it in package.json.

like - 

```
"cds": {
   "query": {
      "limit": {
         "default": 5,
         "max": 8
      }
   }
}
```

and then request data will return default of 5 records using - 
```
GET http://localhost:4004/odata/v4/warehouse/Warehouses
Content-Type: application/json
```

and will return max of 8 records if we try to fetch more than 8 records -
```
GET http://localhost:4004/odata/v4/warehouse/Warehouses?$top=12
Content-Type: application/json
```