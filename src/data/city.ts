import { ACTIVE_CITY } from '../../city.config.mjs';
import placeholder from './cities/_placeholder.json';
import atlantaGa from './cities/atlanta-ga.json';

export interface Faq { q: string; a: string }
export interface Step { title: string; text: string }
export interface Scenario { title: string; intro: string; items: string[]; outro: string }
export interface Fee { label: string; detail: string }
export interface City {
  slug: string; name: string; county: string; formName: string;
  title: string; description: string; h1Bottom: string; hero: string;
  localNoteTitle: string; localNote: string; whyHeading: string; why: string[];
  steps: Step[]; faqs: Faq[]; nearby: string[]; blurb: string;
  summaryFees?: Fee[]; summarySteps?: Step[]; scenario?: Scenario;
}
export interface GuidePage { path: string; title: string; description: string; h1: string; faqs: Faq[]; schemaName: string; schemaDescription: string }
export interface LegalPage { path: string; title: string; description: string; h1: string; intro: string; location: string }
export interface Site {
  brand: string; domain: string; niche: string; serviceType: string; serviceDescription: string;
  metroName: string; metroTitle: string; state: string; region: string;
  formName: string; ga4MeasurementId: string; airchattyTrackingId: string;
  footerTagline: string;
  guideLinks: { path: string; label: string }[];
  trustBar: string[]; fees: Fee[];
  ui: {
    howItWorksIntroHome: string; howItWorksIntroCity: string;
    serviceAreasTitle: string; serviceAreasIntro: string;
    legalLocation: string; legalCityName: string;
  };
}
export interface Home {
  formName: string; title: string; description: string; h1Bottom: string; hero: string;
  localNoteTitle: string; localNote: string; whyHeading: string; why: string[];
  steps: Step[]; faqs: Faq[];
}
export interface CityData {
  site: Site; home: Home; cities: City[];
  pages: { howItWorks: GuidePage; vsAssignment: GuidePage; feesPage: GuidePage; privacy: LegalPage; terms: LegalPage };
}

const files: Record<string, CityData> = {
  '_placeholder': placeholder as CityData,
  'atlanta-ga': atlantaGa as CityData,
};
const active = files[ACTIVE_CITY];
if (!active) throw new Error(`Unknown ACTIVE_CITY "${ACTIVE_CITY}" in city.config.mjs`);
export const city: CityData = active;

// Named exports matching the original data modules, so components change one import line.
export const site = city.site;
export const home = city.home;
export const cities = city.cities;
export const brand = site.brand;
export const domain = site.domain;
export const trustBar = site.trustBar;
export const fees = site.fees;
