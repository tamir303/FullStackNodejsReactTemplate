export const services = [
    {
      route: "/api",
      target: process.env.BACKEND_SERVICE || "http://localhost:4000",
    },
];