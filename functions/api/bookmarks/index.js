// GET/POST /api/bookmarks  —— 书签列表（公开过滤私密）与新增
// KV 键: bookmarks = JSON 数组
//   {id, name, url, description, cat, isPrivate:0/1, clicks:0}
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

export async function onRequestGet(context) {
  const kv = context.env.my_kv || globalThis.my_kv;
  const list = await loadList(kv);
  const auth = await requireAuth(context);
  const out = auth ? list : list.filter(b => !b.isPrivate);
  return json({ data: out });
}

export async function onRequestPost(context) {
  const auth = await requireAuth(context);
  if (!auth) return json({ error: '未登录' }, 401);
  const kv = context.env.my_kv || globalThis.my_kv;
  const body = await context.request.json();
  if (!body.name || !body.url) return json({ error: '名称和网址不能为空' }, 400);
  const list = await loadList(kv);
  const bm = {
    id: Date.now(),
    name: String(body.name).trim(),
    url: String(body.url).trim(),
    description: body.description || '',
    cat: body.cat || '常用导航',
    isPrivate: body.isPrivate ? 1 : 0,
    clicks: 0
  };
  list.push(bm);
  await saveList(kv, list);
  return json({ success: true, data: bm });
}
