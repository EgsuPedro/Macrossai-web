import {
  BriefcaseBusiness,
  Cpu,
  Eye,
  HeartHandshake,
  Layers,
  Lightbulb,
  type LucideIcon,
  MessagesSquare,
  PencilRuler,
  RefreshCw,
  Rocket,
  Search,
  SlidersHorizontal,
  Stethoscope,
  Store,
  Target,
  TrendingUp,
  UserRound,
  Workflow,
  Wrench,
} from "lucide-react";

type IconItem = { icon: LucideIcon; title: string; text: string };

export const pillars: IconItem[] = [
  {
    icon: Eye,
    title: "Haz visible tu marca",
    text: "Estrategias de marketing, publicidad digital y gestión de redes sociales para conectar con tus clientes.",
  },
  {
    icon: Cpu,
    title: "Digitaliza tu negocio",
    text: "Páginas web, aplicaciones, comercio electrónico y herramientas digitales para optimizar tus operaciones.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Gestiona y vende mejor",
    text: "Asesoría comercial, finanzas, contabilidad y soluciones empresariales para una gestión más organizada.",
  },
];

export const solutions: IconItem[] = [
  {
    icon: Rocket,
    title: "Emprendedores que comienzan",
    text: "Te ayudamos a definir tu marca, lanzar tu presencia digital y ordenar tus primeros procesos para empezar con bases sólidas.",
  },
  {
    icon: Store,
    title: "Pequeños comercios y tiendas",
    text: "Atrae más clientes con redes sociales y publicidad local, y suma un canal de venta online con tu propia tienda.",
  },
  {
    icon: UserRound,
    title: "Profesionales independientes",
    text: "Construye una marca personal con página web, contenido profesional y un proceso simple para recibir y gestionar clientes.",
  },
  {
    icon: Stethoscope,
    title: "Clínicas, consultorios y empresas de servicios",
    text: "Comunica tu especialidad con confianza, facilita el agendamiento y organiza la atención con herramientas digitales.",
  },
  {
    icon: TrendingUp,
    title: "Marcas que buscan crecer",
    text: "Escala con estrategia: campañas, optimización comercial y visión financiera para crecer de forma sostenible.",
  },
  {
    icon: Workflow,
    title: "Empresas que necesitan digitalizar procesos",
    text: "Automatiza tareas con aplicaciones a la medida, facturación electrónica e integración de sistemas.",
  },
];

export const differentiators: IconItem[] = [
  {
    icon: Layers,
    title: "Soluciones integrales en un solo lugar",
    text: "Marketing, tecnología y gestión empresarial coordinados por un mismo equipo.",
  },
  {
    icon: SlidersHorizontal,
    title: "Estrategias adaptadas",
    text: "Cada propuesta parte de las necesidades reales y la etapa de tu negocio.",
  },
  {
    icon: Lightbulb,
    title: "Tecnología con propósito",
    text: "Usamos la tecnología para resolver problemas concretos, no por moda.",
  },
  {
    icon: HeartHandshake,
    title: "Acompañamiento en el proceso",
    text: "Estamos presentes en cada etapa, desde el diagnóstico hasta la mejora continua.",
  },
  {
    icon: Target,
    title: "Visión comercial",
    text: "Todo lo que hacemos se orienta a tus objetivos de negocio.",
  },
  {
    icon: MessagesSquare,
    title: "Comunicación clara",
    text: "Propuestas personalizadas, explicadas sin tecnicismos innecesarios.",
  },
];

export const processSteps: IconItem[] = [
  {
    icon: Search,
    title: "Descubrimos",
    text: "Analizamos las necesidades, los objetivos y la situación actual del negocio.",
  },
  {
    icon: PencilRuler,
    title: "Diseñamos",
    text: "Definimos una propuesta estratégica y las soluciones más adecuadas.",
  },
  {
    icon: Wrench,
    title: "Implementamos",
    text: "Desarrollamos la estrategia, el diseño o la solución tecnológica acordada.",
  },
  {
    icon: RefreshCw,
    title: "Optimizamos",
    text: "Revisamos avances, identificamos oportunidades de mejora y proponemos los siguientes pasos.",
  },
];

export type PortfolioProject = {
  name: string;
  category: string;
  description: string;
  services: string[];
  /** Ruta de la captura en /public. Si falta, se muestra una vista ilustrativa. */
  image?: string;
  /** Enlace público, solo con autorización del cliente. */
  href?: string;
  /** true = demostración conceptual, no un cliente real. */
  isConcept: boolean;
};

/**
 * Reemplaza estas demostraciones por proyectos reales (con autorización del cliente)
 * marcando `isConcept: false` y agregando imagen y enlace.
 */
export const portfolio: PortfolioProject[] = [
  {
    name: "Sitio corporativo para empresa de servicios",
    category: "Página web",
    description:
      "Concepto de sitio institucional con secciones de servicios, formulario de contacto y botón de WhatsApp.",
    services: ["Páginas web", "SEO técnico"],
    isConcept: true,
  },
  {
    name: "Tienda online para comercio local",
    category: "E-commerce",
    description: "Concepto de catálogo con carrito de compras, opciones de entrega y gestión de pedidos.",
    services: ["Comercio electrónico", "Facturación electrónica"],
    isConcept: true,
  },
  {
    name: "Campaña de lanzamiento en redes",
    category: "Campaña digital",
    description: "Concepto de campaña con calendario de contenidos, piezas gráficas y anuncios segmentados.",
    services: ["Manejo de redes sociales", "Facebook Ads"],
    isConcept: true,
  },
  {
    name: "Panel de gestión interna",
    category: "Aplicación web",
    description: "Concepto de sistema para administrar clientes, citas e inventario desde cualquier dispositivo.",
    services: ["Aplicaciones web"],
    isConcept: true,
  },
  {
    name: "App de reservas para consultorio",
    category: "Aplicación móvil",
    description: "Concepto de aplicación para agendar citas y recibir recordatorios.",
    services: ["Aplicaciones móviles"],
    isConcept: true,
  },
  {
    name: "Identidad y punto de venta",
    category: "Diseño empresarial",
    description: "Concepto de identidad visual aplicada a señalética y ambientación de un local comercial.",
    services: ["Diseño empresarial y de interiores"],
    isConcept: true,
  },
];

export type Testimonial = {
  name: string;
  company: string;
  quote: string;
  /** Calificación de 1 a 5. */
  rating: number;
  /** Solo se publican testimonios con autorización explícita del cliente. */
  publicationAuthorized: boolean;
  /** true = testimonio de ejemplo (no es un cliente real); se muestra con la etiqueta "Testimonio de ejemplo". */
  isSample?: boolean;
};

/**
 * Testimonios locales del slider. Los enviados desde el formulario se guardan en Supabase y se muestran primero.
 * Los de ejemplo (isSample: true) solo rellenan el slider mientras haya menos de 3 testimonios reales.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Andrea M.",
    company: "Tienda de ropa, Quito",
    quote:
      "Nos ayudaron a ordenar nuestras redes y a lanzar la tienda online. Ahora los clientes nos encuentran y compran directamente desde el celular.",
    rating: 5,
    publicationAuthorized: false,
    isSample: true,
  },
  {
    name: "Carlos R.",
    company: "Consultorio odontológico",
    quote:
      "La página web quedó profesional y rápida. El botón de WhatsApp nos trae consultas todas las semanas y el agendamiento es mucho más simple.",
    rating: 5,
    publicationAuthorized: false,
    isSample: true,
  },
  {
    name: "Gabriela T.",
    company: "Emprendimiento de repostería",
    quote:
      "Empecé sin saber por dónde arrancar. Me acompañaron con la marca, las campañas en Facebook y la facturación electrónica. Todo en un solo lugar.",
    rating: 5,
    publicationAuthorized: false,
    isSample: true,
  },
  {
    name: "Luis P.",
    company: "Distribuidora comercial",
    quote:
      "El sistema web a la medida nos permitió dejar las hojas de cálculo. Tenemos pedidos e inventario centralizados y el equipo trabaja más organizado.",
    rating: 4,
    publicationAuthorized: false,
    isSample: true,
  },
];

export const workPrinciples: { title: string; text: string }[] = [
  {
    title: "Transparencia desde el inicio",
    text: "Definimos alcance, tiempos y entregables antes de comenzar, por escrito y sin letras pequeñas.",
  },
  {
    title: "Atención cercana",
    text: "Tienes un canal directo con el equipo para resolver dudas y revisar avances.",
  },
  {
    title: "Un solo aliado, menos coordinación",
    text: "Centralizar marketing, tecnología y gestión evita depender de varios proveedores desconectados.",
  },
];
