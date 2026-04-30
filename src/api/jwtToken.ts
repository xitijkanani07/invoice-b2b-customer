type JwtResponse = { token: string };

const jwtCache = new Map<string, Promise<string>>();

function getJwtEndpoint(shopName: string) {
  const url = new URL('https://invoiceheroapi-test.mlveda.com/api/jwt');
  url.searchParams.set('shop', shopName);
  return url.toString();
}

async function fetchJwtToken(shopName: string): Promise<string> {
  const res = await fetch(getJwtEndpoint(shopName), {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(
      `JWT fetch failed (${res.status}): ${text || res.statusText}`,
    );
  }

  const data = (await res.json()) as Partial<JwtResponse>;
  if (!data.token) throw new Error('JWT fetch failed: missing token in response');
  return data.token;
}

export async function getJwtToken(shopName: string): Promise<string> {
  const key = shopName.trim();
  if (!jwtCache.has(key)) {
    jwtCache.set(
      key,
      fetchJwtToken(key).catch((err) => {
        jwtCache.delete(key);
        throw err;
      }),
    );
  }
  return await jwtCache.get(key)!;
}
