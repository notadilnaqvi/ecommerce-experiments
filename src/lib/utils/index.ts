/** Simulate an API call */
export async function sleep(ms: number) {
  return new Promise((r) => {
    setTimeout(r, ms);
  });
}

/** Equivalent to `btoa` but works on the server */
export function toBase64(str: string) {
	return Buffer.from(str).toString('base64');
}
