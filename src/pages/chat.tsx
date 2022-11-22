import { withAuthenticator } from "@aws-amplify/ui-react";
import { API, graphqlOperation, withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { ListMessagesQuery, Message } from "../API";
import { createMessage } from "../graphql/mutations";
import { listMessages } from "../graphql/queries";
import { onCreateMessage } from "../graphql/subscriptions";

const Chat = ({
  signOut,
  user,
  messages,
}: {
  signOut: any;
  user: any;
  messages: Message[];
}) => {
  const [messageText, setMessageText] = useState("");
  const [displayedMessages, setDisplayedMessages] = useState([...messages]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log(messageText, user.attributes.email);

    setMessageText("");

    await API.graphql({
      authMode: "AMAZON_COGNITO_USER_POOLS",
      query: createMessage,
      variables: {
        input: {
          body: messageText,
          owner: user.attributes.email,
        },
      },
    });
  };

  useEffect(() => {
    const subscription = (
      API.graphql({
        query: onCreateMessage,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      }) as any
    ).subscribe({
      next: ({ provider, value }: { provider: any; value: any }) => {
        console.log(provider, value);

        setDisplayedMessages((displayedMessages) => [
          ...displayedMessages,
          value.data.onCreateMessage,
        ]);
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <p>Current user: {user.attributes.email}</p>
      <button onClick={signOut}>Sign Out</button>
      {displayedMessages
        .sort((b, a) => b.createdAt.localeCompare(a.createdAt))
        .map((message) => (
          <p key={message.id}>
            {message.owner}: {message.body}
          </p>
        ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="message"
          name="message"
          autoFocus
          required
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type something..."
        />
      </form>
    </div>
  );
};

export default withAuthenticator(Chat);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const SSR = withSSRContext({ req });

  const response = (await SSR.API.graphql({
    query: listMessages,
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })) as {
    data: ListMessagesQuery;
  };

  return {
    props: {
      messages: response.data.listMessages?.items,
    },
  };
};
