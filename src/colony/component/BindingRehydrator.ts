import { IBinding } from '../interface/IBinding';

export class BindingRehydrator {
  update(bindingGroups: IBinding[][]) {
    for (const bindingGroup of bindingGroups) {
      for (const binding of bindingGroup) {
        if (binding) {
          binding.rehydrate();
        }
      }
    }
  }
}
