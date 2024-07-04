export interface empresaCot {
    "id": number,
    "nombreemp":string,
    "repnombre": string,
    "telefono": string,
    "diremp": string,
    "rubro": string,
    "nit": string,
    "created_at": string,
    "updated_at": string,
    "pivot": {
      "id_solicitud": string,
      "id_empresa": string,
      "id": string,
      "observaciones":string,
      "plazo_de_entrega": string,
      "validez_oferta": string,
      "total": string,
      "cotizacion_pdf": string,
      "eleccion": string
  }
  }

  export interface InformeMod {
    "id": number,
    "nombre_cotizador":string,
    "tipo_informe": string,
    "informe_escrito": string,
    "id_solicitud": number,
    "created_at": string,
    "updated_at": string,   
  }

  export interface itemscotizados {
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
              itemscot:{
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
                empresa:{
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