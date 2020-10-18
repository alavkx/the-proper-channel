export type ApprovalStatus =
  | "unacknowledged"
  | "pending"
  | "approved"
  | "denied";
export type Technology = {
  name: string;
  repo: string;
  language: string;
  createdAt: string;
  updatedAt: string;
  approvalStatus: ApprovalStatus;
};

export type Api = {
  [`/technology`]: Technology[];
};

export function api<A extends keyof Api>(
  path: A,
  config?: RequestInit,
): Promise<Api[A]> {
  return fetch(
    `${process.env.SNOWPACK_PUBLIC_API}${path}`,
    config,
  ).then((res) => res.json());
}
