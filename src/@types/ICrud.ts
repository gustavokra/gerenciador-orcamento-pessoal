export interface ICrud<T> {
    insert(objeto: T): Promise<T>
    selectAll(uid: String): Promise<T[]>
    select(id: string): Promise<T | undefined>
    update(objeto: T): Promise<void>
    delete(id: string): Promise<void>
}