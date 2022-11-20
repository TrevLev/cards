import { withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import { ListPeopleQuery, Person } from "../API";
import { listPeople } from "../graphql/queries";

const Index = function what({ people = [] }: { people: Person[] }) {
  return (
    <div>
      <h1>Data Fetched From AWS</h1>
      <ul>
        {people.map((person) => {
          return (
            <li key={person.id}>
              My name is {person.name}, and I&apos;m {person.age} years old.
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const SSR = withSSRContext({ req });

  const response = (await SSR.API.graphql({ query: listPeople })) as {
    data: ListPeopleQuery;
  };

  return {
    props: {
      people: response.data.listPeople?.items,
    },
  };
};
