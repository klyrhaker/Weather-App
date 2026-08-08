async function weatherService(
  url: string,
  signal: AbortSignal,
): Promise<unknown> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`error: ${res.status}`);

  return res.json();
}
export default weatherService;
