module.exports = {
  tripeasy: {
    output: {
      mode: "tags-split",
      target: "./endpoints",
      baseUrl: "/api",
      schemas: "./model",
      client: "react-query",
      mock: true,
      clean: true,
      prettier: true,
    },
    input: {
      target: "./swagger.yml",
    },
  },
};
