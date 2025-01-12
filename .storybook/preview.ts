import { useMemo } from "react";
import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import {
  getRouter,
  ReadonlyURLSearchParams,
  useSearchParams,
} from "@storybook/nextjs/navigation.mock";
import mockRouter from "next-router-mock";
import { handlers } from "../mocks/api/handlers";
import "../styles/globals.css";

initialize({ onUnhandledRequest: "warn" });

const preview: Preview = {
  parameters: {
    msw: { handlers },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  loaders: [mswLoader],
  beforeEach: () => {
    getRouter().push.mockImplementation(
      (...args: Parameters<typeof mockRouter.push>) => mockRouter.push(...args)
    );
    getRouter().replace.mockImplementation(
      (...args: Parameters<typeof mockRouter.replace>) =>
        mockRouter.replace(...args)
    );
    useSearchParams.mockImplementation(() => {
      const searchParams = useMemo(
        () =>
          new ReadonlyURLSearchParams(
            new URLSearchParams(mockRouter.query as Record<string, string>)
          ),
        [mockRouter.query]
      );
      return searchParams;
    });
  },
};

export default preview;
