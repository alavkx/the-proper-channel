import React from "react";
import { useQuery, useMutation } from "react-query";
import { api, Technology } from "./api";
import Spinner from "@atlaskit/spinner";
import Button from "@atlaskit/button";
import { useHistory } from "react-router-dom";
import { Dialog } from "./Dialog";
import { fullBleed } from "./Layout";
import { useRouteMatch } from "react-router-dom";
import { Machine, assign } from "xstate";
import { useMachine } from "@xstate/react";

export const TechnologyPage = () => {
  const { data, status } = useQuery(`technology`, () => api(`/technology`));
  const match = useRouteMatch(`/technology/request`);
  const history = useHistory();
  return (
    <>
      {status === `success` ? (
        <Table css={fullBleed as any}>
          {data?.map((props) => (
            <Row {...props} />
          ))}
        </Table>
      ) : (
        <Spinner />
      )}
      <Dialog
        isOpen={!!match?.url}
        label="Request a technology"
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
const TechnologyRequestForm: React.FC = () => {
  const [mutate] = useMutation((data: Technology) =>
    api(`/technology`, { method: "POST", body: JSON.stringify(data) }),
  );
  const [state, send] = useMachine(technologyRequestMachine, {
    services: { submit: mutate },
  });
  return (
    <form>
      <label>
        <input />
      </label>
    </form>
  );
};

const technologyRequestMachine = Machine(
  {
    id: "technologyRequest",
    initial: "pristine",
    context: {
      name: undefined,
      repo: undefined,
      language: undefined,
    },
    states: {
      pristine: {
        on: {
          CHANGE: { target: "dirty", actions: "change" },
        },
      },
      dirty: {
        on: {
          SUBMIT: { target: "submitting" },
        },
      },
      submitting: {
        invoke: {
          src: "submit",
          onDone: "pristine",
        },
      },
    },
  },
  {
    actions: {
      change: assign((context, event) => ({
        [event.payload.name]: event.payload.value,
      })),
    },
  },
);

// const fieldMachine = Machine({
//   id: "field",
//   initial: "pristine",
//   states: {
//     valid: {
//       initial: "pristine",
//       states: {
//         pristine: {
//           on: {
//             CHANGE: { target: "dirty", actions: "change" },
//           },
//         },
//         dirty: {},
//       },
//     },
//     invalid: {
//       initial: "pristine",
//       states: {
//         pristine: {},
//         dirty: {},
//       },
//     },
//   },
// });
// const formMachine = Machine({
//   id: "form",
//   initial: "pristine",
//   states: {
//     pristine: {},
//     dirty: {},
//     busy: {},
//   },
// });
// interface TextField {
//   name: string;
//   defaultValue: string;
// }
// type Field = TextField;
// interface UseFormProps {
//   fields: Record<string, Field>;
// }
// const useForm = ({ fields }: UseFormProps) => {
//   const [state, send, service] = useMachine(formMachine);
//   return [state, send, service];
// };
