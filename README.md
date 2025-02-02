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

## Axios

[Getting Started with Axios](https://axios-http.com/docs/intro)  
[axios module](https://www.npmjs.com/package/axios)  
[Google search - free external api for testing](https://www.google.com/search?q=free+external+api+for+testing&sca_esv=40fe89a436fab841&sxsrf=ADLYWIIc5kFm4jvakEfCksz-xNdlEcL35w%3A1737099366837&ei=ZgiKZ4rXMs2L9u8PtLvz-Qc&ved=0ahUKEwiKosy1n_yKAxXNhf0HHbTdPH8Q4dUDCBA&uact=5&oq=free+external+api+for+testing&gs_lp=Egxnd3Mtd2l6LXNlcnAiHWZyZWUgZXh0ZXJuYWwgYXBpIGZvciB0ZXN0aW5nMgcQABiABBgTMggQABiABBiiBDIIEAAYgAQYogQyCBAAGKIEGIkFMggQABiABBiiBDIIEAAYgAQYogRI_TxQAFi0KnACeAGQAQCYAWOgAccVqgECMzG4AQPIAQD4AQGYAiGgAoUWwgIMECMYgAQYExgnGIoFwgIKECMYgAQYJxiKBcICBBAjGCfCAgsQABiABBixAxiDAcICERAuGIAEGLEDGNEDGIMBGMcBwgIKEAAYgAQYQxiKBcICDhAAGIAEGLEDGIMBGIoFwgIIEC4YgAQYsQPCAg4QLhiABBixAxjRAxjHAcICCBAAGIAEGLEDwgIFEAAYgATCAhMQLhiABBixAxjRAxhDGMcBGIoFwgIIEAAYFhgKGB7CAgYQABgWGB7CAgoQABiABBgTGMcDwgIIEAAYExgWGB7CAgoQABgTGBYYChgewgIJEAAYgAQYExgNwgIIEAAYExgNGB6YAwCSBwQyOC41oAeFqAE&sclient=gws-wiz-serp)  
[JSON Placeholder](https://jsonplaceholder.typicode.com/)  

## Adding external API call

API to access from CAP
external API call to https://jsonplaceholder.typicode.com/posts

```JSON
{
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
},
```

create data model files:
/db/externalApiSrv.cds - define data model
/srv/externalApiSrv.cds - service file, OData service
/srv/externalApiSrv.js - implementation of service



---
Online UUID generator: 
https://www.uuidgenerator.net/

Node module to generate UUID:
npm module `npx uuid`

How to build cds to SQL and to SQLite DB:
```shell
cds build
cds compile db/datamodel.cds -2 sql
cds deploy --to sqlite:india.db
```

$self - to compare primary key of this table with another table

in SQL Tools select `New SQL File`
drag and drop india_db_master_address
change command to
`select * from india_db_master_address`
then run

adding OData V2 support
deprecated package: https://www.npmjs.com/package/@sap/cds-odata-v2-adapter-proxy
recommended package: https://www.npmjs.com/package/@cap-js-community/odata-v2-adapter

run `npm add @cap-js-community/odata-v2-adapter`

with 
`service catalogservice { ...}`
there will be 
`/odata/v4/catalogservice/`

while with `service CatalogService { ..}`
there will be
`/odata/v4/Catalog`
until first uppercase character

with 
`service CatalogService @(path: '/CatalogService') { ... }`
the service path will be 
`/CatalogService`

https://cap.cloud.sap/docs/node.js/cds-serve#at


list of businesspartners
http://localhost:4004/CatalogService/businesspartner

number of business partners
http://localhost:4004/CatalogService/businesspartner/$count


###### 004
in browser set preferred language to German to see translated text

key ID : UUID  
CAP service populates UUID automatically  
[techtarget.com - What is UUID](https://www.techtarget.com/searchapparchitecture/definition/UUID-Universal-Unique-Identifier)  

##### 005
[Common types and aspects](https://cap.cloud.sap/docs/cds/common#)  
Apects:

- CAP delivered aspects in `@sap/cds/common`
- Custom created aspects

in .cds file:

```CDS

using {cuid} from '@sap/cds/common';

entity worker: cuid {

```

same as

```CDS


entity worker: {
    key ID: UUID;

```

###### 006

custom aspects
email validation:
https://www.mailercheck.com/articles/email-validation-javascript  
https://support.boldsign.com/kb/article/15962/how-to-create-regular-expressions-regex-for-email-address-validation  
https://ihateregex.io/expr/phone/
https://regex101.com/  

###### 010
@readonly entity - no POST method enabled

```JavaScript
entity Foo @(Capabilities:{
  // entity-level
  InsertRestrictions.Insertable: false,
  UpdateRestrictions.Updatable: false,
  DeleteRestrictions.Deletable: false
}) {
  // element-level
  @Core.Computed foo : String
}
```

###### 011
CQL - CDS Query Language
DDL - Data Definition Language (create, drop, alter, trunace, rename, ...)
DQL - Data Query Language (select)
DML - Data Manipulation Language (insert, update, delete, ...)
DCL - Data Control Language (grant, revoke, ...)
TCL - Transaction Control Language (commit, rollback, ...)

https://cap.cloud.sap/docs/node.js/cds-ql
https://cap.cloud.sap/docs/cds/cdl#aspects
https://cap.cloud.sap/docs/cds/aspects

###### 012

| HTTP   | SQL  |
| -----  | ---- |
| GET    | READ |
| POST   | INSERT |
| PUT    | UPDATE |
| DELETE | DELETE |


###### 013
[Actions ad functions](https://cap.cloud.sap/docs/guides/providing-services#actions-functions)  

- Actions modify data in the server, write only, no read, side effects.
- Functions retrieve data, read only, no write, no side effects.

[Providing Services](https://cap.cloud.sap/docs/guides/providing-services)

[Hooks: on, before, ater](https://cap.cloud.sap/docs/guides/providing-services#hooks-on-before-after)