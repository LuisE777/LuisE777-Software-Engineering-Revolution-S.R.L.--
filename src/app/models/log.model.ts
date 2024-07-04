export interface Log {  
    id: number;
    log_name: string;
    description: number;
    subject_id: string;
    subject_type: string;
    causer_id: string;
    causer_type: string;
    properties: {
      ip:string;
      user:User;     
      nuevo:string;
      anterior:string;    
    };
    created_at:string;
    updated_at:string;
  }

 //Informe  

  export interface LogInforme {  
    id: number;
    lo_name: string;
    description: number;
    subject_id: string;
    subject_type: string;
    causer_id: string;
    causer_type: string;
    properties: PropsInforme;
    created_at:string;
    updated_at:string;
  }

 export interface PropsInforme {
    attributes: {
      nombre_cotizador: string,
      tipo_informe: string,
      informe_escrito: string,
      id_solicitud: number
    }
}

export interface Stats {  
  "users": number,
  "solicitudes": number,
  "cotizaciones": number,
  "unidades": number,
  "totalasignacion":number
}
//Ends info model

export interface User {
  "id": number,
  "name": string,
  "lastname": string,
  "email": string,
  "cellphone": string,
  "rol": "Jefe",
  "unidaddegasto": string,
  "facultad": string,
  "unidad_id": string,
  "created_at": string,
  "updated_at": string 
}