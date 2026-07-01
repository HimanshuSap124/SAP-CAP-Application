namespace cap.application.db.schema;

using { cuid, managed, temporal, sap.common.CodeList as CodeList } from '@sap/cds/common';

aspect SoftDelete {
    isDeleted : Boolean default false;
}

entity Region : cuid, CodeList {};

entity Warehouse : managed, temporal, SoftDelete {
    key ID      : UUID;
        name    : String;
        owner   : String;
        address : localized String;
        region  : Association to Region ;
}