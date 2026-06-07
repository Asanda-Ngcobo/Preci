export default function sitemap() {
  const baseURL = 'www.preci.co.za'
  return [
    {
      url: baseURL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseURL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseURL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
     {
      url: `${baseURL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
     {
      url: `${baseURL}/blog/insurance`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
     {
      url: `${baseURL}/blog/phone`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
   {
      url: `${baseURL}/blog/housing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
       {
      url: `${baseURL}/blog/credit`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
       {
      url: `${baseURL}/blog/car`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
       {
      url: `${baseURL}/blog/employment`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
 {
      url: `${baseURL}/blog/gym`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },

  ]
}