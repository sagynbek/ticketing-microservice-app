import axios from 'axios';

export default ({ req }) => {
  if (typeof window === "undefined") {
    // We in server
    // http://NAMESPACE.SERVICE.svc.cluster.local

    return axios.create({
      baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers
    })
  }
  else {
    // we are in browser

    return axios.create({
      baseURL: '/'
    })
  }
}