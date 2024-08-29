export class TodoEntity {
    constructor(
        public id: number,
        public text: string,
        public completeAt?: Date|null
    ){}
    get isCompleted() {
        //Esta es una doble negacion que si un valor es nulo devolvera negativo y si tiene valor da true
        return !!this.completeAt
    }
    public static fromObject(object : {[key:string] : any}) : TodoEntity {
        const {id, text, completeAt} = object;
        if(!id) throw 'El id es requerido';
        if(!text) throw 'El texto es requerido';
        let newCompleteAt;
        if(completeAt) {
            newCompleteAt = new Date(completeAt);
            //Aqui comprobamos si podemos obtener numeros de la fecha
            if(isNaN(newCompleteAt.getTime())){
                throw 'completeAt no es una fecha'
            }
        }
        return new TodoEntity(id, text, completeAt)
    }
}