// GET /api/frequent  —— 返回点击频率最高的书签排行（用于前端动态生成“常用”区）
// 返回: { "data": [{ "id": 12, "count": 5 }, ...] }
export async function onRequestGet(context) {
  const kv = context.env.my_kv || globalThis.my_kv;
  try {
    const raw = await kv.get('clicks') || '{}';
    const data = JSON.parse(raw);
    const top = Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([id, count]) => ({ id: Number(id), count }));
    return new Response(JSON.stringify({ data: top }), {
      headers: { 'content-type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ data: [], error: e.message }), {
      status: 500,
      headers: { 'content-type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
