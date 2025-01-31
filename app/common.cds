using {india.db} from '../db/datamodel';

annotate india.db.master.businesspartner with {
    NODE_KEY      @title: '{i18n>bp_key}';
    BP_ROLE       @title: '{i18n>bp_role}';
    EMAIL_ADDRESS @title: '{i18n>email_address}';
    PHONE_NUMBER  @title: '{i18n>phone_number}'; //String(50); // Integer;
    FAX_NUMBER    @title: '{i18n>fax_number}'; //String(50); // Integer;
    WEB_ADDRESS   @title: '{i18n>web_address}';
    //ADDRESS_GUID : Association to one address; // @title: '{i18n > address_guid}'; //String(50); //UUID; // String(50);
    BP_ID         @title: '{i18n>bp_id}';
    COMPANY_NAME  @title: '{i18n>company_name}';

}
