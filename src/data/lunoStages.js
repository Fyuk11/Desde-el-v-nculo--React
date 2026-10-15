// lunoStages.js — Desde el Vínculo
// Recomendaciones y redirección ajustadas al catálogo real (products.js).
//
// ⚠️ Campo nuevo "productId": no existía en el original. Los "id" de cada etapa
// ('cachorros', 'adolescentes', etc.) no coinciden con los id reales de products.js,
// así que si en algún lado arma el link con "stage.id" directamente, hoy apuntaría a
// una ruta que no existe. Usá "productId" para armar el link real, ej:
//   <Link to={`/productos/${stage.productId}`}>
//
// ⚠️ "Reactividad", "Adopción" y "Adultos" no tienen producto dedicado en el catálogo
// real — están mapeados a la opción más honesta que existe hoy (Curso Completo o Pack
// Completo). El día que haya un producto específico para alguna de estas, se actualiza.
//
// ⚠️ Se agregó la etapa "Seniors" (no existía) porque sí hay un producto real para esa
// etapa y hoy no tenía representación acá. Borrala si no la querés en esta sección.

export const lunoStages = [
  {
    id: 'cachorros',
    tag: 'Etapa 01',
    title: 'Cachorros y Primeros Pasos',
    subtitle: 'De 2 a 8 meses',
    description: 'Etapa crítica de socialización, gestión del mordisco, hábitos de higiene y prevención de la ansiedad por separación desde el primer día.',
    recommendation: 'Protocolo Express: Guía de Crianza Respetuosa para Cachorros',
    productId: 'guia-protocolo-cachorros',
    icon: 'Sparkles',
    accentColor: '#6B8E7B',
    image: '/images/home/etapa1.webp'
  },
  {
    id: 'adolescentes',
    tag: 'Etapa 02',
    title: 'Adolescencia y Límites',
    subtitle: 'De 6 meses a 3 años',
    description: 'Cambios hormonales, búsqueda de independencia y pérdida aparente de atención. Trabajamos la autorregulación y la calma sin frustración.',
    recommendation: 'Del Caos al Vínculo: La Guía de la Adolescencia Canina',
    productId: 'guia-adolescencia-canina',
    icon: 'Compass',
    accentColor: '#D4AF37',
    image: '/images/home/etapa2.webp'
  },
  {
    id: 'reactividad',
    tag: 'Etapa 03',
    title: 'Reactividad y Miedos',
    subtitle: 'Todas las edades',
    description: 'Ladridos a otros perros, miedo a ruidos o estrés constante en paseos. Un abordaje desde la seguridad neurobiológica y el entendimiento profundo.',
    recommendation: 'Curso Digital: Educando desde el Vínculo (Módulo 6: Casos Prácticos — ladridos, ansiedad, reactividad, miedos)',
    productId: 'educando-desde-el-vinculo',
    icon: 'ShieldAlert',
    accentColor: '#82A993',
    image: '/images/home/etapa3.webp'
  },
  {
    id: 'adopcion',
    tag: 'Etapa 04',
    title: 'Perros Adoptados o Rescatados',
    subtitle: 'Adaptación inicial',
    description: 'Gestión de traumas previos, construcción de confianza mutua y descompresión del sistema nervioso en los primeros 100 días en el hogar.',
    recommendation: 'Curso Digital: Educando desde el Vínculo (el más completo para reconstruir el vínculo y la confianza desde las bases)',
    productId: 'educando-desde-el-vinculo',
    icon: 'HeartHandshake',
    accentColor: '#6B8E7B',
    image: '/images/home/etapa4.webp'
  },
  {
    id: 'adultos',
    tag: 'Etapa 05',
    title: 'Adultos y Enriquecimiento',
    subtitle: 'De 2 años en adelante',
    description: 'Optimización de la rutina diaria, estimulación cognitiva adaptada, trabajo de olfato y fortalecimiento del vínculo en la etapa de madurez.',
    recommendation: 'Pack Convivencia Completa (el sistema completo para acompañar cada etapa de su vida)',
    productId: 'pack-completo',
    icon: 'Brain',
    accentColor: '#D4AF37',
    image: '/images/home/etapa5.webp'
  },
  // ⚠️ Etapa nueva, propuesta — no existía en el original. Borrala si no la querés.
  {
    id: 'seniors',
    tag: 'Etapa 06',
    title: 'Seniors y Años Dorados',
    subtitle: '7+ años',
    description: 'Cambios cognitivos y sensoriales, dolor silencioso y la necesidad de un entorno adaptado. Acompañamos esta etapa con bienestar integral y conexión real.',
    recommendation: 'Protocolo Express: Bienestar Integral y Conexión para Perros Seniors',
    productId: 'guia-protocolo-seniors',
    icon: 'Heart',
    accentColor: '#82A993',
    image: '/images/home/etapa6.webp'
  }
];