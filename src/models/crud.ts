
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { ICrud } from "../@types/ICrud";


export class Crud<T> implements ICrud<any> {

    protected collectionRef;

    constructor(db: Firestore, collectionName: string, ) {
        this.collectionRef = collection(db, collectionName)
    }

    protected doErorCheck(error: any, metodo: string): void {
        console.error({ error })
        throw new Error('Erro ao realizar ação de método ' + `${metodo}`)
    }

    async insert(objeto: any): Promise<any> {
        try {
            const referenciaDocumento = doc(this.collectionRef, `${objeto.id}-${Date.now()}`)
            await setDoc(referenciaDocumento, objeto, { merge: true })
        } catch (error) {
            this.doErorCheck(error, 'insert');
        }
    }

    async selectAll(userUid: String): Promise<T[]> {
        try {
            let dados: T[] = []
            const q = query(this.collectionRef, where('uid', '==', userUid))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(doc => {
                if (doc.exists()) {
                    dados.push({
                        ...doc.data() as T,
                        id: doc.id
                    })
                }
            })
            return dados
        } catch (error) {
            this.doErorCheck(error, 'selectAll');
            return []
        }
    }

    async select(id: string): Promise<any | undefined> {
        try {
            const referenciaDocumento = doc(this.collectionRef, id)
            const docSnapshot = await getDoc(referenciaDocumento)
            if(docSnapshot.exists()) {
                const documento: any = docSnapshot.data as any
                documento.id = docSnapshot.id
                return documento
            }
        } catch (error) {
            this.doErorCheck(error, "select")
            return undefined
        }
    }

    async update(objeto: any): Promise<void> {
        try {
            const referenciaDocumento = doc(this.collectionRef, objeto.id)
            await updateDoc(referenciaDocumento, objeto)
        } catch (error) {
            this.doErorCheck(error, 'update')
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const referenciaDocumento = doc(this.collectionRef, id)
            await deleteDoc(referenciaDocumento)
        } catch (error) {
            this.doErorCheck(error, 'delete')
        }
    }

}