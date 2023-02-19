const URL_TODOS = process.env["HTTP_PROXY_TODOS"] || "http://localhost";

const urls = [
  {
    route_name: "todos",
    url: URL_TODOS,
  },
];

export default urls;
