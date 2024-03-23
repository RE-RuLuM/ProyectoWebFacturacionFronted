export interface ClienteForm {
  rucDni   : string;
  nombres  : string;
  direccion: string;
  correo   : string;
}

export interface ClienteQueryParams {
  nombres?: string;
  rucDNI ?: string;
  correo ?: string;
}