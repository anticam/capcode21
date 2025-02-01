using {
    india.db.master,
    india.db.transaction
} from '../db/datamodel';

// https://cap.cloud.sap/docs/node.js/cds-serve#at
service CatalogService @(path: '/CatalogService') {
    entity businesspartner as projection on master.businesspartner;

    annotate CatalogService.businesspartner with @(Capabilities: {
        InsertRestrictions.Insertable: false,
        UpdateRestrictions.Updatable : false,
        DeleteRestrictions.Deletable : true
    });


    entity address         as projection on master.address;
    annotate CatalogService.address with @(Capabilities: {
        InsertRestrictions: {Insertable: false},
        UpdateRestrictions: {Updatable: false},
        DeleteRestrictions: {Deletable: false}
    });


    entity product         as projection on master.product;
    annotate CatalogService.product with @(Capabilities: {
        InsertRestrictions: {Insertable: false},
        UpdateRestrictions: {Updatable: false},
        DeleteRestrictions: {Deletable: false}
    });


    entity purchaseorder   as projection on transaction.purchaseorder;
    annotate CatalogService.purchaseorder with @(Capabilities: {
        InsertRestrictions: {Insertable: false},
        UpdateRestrictions: {Updatable: false},
        DeleteRestrictions: {Deletable: false}
    });


    entity poitems         as projection on transaction.poitems;
    annotate CatalogService.poitems with @(Capabilities: {
        InsertRestrictions: {Insertable: false},
        UpdateRestrictions: {Updatable: false},
        DeleteRestrictions: {Deletable: false}
    });


    @readonly
    entity worker          as projection on master.worker;
}
