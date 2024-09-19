import { useContext } from "react"
import { FirebaseContext } from "../context/firebaseContext"

export const useFirebase = () => {
    const contexto = useContext(FirebaseContext)

    if(!contexto) {
        throw new Error('useFirevase só pode ser usado dentro do context FirebaseContext')
    }

    return contexto.api
}