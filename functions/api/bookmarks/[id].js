// PUT/DELETE /api/bookmarks/:id  —— 编辑 / 删除书签（需登录）
const KEY = 'bookmarks';
async function loadList(kv) { const r = await kv.get(KEY); return r ? JSON.parse(r) : []; }
async function saveList(kv, list) { await kv.put(KEY, JSON.stringify(list)); }
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

export async function onRequestPut(context) {
  const auth = await requireAuth(context);
  if (!auth) return json({ error: '未登录' }, 401);
  const kv = context.env.my_kv || globalThis.my_kv;
  const id = Number(context.params.id);
  const body = await context.request.json();
  const list = await loadList(kv);
  const i = list.findIndex(b => b.id === id);
  if (i < 0) return json({ error: '未找到该书签' }, 404);
  const allowed = ['name', 'url', 'description', 'cat', 'isPrivate'];
  allowed.forEach(k => { if (k in body) list[i][k] = body[k]; });
  await saveList(kv, list);
  return json({ success: true, data: list[i] });
}

export async function onRequestDelete(context) {
  const auth = await requireAuth(context);
  if (!auth) return json({ error: '未登录' }, 401);
  const kv = context.env.my_kv || globalThis.my_kv;
  const id = Number(context.params.id);
  let list = await loadList(kv);
  list = list.filter(b => b.id !== id);
  await saveList(kv, list);
  return json({ success: true });
}
