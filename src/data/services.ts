import {
  AppWindow,
  Calculator,
  ChartNoAxesCombined,
  Handshake,
  type LucideIcon,
  Megaphone,
  MonitorSmartphone,
  Palette,
  ReceiptText,
  Share2,
  ShoppingCart,
  Smartphone,
  Target,
} from "lucide-react";

export type ServiceCategoryId = "marketing" | "digital" | "finanzas" | "diseno";

export type ServiceCategory = {
  id: ServiceCategoryId;
  name: string;
  description: string;
};

export type Service = {
  slug: string;
  name: string;
  category: ServiceCategoryId;
  icon: LucideIcon;
  /** Texto breve para tarjetas. */
  summary: string;
  /** Introducción de la página de detalle. */
  intro: string;
  benefits: string[];
  scope: string[];
  seo: { title: string; description: string };
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "marketing",
    name: "Marketing y crecimiento comercial",
    description: "Visibilidad, publicidad y estrategia para atraer y convertir clientes.",
  },
  {
    id: "digital",
    name: "Desarrollo y transformación digital",
    description: "Soluciones web, móviles y de facturación para operar mejor.",
  },
  {
    id: "finanzas",
    name: "Gestión financiera y administrativa",
    description: "Orden contable y visión financiera para decidir con claridad.",
  },
  {
    id: "diseno",
    name: "Diseño e identidad empresarial",
    description: "Una imagen coherente en tu marca y en tus espacios.",
  },
];

export const services: Service[] = [
  {
    slug: "marketing-digital",
    name: "Marketing digital",
    category: "marketing",
    icon: Megaphone,
    summary:
      "Estrategias digitales para fortalecer la marca, conectar con el público objetivo y generar oportunidades comerciales.",
    intro:
      "Diseñamos una estrategia digital alineada con los objetivos de tu negocio: a quién le hablas, qué mensaje transmites y en qué canales tiene sentido invertir tiempo y presupuesto.",
    benefits: [
      "Una marca con mensaje claro y coherente en todos los canales.",
      "Acciones priorizadas según tu público y tus objetivos comerciales.",
      "Seguimiento periódico para ajustar lo que funciona y descartar lo que no.",
      "Una base ordenada para escalar campañas y contenidos.",
    ],
    scope: [
      "Diagnóstico de presencia digital y competencia.",
      "Definición de público objetivo y propuesta de valor.",
      "Plan de canales: redes sociales, web, publicidad y mensajería.",
      "Calendario de acciones y métricas de seguimiento.",
      "Reportes y recomendaciones de mejora.",
    ],
    seo: {
      title: "Agencia de marketing digital en Ecuador",
      description:
        "Estrategias de marketing digital para emprendedores y empresas en Ecuador: posicionamiento de marca, canales digitales y generación de oportunidades comerciales.",
    },
  },
  {
    slug: "facebook-ads",
    name: "Publicidad en Facebook Ads",
    category: "marketing",
    icon: Target,
    summary:
      "Planificación, configuración, optimización y seguimiento de campañas para alcanzar audiencias relevantes y captar potenciales clientes.",
    intro:
      "Gestionamos campañas en Facebook e Instagram (Meta Ads) con objetivos claros, segmentación cuidadosa y revisión constante para aprovechar mejor tu inversión publicitaria.",
    benefits: [
      "Campañas configuradas con objetivos alineados a tu negocio.",
      "Segmentación por intereses, ubicación y comportamiento.",
      "Optimización continua de anuncios, audiencias y presupuesto.",
      "Informes claros sobre el rendimiento de cada campaña.",
    ],
    scope: [
      "Configuración o revisión del administrador comercial y píxel.",
      "Definición de objetivos, audiencias y presupuesto.",
      "Redacción de anuncios y adaptación de piezas gráficas.",
      "Pruebas A/B y optimización de campañas activas.",
      "Reportes periódicos con recomendaciones.",
    ],
    seo: {
      title: "Publicidad en Facebook Ads e Instagram",
      description:
        "Gestión profesional de campañas en Facebook Ads e Instagram para negocios en Ecuador: planificación, segmentación, optimización y reportes.",
    },
  },
  {
    slug: "manejo-de-redes-sociales",
    name: "Manejo de redes sociales",
    category: "marketing",
    icon: Share2,
    summary:
      "Planificación de contenidos, diseño de publicaciones, gestión de comunidades y una presencia digital coherente.",
    intro:
      "Nos encargamos de que tus redes sociales comuniquen con constancia y estilo propio, para que tu marca se reconozca y genere conversación con tus clientes.",
    benefits: [
      "Presencia constante sin que tengas que dedicarle tu tiempo diario.",
      "Identidad visual coherente en cada publicación.",
      "Contenido pensado para tu público y tus objetivos.",
      "Atención y moderación de la comunidad según lo acordado.",
    ],
    scope: [
      "Estrategia y línea editorial por red social.",
      "Calendario mensual de contenidos.",
      "Diseño de publicaciones, historias y reels.",
      "Redacción de textos y uso de etiquetas.",
      "Gestión de comentarios y mensajes según el plan contratado.",
    ],
    seo: {
      title: "Manejo de redes sociales para negocios",
      description:
        "Gestión de redes sociales para negocios en Ecuador: planificación de contenidos, diseño de publicaciones y gestión de comunidad.",
    },
  },
  {
    slug: "asesoria-de-ventas-y-marketing",
    name: "Asesoría de ventas y marketing",
    category: "marketing",
    icon: Handshake,
    summary:
      "Orientación estratégica para mejorar la propuesta comercial, los procesos de venta, la captación de clientes y el posicionamiento.",
    intro:
      "Revisamos contigo cómo vendes hoy y te acompañamos a construir un proceso comercial más claro, desde el primer contacto con el cliente hasta el cierre y el seguimiento.",
    benefits: [
      "Una propuesta de valor más clara y fácil de comunicar.",
      "Procesos de venta ordenados y replicables.",
      "Mejor aprovechamiento de los contactos y oportunidades.",
      "Decisiones comerciales basadas en información.",
    ],
    scope: [
      "Diagnóstico del proceso comercial actual.",
      "Definición de cliente ideal y propuesta de valor.",
      "Diseño del embudo de ventas y guiones de atención.",
      "Recomendaciones de herramientas de seguimiento (CRM).",
      "Sesiones de acompañamiento según el plan acordado.",
    ],
    seo: {
      title: "Asesoría comercial, de ventas y marketing",
      description:
        "Asesoría comercial y empresarial en Ecuador para mejorar tu propuesta de valor, tus procesos de venta y la captación de clientes.",
    },
  },
  {
    slug: "aplicaciones-web",
    name: "Aplicaciones web",
    category: "digital",
    icon: AppWindow,
    summary:
      "Soluciones web personalizadas para automatizar procesos, administrar información y resolver necesidades empresariales.",
    intro:
      "Desarrollamos sistemas web a la medida: paneles de administración, gestión de clientes, inventarios, reservas u otros procesos que hoy resuelves con hojas de cálculo o de forma manual.",
    benefits: [
      "Procesos automatizados que ahorran tiempo operativo.",
      "Información centralizada y accesible desde cualquier dispositivo.",
      "Una solución diseñada para tu forma de trabajar.",
      "Arquitectura preparada para crecer con tu negocio.",
    ],
    scope: [
      "Levantamiento de requerimientos y flujo de procesos.",
      "Diseño de interfaz (UX/UI).",
      "Desarrollo, pruebas y puesta en producción.",
      "Gestión de usuarios y permisos.",
      "Soporte y mejoras según el plan acordado.",
    ],
    seo: {
      title: "Desarrollo de aplicaciones web empresariales",
      description:
        "Desarrollo de aplicaciones web a la medida para empresas en Ecuador: automatización de procesos, paneles de gestión y sistemas internos.",
    },
  },
  {
    slug: "paginas-web",
    name: "Páginas web",
    category: "digital",
    icon: MonitorSmartphone,
    summary: "Páginas corporativas modernas, rápidas, adaptables a dispositivos móviles y preparadas para SEO.",
    intro:
      "Creamos sitios web que presentan tu negocio con claridad, cargan rápido, se ven bien en cualquier pantalla y están pensados para convertir visitas en contactos.",
    benefits: [
      "Imagen profesional que genera confianza.",
      "Diseño adaptable a celulares, tabletas y computadoras.",
      "Estructura optimizada para buscadores (SEO técnico).",
      "Formularios y botones de contacto integrados.",
    ],
    scope: [
      "Arquitectura del sitio y redacción orientada a conversión.",
      "Diseño visual alineado con tu marca.",
      "Desarrollo responsive y optimización de velocidad.",
      "Configuración de SEO técnico básico y analítica.",
      "Publicación y acompañamiento en el dominio y hosting.",
    ],
    seo: {
      title: "Diseño y desarrollo de páginas web",
      description:
        "Diseño y desarrollo de páginas web corporativas en Ecuador: sitios rápidos, responsive y preparados para SEO.",
    },
  },
  {
    slug: "comercio-electronico",
    name: "Comercio electrónico (e-commerce)",
    category: "digital",
    icon: ShoppingCart,
    summary:
      "Tiendas online con catálogo, carrito de compras, integración de pagos según disponibilidad y gestión de pedidos.",
    intro:
      "Llevamos tus productos a internet con una tienda online fácil de administrar, pensada para que tus clientes encuentren, comparen y compren sin complicaciones.",
    benefits: [
      "Un canal de ventas disponible las 24 horas.",
      "Catálogo organizado y fácil de actualizar.",
      "Proceso de compra claro desde el celular.",
      "Gestión centralizada de pedidos y clientes.",
    ],
    scope: [
      "Configuración del catálogo, categorías y variantes.",
      "Carrito de compras y proceso de pago.",
      "Integración con pasarelas de pago disponibles en Ecuador, según el caso.",
      "Opciones de envío y retiro.",
      "Capacitación para administrar la tienda.",
    ],
    seo: {
      title: "Tiendas online y comercio electrónico",
      description:
        "Creación de tiendas online en Ecuador con catálogo, carrito de compras, integración de pagos y gestión de pedidos.",
    },
  },
  {
    slug: "aplicaciones-moviles",
    name: "Aplicaciones móviles",
    category: "digital",
    icon: Smartphone,
    summary: "Diseño y desarrollo de aplicaciones móviles adaptadas a las necesidades de cada negocio.",
    intro:
      "Diseñamos y desarrollamos aplicaciones móviles para Android e iOS que acercan tu servicio a tus clientes o facilitan el trabajo de tu equipo.",
    benefits: [
      "Presencia directa en el celular de tus clientes.",
      "Experiencias rápidas y fáciles de usar.",
      "Integración con tus sistemas y procesos existentes.",
      "Una base escalable para nuevas funcionalidades.",
    ],
    scope: [
      "Definición de funcionalidades y prototipo.",
      "Diseño de interfaz móvil.",
      "Desarrollo multiplataforma y pruebas.",
      "Acompañamiento en la publicación en tiendas de aplicaciones.",
      "Mantenimiento y evolución según el plan acordado.",
    ],
    seo: {
      title: "Desarrollo de aplicaciones móviles",
      description:
        "Diseño y desarrollo de aplicaciones móviles para negocios en Ecuador, adaptadas a tus procesos y a tus clientes.",
    },
  },
  {
    slug: "facturacion-electronica",
    name: "Facturación electrónica",
    category: "digital",
    icon: ReceiptText,
    summary:
      "Implementación e integración de soluciones de facturación electrónica de acuerdo con los requisitos aplicables en Ecuador.",
    intro:
      "Te ayudamos a implementar la facturación electrónica conforme a la normativa del Servicio de Rentas Internas (SRI), integrándola con tus procesos de venta para que emitir comprobantes sea simple.",
    benefits: [
      "Emisión de comprobantes electrónicos de forma ordenada.",
      "Menos tareas manuales y menos errores.",
      "Integración con tu sistema de ventas o tienda online.",
      "Información lista para tu gestión contable.",
    ],
    scope: [
      "Revisión de requisitos y obligaciones aplicables a tu negocio.",
      "Selección e implementación de la solución adecuada.",
      "Acompañamiento en la configuración de la firma electrónica.",
      "Integración con tus sistemas, cuando corresponda.",
      "Capacitación al equipo responsable.",
    ],
    seo: {
      title: "Facturación electrónica en Ecuador",
      description:
        "Implementación e integración de facturación electrónica en Ecuador conforme a los requisitos del SRI, para emprendedores y empresas.",
    },
  },
  {
    slug: "contabilidad",
    name: "Contabilidad",
    category: "finanzas",
    icon: Calculator,
    summary:
      "Servicios y asesoría contable para el registro, la organización y el control de las operaciones, según el alcance contratado.",
    intro:
      "Te acompañamos para que la información contable de tu negocio esté organizada, al día y te sirva para tomar decisiones, no solo para cumplir obligaciones.",
    benefits: [
      "Registros contables ordenados y actualizados.",
      "Mayor control sobre ingresos, gastos y obligaciones.",
      "Información clara para tus decisiones.",
      "Acompañamiento cercano según el alcance contratado.",
    ],
    scope: [
      "Registro y organización de operaciones.",
      "Apoyo en la preparación de declaraciones, según el alcance contratado.",
      "Conciliaciones y control de cuentas.",
      "Reportes contables periódicos.",
      "Asesoría en orden administrativo.",
    ],
    seo: {
      title: "Servicios y asesoría contable",
      description:
        "Servicios y asesoría contable para emprendedores y pequeñas empresas en Ecuador: registro, organización y control de operaciones.",
    },
  },
  {
    slug: "finanzas-empresariales",
    name: "Finanzas empresariales",
    category: "finanzas",
    icon: ChartNoAxesCombined,
    summary:
      "Presupuestos, flujo de caja, análisis financiero, planificación e indicadores para tomar mejores decisiones.",
    intro:
      "Convertimos los números de tu negocio en información útil: cuánto entra, cuánto sale, qué margen dejas y qué decisiones conviene tomar para crecer de forma sostenible.",
    benefits: [
      "Visión clara de la salud financiera del negocio.",
      "Presupuestos y proyecciones para planificar.",
      "Control del flujo de caja.",
      "Indicadores para medir avances.",
    ],
    scope: [
      "Diagnóstico financiero inicial.",
      "Elaboración de presupuestos y proyecciones.",
      "Modelo de flujo de caja.",
      "Definición y seguimiento de indicadores clave.",
      "Sesiones de análisis y recomendaciones.",
    ],
    seo: {
      title: "Finanzas empresariales y flujo de caja",
      description:
        "Asesoría en finanzas empresariales para negocios en Ecuador: presupuestos, flujo de caja, análisis financiero e indicadores.",
    },
  },
  {
    slug: "diseno-empresarial-y-de-interiores",
    name: "Diseño empresarial y de interiores",
    category: "diseno",
    icon: Palette,
    summary:
      "Conceptos visuales y propuestas de diseño para fortalecer la identidad corporativa y mejorar los espacios comerciales.",
    intro:
      "Diseñamos la imagen de tu negocio de forma integral: desde la identidad visual de la marca hasta propuestas para tus espacios comerciales, para que todo transmita la misma imagen profesional.",
    benefits: [
      "Identidad corporativa coherente y reconocible.",
      "Espacios que comunican los valores de tu marca.",
      "Mejor experiencia para tus clientes en el punto de venta.",
      "Propuestas visuales antes de invertir en la ejecución.",
    ],
    scope: [
      "Conceptualización de identidad visual.",
      "Aplicaciones de marca en piezas y señalética.",
      "Propuestas de distribución y ambientación de espacios.",
      "Renders o referencias visuales, según el proyecto.",
      "Acompañamiento en la implementación, según lo acordado.",
    ],
    seo: {
      title: "Diseño empresarial y de interiores",
      description:
        "Diseño de identidad corporativa y propuestas de diseño de interiores para espacios comerciales en Ecuador.",
    },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function servicesByCategory(id: ServiceCategoryId) {
  return services.filter((s) => s.category === id);
}
