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