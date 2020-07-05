class Cookies {
  load = (name: string) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    if (match) return match[2];
    else return "";
  };

  save = (name: string, value: string = "", path: string = "/") => {
    document.cookie = `${name}=${value}; ;path=${path}`;
  };

  delete = (name: string) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };
}

export default new Cookies();
