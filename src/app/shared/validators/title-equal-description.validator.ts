import { FormGroup } from '@angular/forms';

export function ValidateTitleEqualDesc(group: FormGroup) {
  if (group) {
    if (group.get('title').value == group.get('description').value) {
      return { equal: true };
    }
  }
  return null;
}
