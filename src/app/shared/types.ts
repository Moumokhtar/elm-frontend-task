export type TagSeverity =
  | 'success'
  | 'info'
  | 'warn'
  | 'danger'
  | 'secondary'
  | 'neutral'
  | 'contrast';

export interface TagItem {
  label: string;
  severity?: TagSeverity;
}

export interface BreadcrumbItem {
  label: string;
  /** Present for every segment except the last (current page). */
  route?: string | readonly (string | number)[];
}
