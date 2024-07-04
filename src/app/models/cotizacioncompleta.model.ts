export interface Itemscotizados {
    "id": number,
    "observaciones":string,
    "plazo_de_entrega":string,
    "validez_oferta": string,
    "total": number,
    "cotizacion_pdf": string,
    "eleccion": string,
    "created_at": string,
    "updated_at": string,
    "id_empresa": number,
    "id_solicitud": number,
    "itemscot":{
            "id": string,
            "nombre": string,
            "descripcion": string,
            "cantidad": string,
            "precioUnitario": string,
            "total": string,
            "created_at": string,
            "updated_at": string,
            "empresa_cotizacion_id": number
      },
      "empresa":{
        "id": number,
        "nombreemp": string,
        "repnombre":string,
        "telefono": string,
        "diremp": string,
        "rubro":string,
        "nit": string,
        "created_at": string,
        "updated_at": string      
      }
  }