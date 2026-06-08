using {cap.application.db.schema} from '../db/schema';

service WarehouseService @(path: 'warehouse') {

    entity Warehouses as projection on schema.Warehouse;

    function getWarehouseCount() returns Integer;

    action   updateWarehouseOwner(warehouseId: String, newOwner: String) returns String;

}
