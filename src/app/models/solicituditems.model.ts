export interface SolicitudItems {
    id: number,
    responsable:string,
    montoestimado:string,
    estado:string,
    supera:string,
    tipo:string,
    unidad_nombre:string,
    unidad_id:string,
    created_at:string,
    items:[{
        id: number,
        nomitem: string,
        descrip:string,
        item_general_id: number,
        created_at: string,
        updated_at: string,
        pivot: {
            solicitud_id: number,
            item_id: number,
            nombre: string,
            descrip: string,
            cantidad: number,
            precio: number,
        }
    }]    
}
