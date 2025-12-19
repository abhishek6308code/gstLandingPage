// import { useEffect } from 'react';

// interface SEOProps {
//   title: string;
//   description: string;
//   keywords?: string;
//   ogImage?: string;
//   url?: string;
// }

// export function SEO({ title, description, keywords, ogImage , url = 'https://thefinanceshowbyak.com',}: SEOProps) {
//   useEffect(() => {
//     document.title = `${title} | TheFinanceShowByAK - Professional GST & Financial Services`;

//     let metaDescription = document.querySelector('meta[name="description"]');
//     if (!metaDescription) {
//       metaDescription = document.createElement('meta');
//       metaDescription.setAttribute('name', 'description');
//       document.head.appendChild(metaDescription);
//     }
//     metaDescription.setAttribute('content', description);

//     if (keywords) {
//       let metaKeywords = document.querySelector('meta[name="keywords"]');
//       if (!metaKeywords) {
//         metaKeywords = document.createElement('meta');
//         metaKeywords.setAttribute('name', 'keywords');
//         document.head.appendChild(metaKeywords);
//       }
//       metaKeywords.setAttribute('content', keywords);
//     }

//     let ogTitle = document.querySelector('meta[property="og:title"]');
//     if (!ogTitle) {
//       ogTitle = document.createElement('meta');
//       ogTitle.setAttribute('property', 'og:title');
//       document.head.appendChild(ogTitle);
//     }
//     ogTitle.setAttribute('content', title);

//     let ogDescription = document.querySelector('meta[property="og:description"]');
//     if (!ogDescription) {
//       ogDescription = document.createElement('meta');
//       ogDescription.setAttribute('property', 'og:description');
//       document.head.appendChild(ogDescription);
//     }
//     ogDescription.setAttribute('content', description);

//     if (ogImage) {
//       let ogImageTag = document.querySelector('meta[property="og:image"]');
//       if (!ogImageTag) {
//         ogImageTag = document.createElement('meta');
//         ogImageTag.setAttribute('property', 'og:image');
//         document.head.appendChild(ogImageTag);
//       }
//       ogImageTag.setAttribute('content', ogImage);
//     }
//   }, [title, description, keywords, ogImage]);

//   return null;
// }
import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
}

export function SEO({
  title,
  description,
  keywords,
  ogImage,
  url = 'https://thefinanceshowbyak.onrender.com',
}: SEOProps) {
  useEffect(() => {
    // Title
    document.title = `${title} | The Finance Show By A.K`;

    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Keywords (optional)
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Open Graph tags
    const setOG = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setOG('og:title', title);
    setOG('og:description', description);
    setOG('og:type', 'website');
    setOG('og:url', url);

    if (ogImage) {
      setOG('og:image', ogImage);
    }

    // Twitter tags
    const setTwitter = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setTwitter('twitter:card', 'summary_large_image');
    setTwitter('twitter:title', title);
    setTwitter('twitter:description', description);

    if (ogImage) {
      setTwitter('twitter:image', ogImage);
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [title, description, keywords, ogImage, url]);

  return null;
}
