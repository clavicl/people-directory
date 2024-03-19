import { Person } from "@/types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/router";

export default function PersonDetails({ person }: PersonDetailsProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (person === null) return null;

  return (
    <Card className="mt-6 w-96 pt-5 m-auto mt-10">
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
        <Typography>
          Address:{" "}
          {`${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state}, ${person.location.postcode}, ${person.location.country}`}
        </Typography>
        <Typography>Email: {person.email}</Typography>
        <Typography>
          DOB: {new Date(person.dob.date).toLocaleDateString()}
        </Typography>
        <Typography>Phone: {person.phone}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={() => {
            router.back();
          }}
        >
          Go Back
        </Button>
      </CardFooter>
    </Card>
  );
}

type PersonDetailsProps = {
  person: Person;
};
