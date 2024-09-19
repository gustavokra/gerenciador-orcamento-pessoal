import { Firestore } from "firebase/firestore";
import { Crud } from "./crud";
import { EntryProps } from "../@types/EntryProps";

export class Entry extends Crud<EntryProps> {

    constructor(db: Firestore) {
        super(db, 'entries')
    }

}