import { type Reference } from "@prisma/client";
import { CardContent, CardHeader } from "~/components/ui/card";

export default function CandidateReferences({
  reference,
}: {
  reference: Reference;
}) {
  console.log(reference);
  return (
    <>
      <CardHeader>
        <div className="flex justify-between">
          <h2 className="text-lg text-violet">References</h2>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full space-y-2">
          <div className="flex w-full items-center justify-between">
            <p className="w-full">Reference Name</p>
            <p className="w-full">{reference?.name}</p>
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="w-full">Relationship to Candidate</p>
            <p className="w-full">{reference?.relationship ?? "N/A"}</p>
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="w-full">Company/Organization</p>
            <p className="w-full">{reference?.company ?? "N/A"}</p>
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="w-full">Contact Information</p>
            <p className="w-full">{reference?.contactInfo ?? "N/A"}</p>
          </div>
        </div>
      </CardContent>
    </>
  );
}
