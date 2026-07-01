namespace cap.application.db.schema;

using { cuid } from '@sap/cds/common';

aspect SoftDelete {
    isDeleted : Boolean default false;
}

entity Warehouse : cuid, SoftDelete {
    name       : String;
    owner      : String;
    address    : localized String;
    isDeleted  : Boolean default false;
}