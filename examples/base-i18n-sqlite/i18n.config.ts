export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      nav: {
        home: 'Home',
        blog: 'Blog',
        about: 'About',
      },
      hero: {
        title: 'Welcome to my blog',
        subtitle: 'Stories in English and Spanish',
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
        about: 'Acerca de',
      },
      hero: {
        title: 'Bienvenido a mi blog',
        subtitle: 'Historias en inglés y español',
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
