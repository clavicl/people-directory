export type Person = {
  name: {
    title: string;
    first: string;
    last: string;
  };
  dob: {
    age: number;
    date: string;
  };
  location: {
    street: {
      name: string;
      number: string;
    };
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  email: string;
  phone: string;
  picture: {
    large: string;
  };
  id: {
    name: string;
    value: string;
  }
};

export type Info = {
  seed: string;
  results: number;
  page: number;
}