export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      nav: {
        home: 'Home',
        blog: 'Blog',
        dashboard: 'Dashboard',
      },
      hero: {
        title: 'Welcome to our platform',
        subtitle: 'Built with Nuxt, Tailwind, and Supabase',
      },
      auth: {
        login: 'Login',
        logout: 'Logout',
        enterEmail: 'Enter your email',
        sendLink: 'Send magic link',
        checkEmail: 'Check your email for the login link',
        loggedInAs: 'Logged in as',
      },
      blog: {
        title: 'Blog posts',
        noPostsYet: 'No posts published yet',
        readMore: 'Read more',
      },
      common: {
        loading: 'Loading...',
        error: 'Something went wrong',
      },
    },
    es: {
      nav: {
        home: 'Inicio',
        blog: 'Blog',
        dashboard: 'Panel de control',
      },
      hero: {
        title: 'Bienvenido a nuestra plataforma',
        subtitle: 'Construido con Nuxt, Tailwind y Supabase',
      },
      auth: {
        login: 'Iniciar sesión',
        logout: 'Cerrar sesión',
        enterEmail: 'Ingresa tu correo',
        sendLink: 'Enviar enlace mágico',
        checkEmail: 'Revisa tu correo para el enlace de inicio de sesión',
        loggedInAs: 'Conectado como',
      },
      blog: {
        title: 'Artículos del blog',
        noPostsYet: 'Sin artículos publicados aún',
        readMore: 'Leer más',
      },
      common: {
        loading: 'Cargando...',
        error: 'Algo salió mal',
      },
    },
  },
}));
