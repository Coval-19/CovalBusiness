import M, { toast } from "materialize-css";

export const makeToast = (toast) => {
  M.toast({html: toast, classes: 'rounded'})
}

export const makeToastWithGoToButton = (toast, gotoUrl) => {
  const html = `<span>${toast}</span><a href="${gotoUrl}"><button class="btn-flat toast-action">Goto</button></a>`
  makeToast(html)
}
