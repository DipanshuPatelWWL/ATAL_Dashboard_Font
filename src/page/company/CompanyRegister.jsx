import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function CompanyRegistrationForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      providerRelations: [{ name: "", phone: "", email: "" }],
      claimSubmissionMethods: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "providerRelations",
  });

  const onSubmit = async (data) => {
    try {
      // Prepare FormData for file uploads
      const formData = new FormData();
      formData.append("companyName", data.companyName);
      formData.append("legalEntity", data.legalEntity);
      formData.append("networkPayerId", data.networkPayerId || "");
      formData.append("claimSubmissionMethods", JSON.stringify(data.claimSubmissionMethods || []));
      formData.append("eftRemittance", data.eftRemittance || "");
      formData.append("serviceStandards", data.serviceStandards || "");
      formData.append("agreementAccepted", data.agreementAccepted ? "true" : "false");

      // provider relations (array)
      formData.append("providerRelations", JSON.stringify(data.providerRelations || []));

      // Add file inputs (multiple optional files)
      const docFields = [
        { key: "agreementFile", file: data.agreementFile?.[0] },
        { key: "licenseProof", file: data.licenseProof?.[0] },
        { key: "voidCheque", file: data.voidCheque?.[0] },
      ];
      docFields.forEach((f) => {
        if (f.file) formData.append(f.key, f.file);
      });

      // Example POST - replace URL with your API endpoint
      const res = await fetch("/api/insurance/register", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Server error while submitting form");

      alert("Insurance company registered successfully!");
      reset();
    } catch (err) {
      console.error(err);
      alert("Failed to submit form: " + err.message);
    }
  };

  return (
    <div className="mx-10 p-6">
      <h1 className="text-2xl font-bold mb-4">Insurance Company Registration</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Insurance company name</label>
            <input
              {...register("companyName", { required: "Company name is required" })}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="ACME Insurance Ltd."
            />
            {errors.companyName && (
              <p className="text-red-600 mt-1">{errors.companyName.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Legal entity</label>
            <input
              {...register("legalEntity", { required: "Legal entity is required" })}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="ACME Holdings Pvt. Ltd."
            />
            {errors.legalEntity && (
              <p className="text-red-600 mt-1">{errors.legalEntity.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Network / Payer ID or EDI details</label>
            <input
              {...register("networkPayerId")}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="e.g. 123456789 or EDI: X12-837"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">EFT / Remittance details</label>
            <input
              {...register("eftRemittance")}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="Bank name, account number, routing"
            />
          </div>
        </section>

        <section className="border rounded-lg p-4">
          <h2 className="font-medium mb-3">Provider relations & technical support contacts</h2>

          <div className="space-y-3">
            {fields.map((field, idx) => (
              <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                <div>
                  <label className="block ">Contact name</label>
                  <input
                    {...register(`providerRelations.${idx}.name`, { required: true })}
                    className="w-full rounded-lg border px-2 py-1"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label className="block ">Phone</label>
                  <input
                    {...register(`providerRelations.${idx}.phone`, { required: true })}
                    className="w-full rounded-lg border px-2 py-1"
                    placeholder="+1 555 555 5555"
                  />
                </div>

                <div>
                  <label className="block ">Email</label>
                  <input
                    {...register(`providerRelations.${idx}.email`, {
                      required: "Email is required",
                      pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
                    })}
                    className="w-full rounded-lg border px-2 py-1"
                    placeholder="support@acme.com"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => remove(idx)}
                    className="rounded-md px-3 py-1 bg-red-100 text-red-700 "
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div>
              <button
                type="button"
                onClick={() => append({ name: "", phone: "", email: "" })}
                className="rounded-md px-3 py-2 bg-sky-600 text-white "
              >
                + Add contact
              </button>
            </div>
          </div>
        </section>

        <section className="border rounded-lg p-4">
          <h2 className="font-medium mb-3">Claim submission method</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" value="EDI" {...register("claimSubmissionMethods")} />
              <span>EDI</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" value="Portal" {...register("claimSubmissionMethods")} />
              <span>Portal</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" value="Email" {...register("claimSubmissionMethods")} />
              <span>Email</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" value="Fax" {...register("claimSubmissionMethods")} />
              <span>Fax</span>
            </label>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4">
          <div>
            <label className="block font-medium mb-1">Required provider documents</label>
            <p className="text-gray-600 mb-2">Upload any required documents: agreement, proof of licensure, void cheque (optional)</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs mb-1">Signed agreement (PDF)</label>
                <input type="file" accept="application/pdf" {...register("agreementFile")} />
              </div>

              <div>
                <label className="block text-xs mb-1">Proof of licensure (image/PDF)</label>
                <input type="file" accept="image/*,application/pdf" {...register("licenseProof")} />
              </div>

              <div>
                <label className="block text-xs mb-1">Void cheque (image/PDF)</label>
                <input type="file" accept="image/*,application/pdf" {...register("voidCheque")} />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Service standards / turnaround times (optional)</label>
            <textarea
              {...register("serviceStandards")}
              rows={4}
              className="w-full rounded-lg border px-3 py-2"
              placeholder="e.g. Claims acknowledged within 24 hours, adjudication within 7 business days"
            />
          </div>
        </section>

        <section className="flex items-start gap-3">
          <input type="checkbox" {...register("agreementAccepted", { required: true })} />
          <div>
            <label className="font-medium">I accept the terms of the agreement</label>
            {errors.agreementAccepted && (
              <p className="text-red-600">You must accept the agreement to register.</p>
            )}
          </div>
        </section>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-emerald-600 text-white px-4 py-2 hover:bg-emerald-500 disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Register insurance company"}
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="rounded-md border px-4 py-2"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
