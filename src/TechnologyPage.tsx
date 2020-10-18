import React from "react";
import { useQuery } from "react-query";
import { api, Technology } from "./api";
import Spinner from "@atlaskit/spinner";
import Button from "@atlaskit/button";
import { useHistory } from "react-router-dom";

export const TechnologyPage = () => {
  const { data, status } = useQuery(`technology`, () => api(`/technology`));
  return status === `success` ? (
    <Table>
      {data?.map((props) => (
        <Row {...props} />
      ))}
    </Table>
  ) : (
    <Spinner />
  );
};
const Table: React.FC = ({ children }) => (
  <table>
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
    <section
      css={`
        height: 100%;
        max-height: 480px;
        width: 100%;
        max-width: 480px;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-flow: column;
        padding: 48px;
        background-color: ghostwhite;
      `}
    >
      <h2> Nothing here yet.</h2>
      <Button
        appearance="primary"
        onClick={() => history.push("/technology/request")}
        css={`
          max-width: 50% !important;
          margin-top: 24px;
        `}
      >
        Request a technology
      </Button>
    </section>
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
