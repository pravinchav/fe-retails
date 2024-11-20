export const environment = {
    production: false,
    apiUrl: 'http://localhost:3000',
    deleteButtonHtml: `
      <button mat-icon-button color="warn" class="mdc-icon-button mat-mdc-icon-button mat-warn mat-mdc-button-base">
        <span class="mat-mdc-button-persistent-ripple mdc-icon-button__ripple"></span>
        <mat-icon role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">delete</mat-icon>
        <span class="mat-mdc-focus-indicator"></span>
        <span class="mat-mdc-button-touch-target"></span>
        <span class="mat-ripple mat-mdc-button-ripple"></span>
      </button>
    `
  };