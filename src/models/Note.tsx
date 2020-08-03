export interface Note{
    id:string
    title:string
    quantity?:number
    weight?:number
    insertion_date?:Date
    best_before_date?:Date
}

export default Note;