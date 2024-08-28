export class UpdateTodoDto {
    private constructor(
        public readonly id?:number,
        public readonly text?:string,
        public readonly completeAt?: Date
    ){}
    static update(props: {[key:string]: any}) : [string?, UpdateTodoDto?]{
        const {text, completeAt, id} = props;
        let newCompleteAt = completeAt
        if(!id || isNaN(Number(id))) return ['El id es requerido y tiene que ser un numero', undefined]

        if(completeAt) {
            newCompleteAt = new Date(completeAt);
            if(newCompleteAt.toString() === 'Invalid Date') {
                return ['El completeAt no es una fecha', undefined]
            }
        }
        return [undefined, new UpdateTodoDto(id, text, newCompleteAt)];
    }
    //este sera un metodo que crea un objeto segun las propiedades que tenga la clase definidas
    get values() {
        const returnObj : {[key:string] : any} = {};
        if(this.text) returnObj.text = this.text;
        if(this.text) returnObj.completeAt = this.completeAt
        return returnObj;
    }
}