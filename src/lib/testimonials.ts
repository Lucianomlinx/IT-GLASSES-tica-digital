export type Testimonial = {
  quote: string;
  name: string;
  product?: string;
};

/** Feedbacks exibidos na página inicial — edite livremente. */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Gostei demais do óculos Igor, ficou top! Muito obrigada.",
    name: "Alice Silva",
  },
  {
    quote: "Ameeeei os óculos, caíram certinho no meu rosto, ficaram lindoss.",
    name: "Andréia Rocha",
  },
  {
    quote:
      "Atendimento maravilhoso! Me ajudaram a escolher a armação e a lente ideal, e chegou super rápido.",
    name: "Mariana Albuquerque",
    product: "Modelo Boa Viagem",
  },
  {
    quote:
      "Experimentei vários modelos na Malinha sem pressa nenhuma, no conforto de casa. Experiência nota 10!",
    name: "Carlos Eduardo",
  },
  {
    quote: "Já é meu segundo óculos com a IT Glasses. Qualidade impecável e preço justo.",
    name: "Fernanda Lima",
    product: "Modelo Candeias",
  },
  {
    quote:
      "Comprei o Porto na Black Friday e tô apaixonado. Todo mundo pergunta onde comprei!",
    name: "Rafael Santos",
    product: "Modelo Porto",
  },
  {
    quote:
      "Mandei minha receita pelo WhatsApp e me explicaram tudinho. Tô enxergando perfeitamente!",
    name: "Juliana Mendes",
  },
  {
    quote: "Moro em São Paulo e chegou certinho, super bem embalado. Recomendo demais!",
    name: "Patrícia Gomes",
    product: "Modelo Itapuama",
  },
  {
    quote:
      "O Paiva é ainda mais lindo pessoalmente. Obrigado pelo carinho e pela paciência no atendimento!",
    name: "Lucas Ferreira",
    product: "Modelo Paiva",
  },
  {
    quote:
      "Atendimento personalizado de verdade: me indicaram o óculos que mais combinava com meu rosto. Amei!",
    name: "Beatriz Cavalcanti",
  },
];
