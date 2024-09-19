import { Auth } from "firebase/auth";
import { Entry } from "../../models/entry";
import { Firestore } from "firebase/firestore";


export class Api {
    entry: Entry

    constructor(db: Firestore, auth: Auth) {
        this.entry = new Entry(db)
    }

}