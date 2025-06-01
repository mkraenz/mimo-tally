# MiMos Tally

My app is about being able to create and track disbursements with your clients. What are important terms connected to this in the domain?

GitHub Copilot
In the domain of creating and tracking disbursements with clients, the following terms are important:

1. Disbursement
   A payment or transfer of funds from one party (sender) to another (receiver).
   Can represent bills, refunds, or payments for services/products.
2. Client
   The party with whom the disbursement is associated.
   Could be a customer, vendor, or partner.
3. Settlement
   The process of reconciling or clearing outstanding disbursements.
   Often involves grouping multiple disbursements into a single payment or adjustment.
4. Invoice
   A document or record detailing the amount owed by a client.
   May be linked to disbursements for tracking purposes.
5. Payment
   The act of fulfilling a disbursement or settling an invoice.
   Tracks whether a disbursement has been paid or remains unpaid.
6. Outstanding Balance
   The total amount owed by a client that has not yet been settled.
   Calculated by summing unpaid disbursements.
7. Currency
   The monetary unit in which the disbursement is made (e.g., USD, EUR, JPY).
   Important for multi-currency support.
8. Purpose
   The reason or description for the disbursement (e.g., "Consulting Fee", "Product Refund").
   Helps categorize and track disbursements.
9. Due Date
   The date by which the disbursement must be paid.
   Helps in tracking overdue payments.
10. Status
    Tracks the state of the disbursement (e.g., pending, paid, overdue).
    Useful for monitoring and reporting.
11. Audit Trail
    A record of all actions taken on a disbursement (e.g., creation, updates, payments).
    Ensures accountability and transparency.
12. Sender and Receiver
    Sender: The party initiating the disbursement (e.g., your business).
    Receiver: The party receiving the funds (e.g., the client).
13. Reconciliation
    The process of matching disbursements with payments to ensure all transactions are accounted for.
14. Disbursement ID
    A unique identifier for each disbursement.
    Used for tracking and referencing specific disbursements.
15. Batch Processing
    The ability to process multiple disbursements at once (e.g., bulk payments or settlements).
    These terms form the foundation of a system designed to manage and track disbursements effectively.

## BLABLA

database
offline available and usable
sync once online

IndexedDB
when online sync to ???

Postgres + NextJS

Offline features:

- add a bill
- settle tally

SQL Schema

```ts
type BaseEntity = {
  id: string;
  createdAt: Date;
};

type Invoice = BaseEntity & {
  amount: number; // always a positive number
  currency: string; // EUR or JPY
  purpose: string;

  /** the date on which this invoice was paid, or null if it is still pending */
  settledAt: Date | null;

  /** the person who sent the invoice and requests to be paid */
  senderId: ClerkUserId;
  /** the person supposed to pay the invoice */
  responsiblePartyId: ClerkUserId;
};
type Settlement = BaseEntity & {
  amount: number;
  currency: string;
  /** the person paying */
  responsiblePartyId: ClerkUserId;
  /** the person receiving payment */
  recipientId: ClerkUserId;
  /** list of invoices that are being settled by this payment */
  settledInvoiceIds: InvoiceId[];
};
```

ClerkUserId
Sender
Receiver
Bill
Settlement

- get all unpaid bills
- get all bills created after some point in time (limit 100) ordered by createdAt newest-first
- delete a bill
- (get historic bills)
- create a bill
- create a settlement + update referenced bills

- connect to another user -> search for the user by email in Clerk, then create
