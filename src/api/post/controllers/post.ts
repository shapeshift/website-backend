import { factories } from '@strapi/strapi'

interface PostFilters {
  type?: { $contains?: string; $containsi?: string }
  [key: string]: unknown
}

interface PostQuery {
  filters?: PostFilters
  pagination?: { page?: number; pageSize?: number }
  [key: string]: unknown
}

export default factories.createCoreController('api::post.post', ({ strapi }) => ({
  async find(ctx) {
    const query = ctx.query as PostQuery

    const { type, ...restFilters } = query.filters ?? {}

    // Support both $contains and $containsi from the frontend
    const typeFilter = type?.$contains ?? type?.$containsi

    if (!typeFilter) return super.find(ctx)

    // strapi-plugin-multi-select stores `type` as jsonb in PostgreSQL.
    // LIKE/ILIKE fail on jsonb ("operator does not exist: jsonb ~~ unknown").
    // We resolve matching IDs via a raw ::text cast, then hand off to super.find()
    // so that populate, pagination, fields, and sort all work normally.
    //
    // Hyphens in the search term are replaced with underscores because _ is a
    // single-char wildcard in LIKE patterns, making %crypto_pro% match both
    // "Crypto_pro" and "crypto-pro" regardless of separator convention.
    const pattern = `%${String(typeFilter).replace(/-/g, '_')}%`

    const rows = await strapi.db
      .connection('posts')
      .whereNotNull('published_at')
      .whereRaw('type::text ILIKE ?', [pattern])
      .select<{ id: number }[]>('id')

    if (rows.length === 0) {
      return ctx.send({
        data: [],
        meta: { pagination: { page: 1, pageSize: query.pagination?.pageSize ?? 25, pageCount: 0, total: 0 } },
      })
    }

    ctx.query = {
      ...query,
      filters: {
        ...restFilters,
        id: { $in: rows.map((r) => r.id) },
      },
    }

    return super.find(ctx)
  },
}))
