export interface Empreendedor {
  id: string;
  nome: string;
  idade: number;
  negocio: string;
  categoria: string;
  cidade: string;
  estado: string;
  cooperativa: string;
  historia: string;
  oferece: string;
  tags: string[];
  instagram: string;
  whatsapp: string;
  ano_inicio: number;
  coordenadas: { lat: number; lng: number };
}

export type Categoria =
  | "Agro"
  | "Alimentação"
  | "Artesanato"
  | "Comércio"
  | "Educação"
  | "Moda"
  | "Saúde"
  | "Serviços"
  | "Sustentabilidade"
  | "Tecnologia";

export const CATEGORIA_COLORS: Record<string, string> = {
  Agro: "bg-green-100 text-green-800",
  "Alimentação": "bg-orange-100 text-orange-800",
  Artesanato: "bg-purple-100 text-purple-800",
  "Comércio": "bg-red-100 text-red-900",
  "Educação": "bg-yellow-100 text-yellow-800",
  Moda: "bg-pink-100 text-pink-800",
  "Saúde": "bg-teal-100 text-teal-800",
  "Serviços": "bg-gray-100 text-gray-800",
  Sustentabilidade: "bg-lime-100 text-lime-800",
  Tecnologia: "bg-blue-100 text-blue-800",
};
