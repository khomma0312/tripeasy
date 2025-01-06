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
      override: {
        mutator: {
          path: "./mutator/custom-instance.ts",
          name: "customInstance",
        },
        query: {
          useSuspenseQuery: true,
          version: 5,
        },
      },
    },
    input: {
      target: "./swagger.yml",
    },
  },
};
