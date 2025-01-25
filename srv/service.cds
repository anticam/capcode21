using {
    india.db.master,
    india.db.transaction
} from '../db/datamodel';

service catalogservice {
    entity businesspartner as projection on master.businesspartner;
    entity address         as projection on master.address;
    entity product         as projection on master.product;
    entity purchaseorder   as projection on transaction.purchaseorder;
    entity poitems         as projection on transaction.poitems;
}
