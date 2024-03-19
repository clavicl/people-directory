// pages/index.tsx
import type { GetServerSideProps, NextPage } from "next";
import { PersonCard } from "../components/PersonCard";
import { Info, Person } from "../types";
import { PaginationControls } from "@/components/PaginationControls";
import { useRouter } from "next/router";

type Props = {
  people: Person[];
  info: Info;
  page: number;
};

const HomePage: NextPage<Props> = ({ people, info, page }) => {
  const router = useRouter();

  const onPaginationClick = (active: number) => {
    router.push(`/?page=${active}&seed=${info.seed}`);
  };

  return (
    <div className="bg-gray-100 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-2">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet the random team
          </h1>
        </div>
        <PaginationControls page={page} onClick={onPaginationClick} />
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {people.map((person) => (
            <li key={person.email}>
              <PersonCard person={person} info={info} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  let { page, seed } = context.query;
  if (seed === undefined) seed = '';

  const res = await fetch(`http://localhost:3000/api/people/${page}/${seed}`);
  const data = await res.json();

  return {
    props: {
      people: data.results || [],
      info: data.info || {},
      page: Number(page) || 1,
      seed: seed || "",
    },
  };
};

export default HomePage;
