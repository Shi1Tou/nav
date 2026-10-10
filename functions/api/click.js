// POST /api/click  —— 记录一次书签点击，计数存入 EdgeOne KV
// 请求体: { "id": 12 }
// KV 键: clicks (JSON 对象 { "书签id": 次数 })
export async function onRequestPost(context) {
  const kv = context.env.my_kv || globalThis.my_kv;
  try {
    const { id } = await context.request.json();
    if (id === undefined || id === null) {
      return json({ error: 'missing id' }, 400);
    }
    const raw = await kv.get('clicks') || '{}';
    const data = JSON.parse(raw);
    data[id] = (data[id] || 0) + 1;
    await kv.put('clicks', JSON.stringify(data));
    return json({ success: true, id, count: data[id] });
  } catch (e) {
    return json({ error: 'record failed: ' + e.message }, 500);
  }
}

// 简单 CORS 预检
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*' }
  });
}
