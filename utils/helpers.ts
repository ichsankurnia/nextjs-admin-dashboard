export function getTitleNav(routes: Array<any>, router: any) {
  var name = "NextJS Material Dashboard";
  routes.map((prop) => {
    if (router.route.indexOf('/dashboard'+prop.url_var) !== -1) {
      name = prop.name_var;
    }
    return null;
  });
  return name;
}

export function setCookie(cookieName: string, cookieValue: string, exdays: number, timestamp: number) {
  const d = new Date();
  // d.setTime(d.getTime() + (exdays*24*60*60*1000));
  // let expires = "expires="+ d.toUTCString();

  d.setTime(timestamp)
  let expires = "expires="+ d.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

export function getCookie(cookieName: string) {
  let name = cookieName + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}