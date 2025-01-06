import { paginationDefaultLimit } from "@/consts/todo-lists";
import { PageClient } from "./page-client";

type Props = {
  searchParams: Promise<{
    page: string | undefined;
    perPage: string | undefined;
  }>;
};

const TodoLists = async ({ searchParams }: Props) => {
  const { page: strPage, perPage: strPerPage } = await searchParams;
  const page = Number(strPage) ?? 1;
  const perPage = Number(strPerPage) ?? paginationDefaultLimit;
  return <PageClient currentPage={page} perPage={perPage} />;
};

export default TodoLists;
