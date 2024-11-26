"use client";

import Image from "next/image";
import Link from "next/link";
import * as RadioGroup from "@radix-ui/react-radio-group";

const JobRoles = () => {
  
  // function saveRole() {
  //   const selectedRole = document.querySelector(
  //     'input[name="role"]:checked',
  //   ) as HTMLInputElement;
  //   if (selectedRole) {
  //     localStorage.setItem("selectedRole", selectedRole.value);
  //     alert("Role saved successfully!");
  //   } else {
  //     alert("Please select a role.");
  //   }
  // }

  return (
    <main>
      <section className="hero">
        <Image
          src="/images/disc-about-page.svg"
          alt="Hero image"
          fill
          style={{ objectFit: "cover" }}
        />
      </section>
      <section className="flex flex-col items-center">
        <h1 className="mb-6 text-4xl font-semibold text-violet">Job roles</h1>
        <p className="w-2/4 text-center">
          Before taking the DISC test, please select the job role family that
          best matches your field of&nbsp;expertise. This will help&nbsp;us
          better match you with potential candidates for job sharing based
          on&nbsp;your professional background.
        </p>
      </section>
      <section className="px-24">
        <form id="role-form">
          <RadioGroup.Root
            className="flex flex-col gap-4"
            defaultValue=""
            aria-label="Job role"
            onValueChange={(value) =>
               // setting the selected role in the localStorage
              localStorage.setItem("selectedRole", value)
            }
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <RadioGroup.Item
                className="RadioGroupItem"
                value="Software Development"
                id="r1"
              >
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label className="ml-3" htmlFor="r1">
                <strong>I. Software Development</strong> (Software Development,
                Software Testing, DevOps, Full Stack Development)
              </label>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <RadioGroup.Item className="RadioGroupItem" value="Data" id="r2">
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label className="ml-3" htmlFor="r2">
                <strong>II. Data</strong> (Data Science, Data Engineering,
                Machine Learning, Artificial Intelligence)
              </label>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <RadioGroup.Item
                className="RadioGroupItem"
                value="Fintech"
                id="r3"
              >
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label className="ml-3" htmlFor="r3">
                <strong>III. Fintech</strong> (Fintech, Blockchain)
              </label>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <RadioGroup.Item
                className="RadioGroupItem"
                value="Design"
                id="r4"
              >
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label className="ml-3" htmlFor="r4">
                <strong>IV. Design</strong> (Design, UI/UX)
              </label>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <RadioGroup.Item
                className="RadioGroupItem"
                value="Sales & Marketing"
                id="r5"
              >
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label className="ml-3" htmlFor="r5">
                <strong>V. Sales & Marketing</strong>
              </label>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <RadioGroup.Item
                className="RadioGroupItem"
                value="Product Management / Product Leadership"
                id="r6"
              >
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label className="ml-3" htmlFor="r6">
                <strong>VI. Product Management / Product Leadership</strong>
              </label>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <RadioGroup.Item
                className="RadioGroupItem"
                value="Scrum Master / Team Coach / Team Lead"
                id="r7"
              >
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label className="ml-3" htmlFor="r7">
                <strong>VII. Scrum Master / Team Coach / Team Lead</strong>
              </label>
            </div>
          </RadioGroup.Root>

          <div className="flex flex-col items-center">
            <p className="py-10">
              Please choose the category that best fits your role, and click
              &laquo;Next&raquo; to&nbsp;proceed to&nbsp;the DISC test.
            </p>
            <Link
              href="/disc/about/job-roles/disc-test"
              className="rounded-lg border border-alto bg-tree-poppy px-14 py-5 text-xl font-semibold hover:bg-flush-orange"
              type="button"
              // onClick={saveRole}
            >
              Next
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};

export default JobRoles;
