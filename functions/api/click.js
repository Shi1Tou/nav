// POST /api/click  —— 记录一次书签点击，在 bookmarks 数组里累加 clicks
export async function onRequestPost(context) {
  const kv = context.env.my_kv || globalThis.my_kv;
  try {
    const { id } = await context.request.json();
    const raw = await kv.get('bookmarks');
    if (!raw) return new Response(JSON.stringify({ error: 'no data' }), { status: 404 });
    const list = JSON.parse(raw);
    const b = list.find(x => x.id === id);
    if (b) b.clicks = (b.clicks || 0) + 1;
    await kv.put('bookmarks', JSON.stringify(list));
    return new Response(JSON.stringify({ success: true, count: b ? b.clicks : 0 }), {
      headers: { 'content-type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
