export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/users/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: ["/users/", "/api/"],
      },
    ],

    sitemap: "https://preci.co.za/sitemap.xml",

    host: "https://preci.co.za",
  };
}