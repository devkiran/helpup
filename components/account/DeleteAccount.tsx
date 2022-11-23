import { Button } from "@mantine/core";

import Panel from "@components/core/Panel";

const DeleteAccount = () => {
  return (
    <Panel
      title="Delete Account"
      description="Permanently remove your account and all of its contents from our platform. This action is not reversible, so please continue with caution."
    >
      <form className="space-y-4">
        <div className="flex justify-end">
          <Button type="submit" color="red">
            Delete Account
          </Button>
        </div>
      </form>
    </Panel>
  );
};

export default DeleteAccount;
