"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

const CreateBillSchema = z.object({
  purpose: z.string().trim().nonempty(),
  amount: z.coerce.number(),
  currency: z.enum(["JPY", "EUR"]),
});
type _CreateBillDto = z.infer<typeof CreateBillSchema>;

export default async function createBill(formData: FormData) {
  const rawFormData = {
    amount: formData.get("amount"),
    currency: formData.get("currency"),
    purpose: formData.get("purpose"),
  };
  const data = CreateBillSchema.parse(rawFormData);
  console.log("Valid request received", data);

  try {
    // await sendEmailToMeAndConfirmationToContact(data);
    console.log("TODO: DO STUFF HERE");
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
  // redirect can't be inside try catch https://nextjs.org/docs/app/building-your-application/routing/redirecting#redirect-function "redirect internally throws an error so it should be called outside of try/catch blocks."
  redirect("/in");
}
