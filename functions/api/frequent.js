// GET /api/frequent  —— 按 clicks 排序返回高频书签（私密书签仅登录后可见）
async function requireAuth(context) {
  const kv = context.env.my_kv || globalThis.my_kv;
  const a = context.request.headers.get('Authorization') || '';
  const m = a.match(/^Bearer\s+(.+)$/);
  if (!m) return null;
  return await kv.get('session:' + m[1]);
}
export async function onRequestGet(context) {
  const kv = context.env.my_kv || globalThis.my_kv;
  const raw = await kv.get('bookmarks');
  const list = raw ? JSON.parse(raw) : [];
  const auth = await requireAuth(context);
  const pool = auth ? list : list.filter(b => !b.isPrivate);
  const top = [...pool].sort((a, b) => (b.clicks || 0) - (a.clicks || 0)).slice(0, 12);
  return new Response(JSON.stringify({ data: top }), {
    headers: { 'content-type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*' }
  });
}
