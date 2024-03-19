import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/router";
import { Info, Person } from "../types";

type Props = {
  person: Person;
  info: Info;
};

export const PersonCard: React.FC<Props> = ({ person, info }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="mt-6 w-96 pt-5">
      <CardHeader color="blue-gray" className="relative m-auto">
        <img
          className="relative w-56 m-auto"
          src={person.picture.large}
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {`${person.name.first} ${person.name.last}`}
        </Typography>
        <Typography>{`Age: ${person.dob.age}`}</Typography>
        <Typography>{`City: ${person.location.city}`}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={() => {
            router.push(
              `/${person.email}?seed=${info.seed}&page=${info.page}`
            );
          }}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
