using {cap.application.db.schema} from '../db/schema';

service WarehouseService @(path: 'warehouse') {

    @cds.query.limit.default: 5
    @cds.query.limit.max: 8
    entity Warehouses as projection on schema.Warehouse;

    function getWarehouseCount() returns Integer;

    action   updateWarehouseOwner(warehouseId: String, newOwner: String) returns String;

}
