import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Button } from 'primeng/button';

import { Breadcrumb } from '@shared/breadcrumb/breadcrumb';
import { FeedbackBlock } from '@shared/feedback-block/feedback-block';

import {
  FORM_BREADCRUMBS,
  FORM_FIELDS_STEP_INDEX,
  FORM_INTRO,
  FORM_REQUIRED_NOTICE,
  FORM_STEP_DEFS,
  FORM_TITLE,
  type FormStepStatus,
} from './form-mock';

@Component({
  selector: 'app-form-page',
  imports: [Breadcrumb, Button, FeedbackBlock, ReactiveFormsModule],
  templateUrl: './form-page.html',
  styleUrl: './form-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'form-page d-block w-100',
    '[attr.dir]': '"rtl"',
    '[attr.lang]': '"ar"',
  },
})
export class FormPage {
  private readonly fb = inject(FormBuilder);

  readonly breadcrumbs = FORM_BREADCRUMBS;
  readonly title = FORM_TITLE;
  readonly intro = FORM_INTRO;
  readonly requiredNotice = FORM_REQUIRED_NOTICE;
  readonly fieldsStepIndex = FORM_FIELDS_STEP_INDEX;
  readonly lastStepIndex = FORM_STEP_DEFS.length - 1;

  /** 0-based index into `FORM_STEP_DEFS`; drives stepper + main panel. */
  readonly activeStepIndex = signal(FORM_FIELDS_STEP_INDEX);

  readonly steps = computed(() => {
    const i = this.activeStepIndex();
    return FORM_STEP_DEFS.map((s, idx) => {
      let status: FormStepStatus;
      if (idx < i) {
        status = 'completed';
      } else if (idx === i) {
        status = 'active';
      } else {
        status = 'upcoming';
      }
      return { ...s, status };
    });
  });

  /** Set true after user clicks **التالي** on the fields step — drives required-field error UI. */
  readonly showValidation = signal(false);

  readonly form = this.fb.nonNullable.group({
    optPlain: [''],
    reqPlain: ['', Validators.required],
    optSearch: [''],
    reqSearch: ['', Validators.required],
    optPrefix: [''],
    reqPrefix: ['', Validators.required],
    optSuffix: [''],
    reqSuffix: ['', Validators.required],
    optHelper: [''],
    reqHelper: ['', Validators.required],
  });

  readonly mobileProgressLabel = computed(() => {
    const i = this.activeStepIndex();
    const s = FORM_STEP_DEFS[i]!;
    return `${s.title} — ${s.description} — ${i + 1} من ${FORM_STEP_DEFS.length}`;
  });

  fieldInvalid(name: string): boolean {
    const c = this.form.get(name);
    return !!c && c.invalid && (c.touched || this.showValidation());
  }

  onNext(): void {
    const i = this.activeStepIndex();
    if (i >= FORM_STEP_DEFS.length - 1) {
      return;
    }
    if (i === FORM_FIELDS_STEP_INDEX) {
      this.showValidation.set(true);
      this.form.markAllAsTouched();
      if (this.form.invalid) {
        return;
      }
    }
    this.activeStepIndex.set(i + 1);
    this.showValidation.set(false);
  }

  onBack(): void {
    const i = this.activeStepIndex();
    if (i <= 0) {
      return;
    }
    this.activeStepIndex.set(i - 1);
    this.showValidation.set(false);
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
