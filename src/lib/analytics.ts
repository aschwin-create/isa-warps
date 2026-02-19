// Google Analytics 4 tracking functions

export const GA_TRACKING_ID = 'G-XKJR7B8BCT';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Specific event tracking functions
export const trackFormSubmission = (formType: 'contact' | 'partnership') => {
  event({
    action: 'form_submission',
    category: 'engagement',
    label: formType,
  });
};

export const trackPDFDownload = (pdfName: string) => {
  event({
    action: 'pdf_download',
    category: 'downloads',
    label: pdfName,
  });
};

export const trackSocialClick = (platform: string) => {
  event({
    action: 'social_click',
    category: 'social_media',
    label: platform,
  });
};

export const trackExternalLink = (url: string) => {
  event({
    action: 'external_link_click',
    category: 'navigation',
    label: url,
  });
};

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}
