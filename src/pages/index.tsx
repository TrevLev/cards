export async function getServerSideProps() {
  const res = await fetch(`http://127.0.0.1:8090/api/collections/people/records`)
  const data = await res.json()
  return { props: { people: data?.items } }
}

const Index = ({people}: {people: any}) => {
  return (
    <div>
      <h1>Data Fetched From PocketBase</h1>
      {people?.map((person: any) => (
        <p key={person.id}>
          My name is {person.name}. I am {person.age} years old.
        </p>
      ))}
    </div>
  );
}

export default Index