import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  generates: {
    "src/lib/commercetools/graphql/__generated__/": {
      schema: "src/lib/commercetools/graphql/schema.json",
      preset: "client",
      plugins: [],
      overwrite: true,
      documents: [
        "src/lib/commercetools/graphql/queries.ts",
        "src/lib/commercetools/graphql/mutations.ts",
        "src/lib/commercetools/graphql/fragments.ts",
      ],
      presetConfig: {
        fragmentMasking: false,
        gqlTagName: "getTypedDocumentNode",
      },
    },
  },
};

export default config;
