async function getPeople() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/people/records",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data?.items as any[];
}

export default async function HomePage() {
  const people = await getPeople();

  return (
    <div>
      <h1>Data Fetched From PocketBase</h1>
      {people?.map((person) => {
        return (
          <p>
            My name is {person.name}. I am {person.age} years old.
          </p>
        );
      })}
    </div>
  );
}
