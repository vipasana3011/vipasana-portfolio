/**
 * Google Analytics 4 (GA4) Utility
 * Measurement ID: G-QPLMRT3QB8 (or NEXT_PUBLIC_GA_MEASUREMENT_ID)
 * 
 * Production-ready, non-blocking, privacy-compliant (Zero PII).
 */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-QPLMRT3QB8';

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetIdOrEventName: string | Date,
      configOrParams?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Safe core dispatcher for GA4 events.
 * Handles SSR safety, ad-blocker tolerance, and dev logging.
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window === 'undefined') return;

  // Filter out undefined values to keep payloads clean
  const cleanParams: Record<string, string | number | boolean> = {};
  if (eventParams) {
    for (const [key, val] of Object.entries(eventParams)) {
      if (val !== undefined && val !== null) {
        cleanParams[key] = val;
      }
    }
  }

  // Development logger for rapid verification
  if (process.env.NODE_ENV === 'development') {
    console.log(`[GA4 Event] %c${eventName}`, 'color: #f43f5e; font-weight: bold;', cleanParams);
  }

  // Dispatch via window.gtag if available
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, cleanParams);
    } catch (err) {
      console.warn('[GA4] Event dispatch error:', err);
    }
  }
}

// Session store helpers to avoid redundant duplicate events in the same session
const isSessionItemLogged = (key: string): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(`ga4_${key}`) === '1';
  } catch {
    return false;
  }
};

const markSessionItemLogged = (key: string): void => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(`ga4_${key}`, '1');
  } catch {
    // Ignore sessionStorage quota / permission errors
  }
};

/**
 * 1. Navigation Click Tracking
 * Event: navigation_click
 * Parameters: section_name, link_text, link_location
 */
export function trackNavigationClick(
  sectionName: string,
  linkText: string,
  linkLocation: 'navbar_desktop' | 'navbar_mobile' | 'navbar_logo' | 'hero' | 'footer' | 'other' = 'other'
) {
  trackEvent('navigation_click', {
    section_name: sectionName.toLowerCase(),
    link_text: linkText,
    link_location: linkLocation,
  });
}

/**
 * 2. Section View Tracking (IntersectionObserver)
 * Event: section_view
 * Parameter: section_name
 * Rule: Only fires once per session per section
 */
export function trackSectionView(sectionName: string) {
  const sessionKey = `sec_view_${sectionName.toLowerCase()}`;
  if (isSessionItemLogged(sessionKey)) return;

  markSessionItemLogged(sessionKey);
  trackEvent('section_view', {
    section_name: sectionName.toLowerCase(),
  });
}

/**
 * 3. Project Click Tracking
 * Event: project_click
 * Parameters: project_name, project_category, project_url, link_location
 */
export function trackProjectClick(
  projectName: string,
  projectCategory: string,
  projectUrl: string,
  linkLocation: 'project_card_button' | 'project_card_link' | 'project_detail' = 'project_card_button'
) {
  trackEvent('project_click', {
    project_name: projectName,
    project_category: projectCategory,
    project_url: projectUrl,
    link_location: linkLocation,
  });
}

/**
 * 4. Project Category Filter Tracking
 * Event: project_category_filter
 * Parameter: category
 */
export function trackProjectCategoryFilter(category: string) {
  trackEvent('project_category_filter', {
    category: category.toLowerCase(),
  });
}

/**
 * 5. CV / Resume Download Tracking (Key Event Candidate)
 * Event: cv_download
 * Parameters: file_name, location, button_text
 */
export function trackCvDownload(
  fileName: string = 'VIPASANA_RESUME.pdf',
  location: 'navbar_desktop' | 'navbar_mobile' | 'hero' | 'footer' = 'hero',
  buttonText: string = 'Download CV'
) {
  trackEvent('cv_download', {
    file_name: fileName,
    location: location,
    button_text: buttonText,
  });
}

/**
 * 6. Contact Action Tracking (Key Event Candidates)
 * Separate events: email_click, whatsapp_click, linkedin_click, github_click
 * Parameters: location, link_type
 * PRIVACY: Absolutely no PII sent.
 */
export function trackContactAction(
  actionType: 'email' | 'whatsapp' | 'linkedin' | 'github',
  location: 'contact_card' | 'contact_socials' | 'hero' | 'navbar' | 'footer' = 'contact_card',
  linkType: 'mailto' | 'whatsapp_link' | 'external_profile' | 'direct_chat' = 'external_profile'
) {
  const eventName = `${actionType}_click`;
  trackEvent(eventName, {
    location,
    link_type: linkType,
  });
}

/**
 * 7. Certificate Click Tracking
 * Event: certificate_click
 * Parameters: certificate_name, certificate_provider, certificate_year, location
 */
export function trackCertificateClick(
  certificateName: string,
  certificateProvider: string,
  certificateYear: string,
  location: 'certifications_grid' | 'modal_full_view' = 'certifications_grid'
) {
  trackEvent('certificate_click', {
    certificate_name: certificateName,
    certificate_provider: certificateProvider,
    certificate_year: certificateYear,
    location,
  });
}

/**
 * 8. Contact Form Tracking (Zero PII)
 * - contact_form_start (parameter: form_name)
 * - generate_lead (parameters: form_name, success) [KEY EVENT]
 * - contact_form_error (parameters: form_name, error_type)
 */
export function trackContactFormStart(formName: string = 'contact_section_form') {
  const sessionKey = `form_start_${formName}`;
  if (isSessionItemLogged(sessionKey)) return;

  markSessionItemLogged(sessionKey);
  trackEvent('contact_form_start', {
    form_name: formName,
  });
}

export function trackGenerateLead(
  formName: string = 'contact_section_form',
  success: boolean = true
) {
  trackEvent('generate_lead', {
    form_name: formName,
    success: success,
  });
}

export function trackContactFormError(
  formName: string = 'contact_section_form',
  errorType: string = 'unknown_error'
) {
  // STRICT PRIVACY: NEVER send user inputs, email, name, or message content!
  trackEvent('contact_form_error', {
    form_name: formName,
    error_type: errorType,
  });
}

/**
 * 9. Scroll Milestones Tracking
 * Custom milestones (25%, 50%, 75%, 90%), guarded per session
 */
export function trackScrollMilestone(milestone: 25 | 50 | 75 | 90) {
  const sessionKey = `scroll_${milestone}`;
  if (isSessionItemLogged(sessionKey)) return;

  markSessionItemLogged(sessionKey);
  trackEvent('scroll_milestone', {
    milestone_percent: milestone,
  });
}
