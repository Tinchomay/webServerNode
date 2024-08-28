export class CreateTodoDto {

    //Este constructor privado funciona solo con metodos estaticos, no cuando se instancia
    private constructor(
        //Aqui van las propiedades que va a recibir nuestro objeto para ser creado
        public readonly text : string
    ){}

    //Props sera un objeto que va a simular el objeto que vamos a recibir, su key tiene que ser una string y el valor cualquier cosa
    //Vamos a retornar un arreglo, el string va a ser el error, y el segundo en dado caso de que este bien la instancia del createTodoDto
    static create (props: {[key:string]: any}): [string?, CreateTodoDto?]{
        //Extraemos las propiedades que nos interesan
        const {text} = props;
        //Mandamos un error evaluando
        if(!text) return['La propiedad texto es requerida', undefined]
        //Utilizamos constructor privado para construir un objeto
        return [undefined, new CreateTodoDto(text)];
    }
}