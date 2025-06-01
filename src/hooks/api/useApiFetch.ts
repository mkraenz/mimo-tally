import { useAuth } from "@clerk/nextjs";
import { useCallback } from "react";
import mimoEnv from "@/app/lib/environmentClient";

export const useApiFetch = <TResponseData>(url: string) => {
  const { getToken } = useAuth();
  return useCallback(
    async (config?: RequestInit) => {
      const jwt = await getToken();
      const res = await fetch(
        `${mimoEnv.NEXT_PUBLIC_MIMO_API_BASE_URL}${url}`,
        {
          ...config,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
            ...config?.headers,
          },
        },
      );
      return (await res.json()) as TResponseData;
    },
    [getToken, url],
  );
};

export const useApiFetchUserMe = () =>
  useApiFetch<{ id: string }>("/api/v1/users/me");

type Money = {
  amount: number;
  currency: "EUR" | "JPY";
};
type ApiDisbursement = {
  id: string;
  created_at: string;
  paying_party_id: string;
  on_behalf_of_party_id: string;
  comment: string;
  amount_paid: Money;
};
type ApiDisbursements = {
  data: ApiDisbursement[];
  total: number;
};
export const useApiFetchDisbursementsWithUser = (otherUserId: string) =>
  useApiFetch<ApiDisbursements>(`/api/v1/disbursements/users/${otherUserId}`);

interface ApiSettlement {
  id: string;
  owner_id: string;
  receiving_party_id: string;
  sending_party_id: string;
  amount_paid: number;
  currency: string;
  settled_at: string;
  created_at: string;
  updated_at: string;
}
export const useApiFetchCreateSettlement = () =>
  useApiFetch<ApiSettlement>("/api/v1/settlements/");
export const useApiFetchCreateDisbursement = () =>
  useApiFetch<ApiDisbursement>("/api/v1/disbursements/");
