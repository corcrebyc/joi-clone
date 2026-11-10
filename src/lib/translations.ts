export type Locale = "pt" | "en" | "es" | "fr" | "de" | "ar";

export const locales: { code: Locale; label: string; flag: string }[] = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

export const translations = {
  pt: {
    // Navbar
    navExplore: "Explorar",
    navCreate: "Criar",
    navChats: "Chats",
    navLogin: "Entrar",
    navSignup: "Criar conta",

    // Home
    heroTitle1: "Expanda sua",
    heroTitle2: "imaginação",
    heroSubtitle:
      "Converse com companheiras de IA, crie personagens do zero e explore fantasias sem julgamento.",
    heroCtaCreate: "Criar sua IA",
    heroCtaExplore: "Explorar galeria",
    ageNotice:
      "Conteúdo para maiores de 18 anos. Ao continuar você confirma que tem idade legal.",
    galleryTitle: "Conheça as Joi Babes",
    galleryCount: "personagens",
    ctaTitle: "Crie a companheira dos seus sonhos",
    ctaSubtitle:
      "Defina aparência, personalidade e preferências. A IA se adapta a você.",
    ctaButton: "Começar agora — é grátis",

    // Character page
    chatNow: "Conversar agora",
    back: "Voltar",
    chats: "chats",
    likes: "likes",

    // Create
    createTitle: "Criar sua companheira",
    createSubtitle:
      "Defina a personalidade, aparência e estilo. Quanto mais detalhes, melhor a IA responde.",
    labelName: "Nome",
    placeholderName: "Ex: Luna, Sofia, Kaida...",
    labelAge: "Idade",
    labelTagline: "Slogan / Tagline",
    placeholderTagline: "Ex: Quietly Haunted, Restless & Daring",
    labelDescription: "Descrição / História",
    placeholderDescription:
      "Conte quem ela é, o que gosta, como se comporta...",
    labelPersonality: "Personalidade (separada por vírgula)",
    placeholderPersonality: "tímida, submissa, sarcástica, dominante...",
    labelTags: "Tags (separadas por vírgula)",
    placeholderTags: "Gótica, Fitness, Anime, Dominante...",
    avatarPlaceholder:
      "Geração de avatar com IA virá na próxima etapa. Por enquanto usamos imagens de placeholder.",
    createButton: "Criar e conversar",

    // Chat
    chatPlaceholder: "Mensagem para",
    send: "Enviar",
    leave: "Sair",
    loadingChat: "Carregando chat...",
    simulatedNote:
      "Respostas simuladas. Depois conectamos com IA real (OpenAI, Grok, etc).",
    notFound: "Personagem não encontrado.",
  },

  en: {
    navExplore: "Explore",
    navCreate: "Create",
    navChats: "Chats",
    navLogin: "Log in",
    navSignup: "Sign up",

    heroTitle1: "Expand your",
    heroTitle2: "imagination",
    heroSubtitle:
      "Chat with AI companions, create characters from scratch and explore fantasies without judgment.",
    heroCtaCreate: "Create your AI",
    heroCtaExplore: "Explore gallery",
    ageNotice:
      "Content for adults 18+. By continuing you confirm you are of legal age.",
    galleryTitle: "Meet the Joi Babes",
    galleryCount: "characters",
    ctaTitle: "Create the companion of your dreams",
    ctaSubtitle:
      "Define appearance, personality and preferences. The AI adapts to you.",
    ctaButton: "Start now — it's free",

    chatNow: "Chat now",
    back: "Back",
    chats: "chats",
    likes: "likes",

    createTitle: "Create your companion",
    createSubtitle:
      "Define personality, appearance and style. The more details, the better the AI responds.",
    labelName: "Name",
    placeholderName: "Ex: Luna, Sofia, Kaida...",
    labelAge: "Age",
    labelTagline: "Tagline",
    placeholderTagline: "Ex: Quietly Haunted, Restless & Daring",
    labelDescription: "Description / Story",
    placeholderDescription:
      "Tell who she is, what she likes, how she behaves...",
    labelPersonality: "Personality (comma separated)",
    placeholderPersonality: "shy, submissive, sarcastic, dominant...",
    labelTags: "Tags (comma separated)",
    placeholderTags: "Gothic, Fitness, Anime, Dominant...",
    avatarPlaceholder:
      "AI avatar generation coming next. For now we use placeholder images.",
    createButton: "Create and chat",

    chatPlaceholder: "Message to",
    send: "Send",
    leave: "Leave",
    loadingChat: "Loading chat...",
    simulatedNote:
      "Simulated replies. Later we connect real AI (OpenAI, Grok, etc).",
    notFound: "Character not found.",
  },

  es: {
    navExplore: "Explorar",
    navCreate: "Crear",
    navChats: "Chats",
    navLogin: "Entrar",
    navSignup: "Crear cuenta",

    heroTitle1: "Expande tu",
    heroTitle2: "imaginación",
    heroSubtitle:
      "Habla con compañeras de IA, crea personajes desde cero y explora fantasías sin juicio.",
    heroCtaCreate: "Crear tu IA",
    heroCtaExplore: "Explorar galería",
    ageNotice:
      "Contenido para mayores de 18 años. Al continuar confirmas que tienes la edad legal.",
    galleryTitle: "Conoce a las Joi Babes",
    galleryCount: "personajes",
    ctaTitle: "Crea la compañera de tus sueños",
    ctaSubtitle:
      "Define apariencia, personalidad y preferencias. La IA se adapta a ti.",
    ctaButton: "Empezar ahora — es gratis",

    chatNow: "Chatear ahora",
    back: "Volver",
    chats: "chats",
    likes: "likes",

    createTitle: "Crear tu compañera",
    createSubtitle:
      "Define la personalidad, apariencia y estilo. Cuantos más detalles, mejor responde la IA.",
    labelName: "Nombre",
    placeholderName: "Ej: Luna, Sofia, Kaida...",
    labelAge: "Edad",
    labelTagline: "Eslogan / Tagline",
    placeholderTagline: "Ej: Quietly Haunted, Restless & Daring",
    labelDescription: "Descripción / Historia",
    placeholderDescription:
      "Cuenta quién es ella, qué le gusta, cómo se comporta...",
    labelPersonality: "Personalidad (separada por coma)",
    placeholderPersonality: "tímida, sumisa, sarcástica, dominante...",
    labelTags: "Tags (separadas por coma)",
    placeholderTags: "Gótica, Fitness, Anime, Dominante...",
    avatarPlaceholder:
      "La generación de avatar con IA llegará después. Por ahora usamos imágenes de placeholder.",
    createButton: "Crear y chatear",

    chatPlaceholder: "Mensaje para",
    send: "Enviar",
    leave: "Salir",
    loadingChat: "Cargando chat...",
    simulatedNote:
      "Respuestas simuladas. Después conectamos con IA real (OpenAI, Grok, etc).",
    notFound: "Personaje no encontrado.",
  },

  fr: {
    navExplore: "Explorer",
    navCreate: "Créer",
    navChats: "Chats",
    navLogin: "Connexion",
    navSignup: "Créer un compte",

    heroTitle1: "Élargissez votre",
    heroTitle2: "imagination",
    heroSubtitle:
      "Discutez avec des compagnes IA, créez des personnages et explorez des fantasmes sans jugement.",
    heroCtaCreate: "Créer votre IA",
    heroCtaExplore: "Explorer la galerie",
    ageNotice:
      "Contenu réservé aux 18+. En continuant, vous confirmez être majeur.",
    galleryTitle: "Rencontrez les Joi Babes",
    galleryCount: "personnages",
    ctaTitle: "Créez la compagne de vos rêves",
    ctaSubtitle:
      "Définissez l'apparence, la personnalité et les préférences. L'IA s'adapte à vous.",
    ctaButton: "Commencer maintenant — c'est gratuit",

    chatNow: "Discuter maintenant",
    back: "Retour",
    chats: "chats",
    likes: "likes",

    createTitle: "Créer votre compagne",
    createSubtitle:
      "Définissez la personnalité, l'apparence et le style. Plus de détails = meilleures réponses.",
    labelName: "Nom",
    placeholderName: "Ex: Luna, Sofia, Kaida...",
    labelAge: "Âge",
    labelTagline: "Slogan / Tagline",
    placeholderTagline: "Ex: Quietly Haunted, Restless & Daring",
    labelDescription: "Description / Histoire",
    placeholderDescription:
      "Décrivez qui elle est, ce qu'elle aime, comment elle se comporte...",
    labelPersonality: "Personnalité (séparée par des virgules)",
    placeholderPersonality: "timide, soumise, sarcastique, dominante...",
    labelTags: "Tags (séparés par des virgules)",
    placeholderTags: "Gothique, Fitness, Anime, Dominante...",
    avatarPlaceholder:
      "La génération d'avatar IA arrivera bientôt. Pour l'instant, images placeholder.",
    createButton: "Créer et discuter",

    chatPlaceholder: "Message pour",
    send: "Envoyer",
    leave: "Quitter",
    loadingChat: "Chargement du chat...",
    simulatedNote:
      "Réponses simulées. Plus tard on connecte une vraie IA (OpenAI, Grok, etc).",
    notFound: "Personnage introuvable.",
  },

  de: {
    navExplore: "Entdecken",
    navCreate: "Erstellen",
    navChats: "Chats",
    navLogin: "Anmelden",
    navSignup: "Konto erstellen",

    heroTitle1: "Erweitere deine",
    heroTitle2: "Vorstellungskraft",
    heroSubtitle:
      "Chatte mit KI-Begleiterinnen, erstelle Charaktere von Grund auf und erkunde Fantasien ohne Urteil.",
    heroCtaCreate: "Deine KI erstellen",
    heroCtaExplore: "Galerie entdecken",
    ageNotice:
      "Inhalt für Erwachsene ab 18. Mit dem Fortfahren bestätigst du, dass du volljährig bist.",
    galleryTitle: "Triff die Joi Babes",
    galleryCount: "Charaktere",
    ctaTitle: "Erstelle die Begleiterin deiner Träume",
    ctaSubtitle:
      "Definiere Aussehen, Persönlichkeit und Vorlieben. Die KI passt sich dir an.",
    ctaButton: "Jetzt starten — kostenlos",

    chatNow: "Jetzt chatten",
    back: "Zurück",
    chats: "Chats",
    likes: "Likes",

    createTitle: "Deine Begleiterin erstellen",
    createSubtitle:
      "Definiere Persönlichkeit, Aussehen und Stil. Je mehr Details, desto besser antwortet die KI.",
    labelName: "Name",
    placeholderName: "Z.B.: Luna, Sofia, Kaida...",
    labelAge: "Alter",
    labelTagline: "Slogan / Tagline",
    placeholderTagline: "Z.B.: Quietly Haunted, Restless & Daring",
    labelDescription: "Beschreibung / Geschichte",
    placeholderDescription:
      "Erzähl, wer sie ist, was sie mag, wie sie sich verhält...",
    labelPersonality: "Persönlichkeit (durch Komma getrennt)",
    placeholderPersonality: "schüchtern, unterwürfig, sarkastisch, dominant...",
    labelTags: "Tags (durch Komma getrennt)",
    placeholderTags: "Gothic, Fitness, Anime, Dominant...",
    avatarPlaceholder:
      "KI-Avatar-Generierung kommt als Nächstes. Vorerst Platzhalterbilder.",
    createButton: "Erstellen und chatten",

    chatPlaceholder: "Nachricht an",
    send: "Senden",
    leave: "Verlassen",
    loadingChat: "Chat wird geladen...",
    simulatedNote:
      "Simulierte Antworten. Später verbinden wir echte KI (OpenAI, Grok usw.).",
    notFound: "Charakter nicht gefunden.",
  },

  ar: {
    navExplore: "استكشاف",
    navCreate: "إنشاء",
    navChats: "المحادثات",
    navLogin: "تسجيل الدخول",
    navSignup: "إنشاء حساب",

    heroTitle1: "وسّع",
    heroTitle2: "خيالك",
    heroSubtitle:
      "تحدث مع رفيقات الذكاء الاصطناعي، أنشئ شخصيات من الصفر واستكشف الخيالات دون أحكام.",
    heroCtaCreate: "أنشئ ذكاءك الاصطناعي",
    heroCtaExplore: "استكشف المعرض",
    ageNotice:
      "محتوى للبالغين فوق 18 سنة. بالمتابعة تؤكد أنك في السن القانوني.",
    galleryTitle: "تعرّف على Joi Babes",
    galleryCount: "شخصيات",
    ctaTitle: "أنشئ الرفيقة التي تحلم بها",
    ctaSubtitle:
      "حدّد المظهر والشخصية والتفضيلات. الذكاء الاصطناعي يتكيّف معك.",
    ctaButton: "ابدأ الآن — مجاناً",

    chatNow: "تحدث الآن",
    back: "رجوع",
    chats: "محادثات",
    likes: "إعجابات",

    createTitle: "أنشئ رفيقتك",
    createSubtitle:
      "حدّد الشخصية والمظهر والأسلوب. كلما زادت التفاصيل، كانت إجابات الذكاء الاصطناعي أفضل.",
    labelName: "الاسم",
    placeholderName: "مثال: لونا، صوفيا، كايدا...",
    labelAge: "العمر",
    labelTagline: "الشعار",
    placeholderTagline: "مثال: بهدوء مسكونة، قلقة وجريئة",
    labelDescription: "الوصف / القصة",
    placeholderDescription:
      "أخبر من هي، ماذا تحب، وكيف تتصرف...",
    labelPersonality: "الشخصية (مفصولة بفواصل)",
    placeholderPersonality: "خجولة، خاضعة، ساخرة، مسيطرة...",
    labelTags: "الوسوم (مفصولة بفواصل)",
    placeholderTags: "قوطية، لياقة، أنمي، مسيطرة...",
    avatarPlaceholder:
      "توليد الصورة الرمزية بالذكاء الاصطناعي قادم قريباً. حالياً نستخدم صوراً مؤقتة.",
    createButton: "إنشاء والتحدث",

    chatPlaceholder: "رسالة إلى",
    send: "إرسال",
    leave: "مغادرة",
    loadingChat: "جاري تحميل المحادثة...",
    simulatedNote:
      "ردود محاكاة. لاحقاً نربط ذكاءً اصطناعياً حقيقياً (OpenAI، Grok، إلخ).",
    notFound: "الشخصية غير موجودة.",
  },
} as const;

export type TranslationKey = keyof typeof translations.pt;
