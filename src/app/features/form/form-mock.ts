import type { BreadcrumbItem } from '@shared/types';

/** Figma Form Page – AR `2036:75327`. */
export const FORM_BREADCRUMBS: BreadcrumbItem[] = [
  { label: 'رابط', route: '/' },
  { label: 'رابط' },
];

export const FORM_TITLE = 'حقول النص';

export const FORM_INTRO =
  'عند استخدام النماذج، فإن حقول النموذج القياسية المستخدمة هي حقول نصية تُستخدم عادةً لإدخال نص قصير. حالات حقل النموذج هي الافتراضي، النشط، المركز، الخطأ، التلميح، والمعطل.';

export const FORM_REQUIRED_NOTICE = '* المعلومات المطلوبة';

export type FormStepStatus = 'completed' | 'active' | 'upcoming';

export const FORM_STEP_DEFS = [
  { id: 1 as const, title: 'الخطوة الأولى', description: 'وصف الخطوة' },
  { id: 2 as const, title: 'الخطوة الثانية', description: 'وصف الخطوة' },
  { id: 3 as const, title: 'الخطوة الثالثة', description: 'وصف الخطوة' },
] as const;

/** Index of the step that shows the text-field showcase (0-based). */
export const FORM_FIELDS_STEP_INDEX = 1;
