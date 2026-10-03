import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCMS } from '../../context/CMSContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ title, description, ogImage }) => {
  const location = useLocation();
  const { getPageBySlug, globalSettings } = useCMS();

  useEffect(() => {
    // If explicit title is provided, use it; otherwise look up page by current pathname
    const activePage = getPageBySlug(location.pathname);
    const siteTitle = globalSettings?.siteName || 'CrossLife';
    const defaultTitle = globalSettings?.seo?.defaultTitle || 'CrossLife | A Conference for Young People';
    const defaultDesc = globalSettings?.seo?.defaultDescription || 'CrossLife is a young people’s conference organised by Equip Indian Churches.';
    const defaultImage = globalSettings?.seo?.defaultOgImage || '/images/crosslife-logo.webp';

    const pageTitle = title || activePage?.seo?.title || (activePage ? `${activePage.title} | ${siteTitle}` : defaultTitle);
    const pageDesc = description || activePage?.seo?.description || defaultDesc;
    const pageImage = ogImage || activePage?.seo?.ogImage || defaultImage;

    // Update document title
    document.title = pageTitle;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', pageDesc);

    // Update OG title
    let ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (!ogTitleMeta) {
      ogTitleMeta = document.createElement('meta');
      ogTitleMeta.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitleMeta);
    }
    ogTitleMeta.setAttribute('content', pageTitle);

    // Update OG description
    let ogDescMeta = document.querySelector('meta[property="og:description"]');
    if (!ogDescMeta) {
      ogDescMeta = document.createElement('meta');
      ogDescMeta.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescMeta);
    }
    ogDescMeta.setAttribute('content', pageDesc);

    // Update OG Image
    let ogImgMeta = document.querySelector('meta[property="og:image"]');
    if (!ogImgMeta) {
      ogImgMeta = document.createElement('meta');
      ogImgMeta.setAttribute('property', 'og:image');
      document.head.appendChild(ogImgMeta);
    }
    ogImgMeta.setAttribute('content', pageImage);
  }, [location.pathname, title, description, ogImage, getPageBySlug, globalSettings]);

  return null;
};

export default SEOHead;
