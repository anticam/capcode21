namespace india.db;

using {
    india.db.master,
    india.db.transaction
} from './datamodel';

context CDSViews {

    define view ![PODetails] as
        select from transaction.purchaseorder {
            key PO_ID                             as ![purchaseorders],
                PARTNER_GUID.BP_ID                as ![VendorID],
                PARTNER_GUID.COMPANY_NAME         as ![companyName],
                GROSS_AMOUNT                      as ![POGrossAmount],
                CURRENCY_CODE                     as ![POCurrency],
            key Items.PO_ITEM_POS                 as ![ItemPosition],
                Items.PRODUCT_GUID.PRODUCT_ID     as ![ProductID],
                Items.PRODUCT_GUID.DESCRIPTION    as ![ProductDescription],
                PARTNER_GUID.ADDRESS_GUID.CITY    as ![City],
                PARTNER_GUID.ADDRESS_GUID.COUNTRY as ![Country],
                Items.GROSS_AMOUNT                as ![ItemGrossAmount],
                Items.NET_AMOUNT                  as ![ItemNetAmount]
        }


    // another view

    define view ![ItemView] as
        select from transaction.poitems {
            key PARENT_KEY.PARTNER_GUID.NODE_KEY as ![VendorID],
                PRODUCT_GUID.NODE_KEY            as ![ProductID],
                CURRENCY_CODE                    as ![Currency],
                NET_AMOUNT                       as ![NetAmount],
                TAX_AMOUNT                       as ![TaxAmount],
                PARENT_KEY.OVERALL_STATUS        as ![POStatus]
        }

    // aggregation view
    define view ProductSum as
        select from master.product as prod {
            key PRODUCT_ID        as ![ProductID],
                texts.DESCRIPTION as ![Description],
                (
                    select from transaction.poitems as a {
                        SUM(
                            a.GROSS_AMOUNT
                        ) as SUM
                    }
                    where
                        a.PRODUCT_GUID.NODE_KEY = prod.NODE_KEY
                )                 as PO_SUM : Decimal(10, 2)
        }
}
