using { india.db.master } from '../db/datamodel';

service increment {
    entity Worker as projection on master.worker;
    action hike( ID: UUID );
    //action hike2(ID : UUID);
}