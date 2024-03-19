import PersonDetails from "@/components/PersonDetails";
import { Person } from "@/types";
import { GetServerSideProps, NextPage } from "next";

type Props = {
  person: Person;
  seed: string;
  page: number;
};

const PeopleDetailsPage: NextPage<Props> = ({ person }: Props) => {
  return <PersonDetails person={person} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;
  const { seed, page } = context.query;
  const res = await fetch(`http://localhost:3000/api/people/${page}/${seed}`);
  const data = await res.json();
  const person = data.results.find((person: Person) => person.email === id);
  return {
    props: {
      person: person || null,
      page: Number(page),
      seed: seed,
    },
  };
};

export default PeopleDetailsPage;
