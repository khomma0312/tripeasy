import { ErrorInfo, ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorDisplay } from "../error-display";

type Props = {
  children: ReactNode;
  onReset?: (...args: unknown[]) => void;
};

export const HandleError = ({ children, onReset }: Props) => {
  const onError = (error: Error, info: ErrorInfo) => {
    console.log("error.message", error.message);
    console.log("info.componentStack", info.componentStack);
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorDisplay}
      onError={onError}
      onReset={onReset}
    >
      {children}
    </ErrorBoundary>
  );
};
