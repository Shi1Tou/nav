// POST /api/login  —— 管理员登录
// 环境变量: ADMIN_USERNAME (默认 admin), ADMIN_PASSWORD (必须设置)
// 返回: { token }  token 写入 KV session:<token>，7 天过期
export async function onRequestPost(context) {
  const kv = context.env.my_kv || globalThis.my_kv;
  try {
    const { username, password } = await context.request.json();
    const u = context.env.ADMIN_USERNAME || 'admin';
    const p = context.env.ADMIN_PASSWORD;
    if (!p) return json({ error: '服务端未配置 ADMIN_PASSWORD 环境变量' }, 500);
    if (username !== u || password !== p) return json({ error: '用户名或密码错误' }, 401);
    const token = crypto.randomUUID().replace(/-/g, '') + Date.now().toString(36);
    await kv.put('session:' + token, u, { expirationTtl: 7 * 24 * 3600 });
    return json({ success: true, token, username: u });
  } catch (e) {
    return json({ error: '登录失败: ' + e.message }, 500);
  }
}
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*' }
  });
}
