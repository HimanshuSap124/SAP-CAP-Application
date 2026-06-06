namespace cap.application.db.schema;

entity Warehouse {
    key ID : UUID;
    name : String;
    owner : String;
    address : String;
}