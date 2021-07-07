import React from "react";
import { useQuery, useMutation } from "react-query";
import { api, Technology } from "./api";
import Spinner from "@atlaskit/spinner";
import Button, { LoadingButton } from "@atlaskit/button";
import { useHistory } from "react-router-dom";
import { Dialog } from "./Dialog";
import { fullBleed } from "./Layout";
import { useRouteMatch } from "react-router-dom";

export const TechnologyPage = () => {
  const { data, status } = useQuery(`technology`, () => api(`/technology`));
  const match = useRouteMatch(`/technology/request`);
  const history = useHistory();
  return (
    <>
      {status === `success` ? (
        <Table css={fullBleed as any}>
          {data?.map(({ ...props }) => (
            <Row {...props} />
          ))}
        </Table>
      ) : (
        <Spinner />
      )}
      <Dialog
        isOpen={!!match?.url}
        label="Request a technology"
        heading="Request a technology"
        onDismiss={() => history.push(`/technology`)}
      >
        <TechnologyRequestForm />
      </Dialog>
    </>
  );
};
const Table: React.FC<{ className?: string }> = ({ children, className }) => (
  <table className={className}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Repository</th>
        <th>Status</th>
        <th>Language</th>
      </tr>
    </thead>
    <tbody>
      {React.Children.count(children) === 0 ? (
        <tr>
          <td colSpan={4}>
            <Empty />
          </td>
        </tr>
      ) : (
        children
      )}
    </tbody>
  </table>
);
const Empty: React.FC = () => {
  const history = useHistory();
  return (
    <div
      css={`
        display: flex;
        justify-items: center;
        align-items: center;
        justify-content: center;
        flex-flow: column;
        padding: 96px;
        margin: auto;
        flex-grow: 1;
        height: 50vh;
      `}
    >
      <h2>Nothing here yet.</h2>
      <Button
        appearance="primary"
        onClick={() => history.push(`/technology/request`)}
        css={`
          max-width: 50%;
          margin-top: 24px;
        `}
      >
        Request a technology
      </Button>
    </div>
  );
};
const Row: React.FC<Technology> = ({
  approvalStatus,
  name,
  repo,
  language,
}) => (
  <tr>
    <td>{name}</td>
    <td>{repo}</td>
    <td>{approvalStatus}</td>
    <td>{language}</td>
  </tr>
);
type TechnologyFields = Pick<Technology, "name" | "repo" | "language">;
type Event = {
  type: "CHANGE_NAME" | "CHANGE_REPO" | "CHANGE_LANGUAGE";
  payload: string;
};
const initializer = (): TechnologyFields => ({
  name: "",
  repo: "",
  language: "",
});
const TechnologyRequestForm: React.FC = () => {
  const history = useHistory();
  const [mutate, { status }] = useMutation(
    (fields: TechnologyFields) =>
      api(`/technology`, { method: "POST", body: JSON.stringify(fields) }),
    { onSuccess: () => history.push(`/technology`) },
  );
  const [fields, dispatch] = React.useReducer(
    (state: TechnologyFields, event: Event) => {
      switch (event.type) {
        case "CHANGE_NAME":
          return { ...state, name: event.payload };
        case "CHANGE_REPO":
          return { ...state, repo: event.payload };
        case "CHANGE_LANGUAGE":
          return { ...state, language: event.payload };
      }
    },
    initializer(),
    initializer,
  );
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        mutate(fields);
      }}
      css={`
        display: flex;
        flex-flow: column;
        label {
          display: block;
        }
        input {
          display: block;
        }
      `}
    >
      <label>
        Name
        <input
          required
          onChange={(e) =>
            dispatch({ type: "CHANGE_NAME", payload: e.target.value })
          }
          value={fields.name}
        />
      </label>
      <label>
        Repository URL
        <input
          required
          onChange={(e) =>
            dispatch({ type: "CHANGE_REPO", payload: e.target.value })
          }
          value={fields.repo}
        />
      </label>
      <label>
        Language
        <input
          required
          onChange={(e) =>
            dispatch({ type: "CHANGE_LANGUAGE", payload: e.target.value })
          }
          value={fields.language}
        />
      </label>
      <LoadingButton
        type="submit"
        appearance="primary"
        css={`
          margin-top: 32px;
        `}
        isLoading={status === "loading"}
      >
        Submit
      </LoadingButton>
    </form>
  );
};
