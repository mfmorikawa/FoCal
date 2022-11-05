import { useAuth0 } from "@auth0/auth0-react";

const Focus = () => {
  const { user } = useAuth0();

  return (
    <div>
      Focus Page Coming Soon!
    </div>
  );
};

export default Focus;