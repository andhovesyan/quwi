export default function ({ app }) {
  app.$auth.onError((_, name) => {
    app.$auth.reset();
    if (name.method !== 'request' && name.method !== 'login') {
      app.router.go(app.$auth.options.redirect.login);
    }
  });
}
