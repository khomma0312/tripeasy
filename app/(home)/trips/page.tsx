import { PageClient } from "./page-client";
import { paginationDefaultLimit } from "@/consts/common";

type Props = {
  searchParams: Promise<{
    page: string | undefined;
    perPage: string | undefined;
  }>;
};

const Trips = async ({ searchParams }: Props) => {
  const { page: strPage, perPage: strPerPage } = await searchParams;
  const page = strPage ? Number(strPage) : 1;
  const perPage = strPerPage ? Number(strPerPage) : paginationDefaultLimit;
  return <PageClient currentPage={page} perPage={perPage} />;
};

export default Trips;
