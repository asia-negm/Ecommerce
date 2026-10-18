import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID, Service } from '@angular/core';

@Service()
export class Flowbite {
  constructor() {}
  private platFromID = inject(PLATFORM_ID)
  loadFlowbite(callback: (flowbite: any) => void) {
    if (isPlatformBrowser(this.platFromID)) {
      import('flowbite').then(flowbite => {
        callback(flowbite);
      });
}
  }
}
