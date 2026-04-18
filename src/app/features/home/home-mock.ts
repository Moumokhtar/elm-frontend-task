import type { TagItem } from '@shared/types';

/** Figma Home Page – Desktop AR `2036:65608` copy (hero carousel). */
export interface HomeHeroSlide {
  title: string;
  body: string;
  ctaLabel: string;
}

export interface HomeStatItem {
  iconClass: string;
  value: string;
  label: string;
  iconLabel: string;
}

export interface HomeServiceItem {
  title: string;
  description: string;
  tags: TagItem[];
  primaryLabel: string;
  secondaryLabel: string;
}

export interface HomeNewsItem {
  imageSrc: string;
  imageAlt: string;
  title: string;
  body: string;
}

export interface HomePartnerItem {
  logoSrc: string;
  logoAlt: string;
  label: string;
}

export const HOME_HERO_SLIDES: HomeHeroSlide[] = [
  {
    title: 'القسم الرئيسي',
    body: 'هنا يمكنك إضافة وصف مختصر حول الغرض من البوابة متبوعًا بزر الحث على اتخاذ إجراء وصورة أو رسم توضيحي على الجانب الأيسر.',
    ctaLabel: 'إجراء رئيسي',
  },
  {
    title: 'القسم الرئيسي — الشريحة ٢',
    body: 'نص تجريبي للشريحة الثانية يحافظ على طول السطر مقارنةً بالتصميم.',
    ctaLabel: 'إجراء رئيسي',
  },
  {
    title: 'القسم الرئيسي — الشريحة ٣',
    body: 'نص تجريبي للشريحة الثالثة لاختبار مؤشرات التنقل والتنقل بلوحة المفاتيح.',
    ctaLabel: 'إجراء رئيسي',
  },
  {
    title: 'القسم الرئيسي — الشريحة ٤',
    body: 'نص تجريبي للشريحة الرابعة لإكمال مجموعة الشرائح الأربع في Figma.',
    ctaLabel: 'إجراء رئيسي',
  },
];

export const HOME_ABOUT_SUBTITLE =
  'هنا يمكنك إضافة وصف مختصر حول الغرض من البوابة متبوعًا بزر الحث على اتخاذ إجراء وصورة أو رسم توضيحي على الجانب الأيسر.';

/** Figma `2036:65718` — Services section. */
export const HOME_SERVICES_SUBTITLE = HOME_ABOUT_SUBTITLE;

/** Figma `2036:65726` — News section. */
export const HOME_NEWS_SUBTITLE = 'هنا يمكنك إضافة وصف مختصر حول الغرض من البوابة.';

/** Figma `2036:65643` — RTL visual order: inline-end card first (droplet … people). */
export const HOME_STATS: HomeStatItem[] = [
  {
    iconClass: 'bi-droplet',
    value: '1.5M',
    label: 'شخص',
    iconLabel: 'أيقونة قطرة ماء',
  },
  {
    iconClass: 'bi-star',
    value: '1.5M',
    label: 'شخص',
    iconLabel: 'أيقونة نجمة',
  },
  {
    iconClass: 'bi-plus-lg',
    value: '1.5M',
    label: 'شخص',
    iconLabel: 'أيقونة إضافة',
  },
  {
    iconClass: 'bi-people-fill',
    value: '1.5M',
    label: 'شخص',
    iconLabel: 'أيقونة مجموعة مستخدمين',
  },
];

const serviceTags: TagItem[] = [
  { label: 'وسم', severity: 'success' },
  { label: 'وسم', severity: 'info' },
  { label: 'وسم', severity: 'neutral' },
];

export const HOME_SERVICES: HomeServiceItem[] = [
  {
    title: 'عنوان البطاقة',
    description: 'نص إضافي لمحتوى البطاقة',
    tags: serviceTags,
    primaryLabel: 'اجراء',
    secondaryLabel: 'اجراء ثانوي',
  },
  {
    title: 'عنوان البطاقة — ٢',
    description: 'نص إضافي لمحتوى البطاقة',
    tags: serviceTags,
    primaryLabel: 'اجراء',
    secondaryLabel: 'اجراء ثانوي',
  },
  {
    title: 'عنوان البطاقة — ٣',
    description: 'نص إضافي لمحتوى البطاقة',
    tags: serviceTags,
    primaryLabel: 'اجراء',
    secondaryLabel: 'اجراء ثانوي',
  },
  {
    title: 'عنوان البطاقة — ٤',
    description: 'نص إضافي لمحتوى البطاقة',
    tags: serviceTags,
    primaryLabel: 'اجراء',
    secondaryLabel: 'اجراء ثانوي',
  },
  {
    title: 'عنوان البطاقة — ٥',
    description: 'نص إضافي لمحتوى البطاقة',
    tags: serviceTags,
    primaryLabel: 'اجراء',
    secondaryLabel: 'اجراء ثانوي',
  },
  {
    title: 'عنوان البطاقة — ٦',
    description: 'نص إضافي لمحتوى البطاقة',
    tags: serviceTags,
    primaryLabel: 'اجراء',
    secondaryLabel: 'اجراء ثانوي',
  },
];

const newsBody =
  'هنا يمكنك تضمين وصف موجز للعنوان في أربعة أسطر. هنا يمكنك تضمين وصف موجز للعنوان في أربعة أسطر.';

export const HOME_NEWS: HomeNewsItem[] = [
  {
    imageSrc: 'images/news-card-placeholder.jpg',
    imageAlt: 'صورة الغلاف للخبر',
    title: 'عنوان بطاقة الأخبار في سطرين',
    body: newsBody,
  },
  {
    imageSrc: 'images/news-card-placeholder.jpg',
    imageAlt: 'صورة الغلاف للخبر الثاني',
    title: 'عنوان بطاقة الأخبار في سطرين',
    body: newsBody,
  },
  {
    imageSrc: 'images/news-card-placeholder.jpg',
    imageAlt: 'صورة الغلاف للخبر الثالث',
    title: 'عنوان بطاقة الأخبار في سطرين',
    body: newsBody,
  },
  {
    imageSrc: 'images/news-card-placeholder.jpg',
    imageAlt: 'صورة الغلاف للخبر الرابع',
    title: 'عنوان بطاقة الأخبار في سطرين',
    body: newsBody,
  },
  {
    imageSrc: 'images/news-card-placeholder.jpg',
    imageAlt: 'صورة الغلاف للخبر الخامس',
    title: 'عنوان بطاقة الأخبار في سطرين',
    body: newsBody,
  },
];

export const HOME_PARTNERS: HomePartnerItem[] = Array.from({ length: 9 }, (_, i) => ({
  logoSrc: 'images/logo-desktop.svg',
  logoAlt: `شعار الشريك ${i + 1}`,
  label: 'شعار المنصة',
}));
