import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    if (process.env.NODE_ENV !== 'development') return;

    const email = 'admin@local.dev';
    const password = 'Password1!';

    const existing = await strapi.db.query('admin::user').findOne({ where: { email } });
    if (existing) return;

    const superAdminRole = await strapi.db.query('admin::role').findOne({ where: { code: 'strapi-super-admin' } });

    await strapi.db.query('admin::user').create({
      data: {
        email,
        firstname: 'Dev',
        lastname: 'Admin',
        password: await strapi.service('admin::auth').hashPassword(password),
        isActive: true,
        roles: [superAdminRole.id],
      },
    });

    strapi.log.info('Dev admin user created: admin@local.dev / Password1!');
  },
};
