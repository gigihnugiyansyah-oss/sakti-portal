export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // SISTEM HANYA AKAN MENGUNCI HALAMAN ADMIN KAMU
  if (url.pathname === "/admin-sakti.html" || url.pathname === "/admin-sakti") {
    const authHeader = request.headers.get("Authorization");

    // ATUR USERNAME DAN PASSWORD DI SINI
    const USERNAME = "petugaslapaste"; 
    const PASSWORD = "SaktiLapaste2026"; 

    if (authHeader) {
      const [scheme, encoded] = authHeader.split(" ");
      if (scheme === "Basic" && encoded) {
        const decoded = atob(encoded);
        const [username, password] = decoded.split(":");

        // JIKA COCOK, PERBOLEHKAN MASUK
        if (username === USERNAME && password === PASSWORD) {
          return await context.next();
        }
      }
    }

    // JIKA SALAH ATAU BELUM LOGIN, TAMPILKAN KOTAK KATA SANDI
    return new Response("Akses Ditolak. Halaman ini Khusus Petugas Lapas Tegal.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Portal Admin SAKTI"',
      },
    });
  }

  // Halaman selain admin (seperti index.html) tidak akan dikunci
  return await context.next();
}
