import type { BreadcrumbItem, TagItem } from '@shared/types';

import { HOME_SERVICES, type HomeServiceItem } from '@features/home/home-mock';

/** Figma Service Page – AR `2036:31010`. */
export const SERVICE_DETAIL_BREADCRUMBS: BreadcrumbItem[] = [
  { label: 'رابط', route: '/' },
  { label: 'رابط' },
];

export const SERVICE_DETAIL_TITLE = 'رخصة بناء';

/** Order matches Figma `2036:31093` visual (RTL row, first item at inline-start / right). */
export const SERVICE_DETAIL_TAGS: TagItem[] = [
  { label: 'الجهة', severity: 'info' },
  { label: 'رحلة الحياة', severity: 'success' },
  { label: 'المنصة', severity: 'neutral' },
];

export const SERVICE_DETAIL_DESCRIPTION =
  'مثال على وصف الخدمة لشراء قطعة أرض لبناء منزلك، يتطلب ذلك توثيق عملية البيع والشراء في مكاتب التوثيق أو خدمات كاتب العدل لتسجيل العقار باسمك.';

export const SERVICE_DETAIL_SECTION_SUBTITLE = SERVICE_DETAIL_DESCRIPTION;

export const SERVICE_DETAIL_SLA_LABEL = 'اتفاقية مستوى الخدمة';

export const SERVICE_DETAIL_STEPS: string[] = [
  'قم بالدخول إلى البوابة الوطنية للتسجيل الموحد عبر منصة بلدي.',
  'اختيار خدمات تراخيص البناء، ثم إصدار البناء.',
  'خدمات الترخيص ثم البلدية المطلوبة.',
  'اختيار المكتب الهندسي، ثم إدخال رقم وسنة إصدار مسح البناء، وإرفاق نسخة من السند.',
  'تقديم الطلب إلى المكتب الهندسي المحدد، ثم استكمال المعلومات والمرفقات في المكتب الهندسي وإرسالها إلى البلدية.',
  'التأكد من بيانات الطلب والمرفقات والموافقات من قبل البلدية.',
  'الموافقة على الطلب وإصدار دفعة سداد. دفع الرسوم وطباعة الرخصة.',
];

export const SERVICE_DETAIL_TERMS =
  'هذا نص تجريبي لشروط الاستخدام. يمكن استبداله بنص قانوني فعلي عند ربط النظام بمصدر المحتوى.';

export const SERVICE_DETAIL_DOCUMENTS =
  'قائمة بالمستندات المطلوبة للخدمة: هوية وطنية، صك الملكية، مخطط الأرض، وغيرها حسب تعليمات الجهة.';

export const SERVICE_DETAIL_FAQ =
  'إجابات مختصرة عن أكثر الأسئلة شيوعاً حول هذه الخدمة. يمكن استبدال هذا النص بمحتوى حقيقي من بوابة الأسئلة الشائعة.';

export const SERVICE_SIDEBAR = {
  audienceLabel: 'الفئة المستهدفة',
  audienceValue: 'المواطنين وجنسيات دول مجلس التعاون الخليجي والمستثمرين والأجانب',
  durationLabel: 'مدة الخدمة',
  durationValue: '5.0 أيام',
  channelsLabel: 'قنوات الخدمة',
  channelsValue: 'تطبيق الويب والجوال',
  costLabel: 'تكلفة الخدمة',
  costValue: 'مجانًا',
  paymentsHeading: 'قنوات الدفع',
  faqHeading: 'الاسئلة الشائعة',
  faqLinkLabel: "Ministry-FAQ's-page",
  phoneLabel: 'الهاتف',
  phoneValue: '9200343222',
  emailLabel: 'البريد الالكتروني',
  emailValue: 'help@company.sa',
  userGuideLabel: 'تحميل دليل المستخدم',
  appsHeading: 'تطبيقات الجوال',
  /** LTR microcopy beside raster logos (`store/`). */
  storeGoogleLine1: 'GET IT ON',
  storeGoogleLine2: 'Google Play',
  storeAppleLine1: 'Download on the',
  storeAppleLine2: 'App Store',
};

/** User-provided PNG marks only — labels rendered as text in the template. */
export const SERVICE_STORE_ICONS = {
  googlePlay: 'images/service-detail/store/google-play-icon.png',
  apple: 'images/service-detail/store/apple-icon.png',
};

/** Figma `2036:31057` — exports are SVG saved with `.png`; use `.svg` copies so `<img>` renders reliably. */
export const SERVICE_PAYMENT_IMAGES = {
  stcPay: 'images/service-detail/sidebar/payment-stcpay.svg',
  mada: 'images/service-detail/sidebar/payment-mada.svg',
};

/** Same six cards as home `HOME_SERVICES` so desktop `numVisible: 3` can scroll (3 items fits one page and disables nav). */
export const SERVICE_RELATED_SERVICES: HomeServiceItem[] = HOME_SERVICES.map((item) => ({
  ...item,
  tags: item.tags.map((t) => ({ ...t })),
}));
