import { PageClient } from "./page-client";

type Props = {
  searchParams: Promise<{
    page: string | undefined;
    perPage: string | undefined;
  }>;
};

const Accommodations = async ({ searchParams }: Props) => {
  const { page: strPage, perPage: strPerPage } = await searchParams;
  const page = Number(strPage) ?? 1;
  const perPage = strPerPage ? Number(strPerPage) : undefined;
  return <PageClient currentPage={page} perPage={perPage} />;
};

export default Accommodations;
