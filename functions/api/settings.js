// GET/PUT /api/settings  —— 站点设置（常用区数量、标题等）
// KV 键: settings = { hotCount: 8, title: '📚 书签导航' }
const KEY = 'settings';
const DEFAULTS = { hotCount: 8, title: '📚 书签导航' };
async function requireAuth(context) {
  const kv = context.env.my_kv || globalThis.my_kv;
  const a = context.request.headers.get('Authorization') || '';
  const m = a.match(/^Bearer\s+(.+)$/);
  if (!m) return null;
  return await kv.get('session:' + m[1]);
}
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*' }
  });
}

export async function onRequestGet(context) {
  const kv = context.env.my_kv || globalThis.my_kv;
  const raw = await kv.get(KEY);
  return json({ data: raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS });
}

export async function onRequestPut(context) {
  const auth = await requireAuth(context);
  if (!auth) return json({ error: '未登录' }, 401);
  const kv = context.env.my_kv || globalThis.my_kv;
  const body = await context.request.json();
  const next = { ...DEFAULTS, ...body };
  await kv.put(KEY, JSON.stringify(next));
  return json({ success: true, data: next });
}
