import * as React from "react";

export const Nav: React.FC = ({ children }) => (
  <nav>
    <ul
      css={`
        margin: 0;
        list-style-type: none;
        display: flex;
        flex-flow: row;
        align-content: center;
        justify-content: flex-end;
        padding: 8px;
        font-size: 1.125rem;
        background-color: rgb(250, 250, 250);
        li {
          margin-left: 8px;
          margin-top: 0;
        }
        a.active {
          color: green;
        }
      `}
    >
      {React.Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  </nav>
);
