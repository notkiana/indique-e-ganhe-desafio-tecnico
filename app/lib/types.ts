export type Indicador = {
  fullName: string;
  email?: string;
  phone: string;
  acceptTerms: boolean;
};

export type Indicado = {
  fullName: string;
  email?: string;
  phone: string;
};

export type Submission = {
  id: string;
  createdAt: string; 
  indicador: Indicador;
  indicados: Indicado[];
};
