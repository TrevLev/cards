import { Authenticator } from "@aws-amplify/ui-react";

const AuthRequired = () => (
  <Authenticator>
    {({ signOut, user }) => (
      <main>
        <h1 className="text-xl">
          Hello {user?.attributes?.email}! You&apos;re signed in.
        </h1>
        <button
          className="bg-blue-700 text-white p-2 rounded-md font-bold"
          onClick={signOut}
        >
          Sign out
        </button>
      </main>
    )}
  </Authenticator>
);

export default AuthRequired;
