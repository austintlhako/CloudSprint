import { useEffect, useState } from 'react';

type TranslationKey = string;

const translations: Record<string, Record<string, string>> = {
  Spanish: {
    'YOUR AZ-900 STUDY COMPANION': 'TU COMPAÑERO DE ESTUDIO AZ-900',
    'Your AZ-900 journey, made clearer.': 'Tu camino hacia AZ-900, más claro.',
    'Practise cloud concepts, learn from mistakes, and prepare with a study plan built around your progress.': 'Practica conceptos de nube, aprende de tus errores y prepárate con un plan basado en tu progreso.',
    'Get Started': 'Comenzar', 'Explore Features': 'Explorar funciones', 'Everything you need to prepare': 'Todo lo que necesitas para prepararte',
    'Practice quizzes': 'Cuestionarios de práctica', 'Test your knowledge and understand your mistakes.': 'Comprueba tus conocimientos y entiende tus errores.',
    'Smart flashcards': 'Tarjetas inteligentes', 'Review important terms and difficult concepts.': 'Repasa términos importantes y conceptos difíciles.',
    'Personal progress': 'Progreso personal', 'Track your readiness and organize your next study session.': 'Sigue tu preparación y organiza tu próxima sesión.',
    'ABOUT US': 'SOBRE NOSOTROS', 'Built for focused, confident learning.': 'Creado para aprender con concentración y confianza.',
    'CloudSprint turns AZ-900 preparation into a calm, practical routine: understand the idea, practise it, learn from the result, and know what to do next.': 'CloudSprint convierte la preparación de AZ-900 en una rutina práctica y tranquila: entiende la idea, practícala, aprende del resultado y descubre el siguiente paso.',
    'Our vision': 'Nuestra visión', 'A world where every learner can approach cloud fundamentals with clarity, regardless of background or starting point.': 'Un mundo donde cada estudiante pueda aprender fundamentos de nube con claridad, sin importar su origen o punto de partida.',
    'Our mission': 'Nuestra misión', 'To make high-quality, concept-first exam preparation accessible, measurable, and easy to fit into real life.': 'Hacer que la preparación de calidad, basada en conceptos, sea accesible, medible y fácil de integrar en la vida diaria.',
    'Our promise': 'Nuestra promesa', 'We will keep the experience honest, useful, and learner-centred—never presenting unofficial practice as a real Microsoft exam.': 'Mantendremos una experiencia honesta, útil y centrada en el estudiante; nunca presentaremos prácticas no oficiales como un examen real de Microsoft.',
    'PREPARE WITH CLOUDSPRINT': 'PREPÁRATE CON CLOUDSPRINT', 'Turn uncertainty into a plan.': 'Convierte la incertidumbre en un plan.',
    'Build a steady rhythm with original questions, active recall, feedback, and visible progress—all in one place.': 'Crea un ritmo constante con preguntas originales, recuerdo activo, comentarios y progreso visible, todo en un mismo lugar.',
    'OUR IMPACT': 'NUESTRO IMPACTO', 'Live recorded reach': 'Alcance registrado en vivo',
    'These figures reflect records currently available in this CloudSprint environment, not estimates.': 'Estas cifras reflejan los registros disponibles en este entorno de CloudSprint, no estimaciones.',
    'Participants recorded': 'Participantes registrados', 'Countries recorded': 'Países registrados', 'Schools and universities recorded': 'Escuelas y universidades registradas',
    'Learner testimonials': 'Testimonios de estudiantes', 'Learner testimonials will appear here as reviews are submitted.': 'Los testimonios aparecerán aquí cuando se envíen reseñas.',
    'TRUSTED BY LEARNERS': 'ELEGIDO POR ESTUDIANTES', 'Our students come from the world’s most prestigious programs.': 'Nuestros estudiantes provienen de los programas más prestigiosos del mundo.',
    'CloudSprint welcomes learners wherever they are building their next opportunity.': 'CloudSprint recibe a estudiantes que están construyendo su próxima oportunidad.',
    'Our partners': 'Nuestros socios', 'We are open to partnerships with schools, universities, bootcamps, and communities that want to support practical cloud learning.': 'Estamos abiertos a colaborar con escuelas, universidades, bootcamps y comunidades que apoyen el aprendizaje práctico de la nube.',
    'Partner with CloudSprint': 'Asóciate con CloudSprint', 'Frequently asked questions': 'Preguntas frecuentes',
    'Is CloudSprint affiliated with Microsoft?': '¿CloudSprint está afiliado a Microsoft?', 'No. CloudSprint is an unofficial AZ-900 learning companion with original study content.': 'No. CloudSprint es un compañero de estudio AZ-900 no oficial con contenido original.',
    'Can I start before creating an account?': '¿Puedo comenzar antes de crear una cuenta?', 'Yes. Explore the public Home page first; protected study features require sign-in.': 'Sí. Explora primero la página principal; las funciones de estudio protegidas requieren iniciar sesión.',
    'How do the impact figures work?': '¿Cómo funcionan las cifras de impacto?', 'They count records currently available to this app environment and never use guessed totals.': 'Cuentan los registros disponibles en este entorno y nunca usan totales inventados.',
    'Can my school or programme partner with CloudSprint?': '¿Puede mi escuela o programa asociarse con CloudSprint?', 'Yes. Use the partner link to start a conversation.': 'Sí. Usa el enlace de socios para iniciar una conversación.',
  },
  French: {
    'YOUR AZ-900 STUDY COMPANION': 'VOTRE COMPAGNON D’ÉTUDE AZ-900', 'Your AZ-900 journey, made clearer.': 'Votre parcours AZ-900, en toute clarté.',
    'Practise cloud concepts, learn from mistakes, and prepare with a study plan built around your progress.': 'Pratiquez les concepts cloud, apprenez de vos erreurs et préparez-vous avec un plan adapté à vos progrès.',
    'Get Started': 'Commencer', 'Explore Features': 'Découvrir les fonctionnalités', 'Everything you need to prepare': 'Tout pour vous préparer',
    'Practice quizzes': 'Quiz de pratique', 'Test your knowledge and understand your mistakes.': 'Testez vos connaissances et comprenez vos erreurs.',
    'Smart flashcards': 'Fiches intelligentes', 'Review important terms and difficult concepts.': 'Révisez les termes importants et les concepts difficiles.',
    'Personal progress': 'Progrès personnel', 'Track your readiness and organize your next study session.': 'Suivez votre préparation et organisez votre prochaine session.',
    'ABOUT US': 'À PROPOS', 'Built for focused, confident learning.': 'Conçu pour apprendre avec concentration et confiance.',
    'Our vision': 'Notre vision', 'Our mission': 'Notre mission', 'Our promise': 'Notre promesse',
    'PREPARE WITH CLOUDSPRINT': 'PRÉPAREZ-VOUS AVEC CLOUDSPRINT', 'Turn uncertainty into a plan.': 'Transformez l’incertitude en plan.',
    'OUR IMPACT': 'NOTRE IMPACT', 'Live recorded reach': 'Portée enregistrée', 'Participants recorded': 'Participants enregistrés', 'Countries recorded': 'Pays enregistrés', 'Schools and universities recorded': 'Écoles et universités enregistrées',
    'Learner testimonials': 'Témoignages d’apprenants', 'TRUSTED BY LEARNERS': 'CHOISI PAR LES APPRENANTS', 'Our partners': 'Nos partenaires', 'Partner with CloudSprint': 'Devenir partenaire', 'Frequently asked questions': 'Questions fréquentes',
  },
  German: {
    'YOUR AZ-900 STUDY COMPANION': 'DEIN AZ-900 LERNBEGLEITER', 'Your AZ-900 journey, made clearer.': 'Dein AZ-900-Weg, klarer gestaltet.',
    'Practise cloud concepts, learn from mistakes, and prepare with a study plan built around your progress.': 'Übe Cloud-Konzepte, lerne aus Fehlern und bereite dich mit einem Plan vor, der zu deinem Fortschritt passt.',
    'Get Started': 'Loslegen', 'Explore Features': 'Funktionen entdecken', 'Everything you need to prepare': 'Alles für deine Vorbereitung',
    'Practice quizzes': 'Übungsquiz', 'Smart flashcards': 'Intelligente Lernkarten', 'Personal progress': 'Persönlicher Fortschritt',
    'ABOUT US': 'ÜBER UNS', 'Our vision': 'Unsere Vision', 'Our mission': 'Unsere Mission', 'Our promise': 'Unser Versprechen',
    'PREPARE WITH CLOUDSPRINT': 'VORBEREITEN MIT CLOUDSPRINT', 'Turn uncertainty into a plan.': 'Aus Unsicherheit wird ein Plan.',
    'OUR IMPACT': 'UNSERE WIRKUNG', 'Live recorded reach': 'Aktuell erfasste Reichweite', 'Participants recorded': 'Erfasste Teilnehmende', 'Countries recorded': 'Erfasste Länder', 'Schools and universities recorded': 'Erfasste Schulen und Hochschulen',
    'Learner testimonials': 'Stimmen von Lernenden', 'TRUSTED BY LEARNERS': 'VON LERNENDEN VERTRAUT', 'Our partners': 'Unsere Partner', 'Partner with CloudSprint': 'Partner werden', 'Frequently asked questions': 'Häufig gestellte Fragen',
  },
  Portuguese: {
    'YOUR AZ-900 STUDY COMPANION': 'SEU COMPANHEIRO DE ESTUDOS AZ-900', 'Your AZ-900 journey, made clearer.': 'Sua jornada AZ-900, mais clara.',
    'Practise cloud concepts, learn from mistakes, and prepare with a study plan built around your progress.': 'Pratique conceitos de nuvem, aprenda com os erros e prepare-se com um plano baseado no seu progresso.',
    'Get Started': 'Começar', 'Explore Features': 'Explorar recursos', 'Everything you need to prepare': 'Tudo para se preparar',
    'Practice quizzes': 'Questionários de prática', 'Smart flashcards': 'Cartões inteligentes', 'Personal progress': 'Progresso pessoal',
    'ABOUT US': 'SOBRE NÓS', 'Our vision': 'Nossa visão', 'Our mission': 'Nossa missão', 'Our promise': 'Nossa promessa',
    'PREPARE WITH CLOUDSPRINT': 'PREPARE-SE COM CLOUDSPRINT', 'Turn uncertainty into a plan.': 'Transforme incerteza em um plano.',
    'OUR IMPACT': 'NOSSO IMPACTO', 'Live recorded reach': 'Alcance registrado', 'Participants recorded': 'Participantes registrados', 'Countries recorded': 'Países registrados', 'Schools and universities recorded': 'Escolas e universidades registradas',
    'Learner testimonials': 'Depoimentos de estudantes', 'TRUSTED BY LEARNERS': 'ESCOLHIDO POR ESTUDANTES', 'Our partners': 'Nossos parceiros', 'Partner with CloudSprint': 'Seja parceiro', 'Frequently asked questions': 'Perguntas frequentes',
  },
};

export function useAppLanguage(): [string, (key: TranslationKey) => string] {
  const [language, setLanguage] = useState(() => localStorage.getItem('cloudsprint_language') ?? 'English');
  useEffect(() => {
    const update = (event: Event) => setLanguage((event as CustomEvent<string>).detail);
    window.addEventListener('cloudsprint:language-change', update);
    return () => window.removeEventListener('cloudsprint:language-change', update);
  }, []);
  return [language, (key) => translations[language]?.[key] ?? key];
}
