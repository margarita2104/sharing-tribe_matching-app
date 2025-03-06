import { getCandidateById } from "~/actions/profile";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import CandidateProfileHeader from "../components/canditate-profile-header";
import CandidateBio from "../components/bio";
import CandidatePersonalInfo from "../components/candidate-personal-info";
import CandidateProfessionalOverview from "../components/candidate-professional-overview";
// import CandidateWorkExperiences from "../components/candidate.work-experiences";
// import CandidateEducation from "../components/candidate-education";
import CandidateTechSkills from "../components/candidate-tech-skills";
import CandidateSoftSkills from "../components/candidate-soft-skills";
import CandidateJobPreferences from "../components/candidate-job-preferences";
import CandidateWorkTandemPreferences from "../components/candiate-tandem-preference";
import CandidateReferences from "../components/candidate-references";
import CandidateProject from "../components/candidate-project";
import CandidateAdditionalInfo from "../components/candidate-additional-info";
import { Suspense } from "react";
import Loading from "~/app/profile/loading";

interface CandidateProfileProps {
  params: {
    id: string;
  };
}

const CandidateProfile = async ({ params }: CandidateProfileProps) => {
  const { id } = params;
  const candidate = await getCandidateById(id);

  if (!candidate) {
    return <div>User not found</div>;
  }

  return (
    <Suspense fallback={<Loading />}>
      <CandidateProfileHeader user={candidate} />

      <div className="mt-8 flex w-full items-center justify-center">
        <div className="w-11/12">
          <CandidateBio user={candidate} />
        </div>
      </div>

      <div className="mt-8 flex w-full justify-center">
        <div className="w-11/12">
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="h-80">
              <div className="h-full [&>*]:!h-full">
                <CandidatePersonalInfo user={candidate} />
              </div>
            </div>

            <div className="h-80">
              <div className="h-full [&>*]:!h-full">
                {!candidate.jobTitle ? (
                  <Card className="h-full w-full">
                    <CardHeader>
                      <div className="flex justify-between">
                        <h2 className="text-lg text-violet">
                          Professional Overview
                        </h2>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400">
                        No professional information available
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <CandidateProfessionalOverview user={candidate} />
                )}
              </div>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="h-full w-full">
              <CardHeader>
                <div className="flex justify-between">
                  <h2 className="text-lg text-violet">Work Experience</h2>
                </div>
              </CardHeader>
              <CardContent
                className="overflow-auto"
                style={{ maxHeight: "calc(100% - 60px)" }}
              >
                {candidate.workExperiences.length ? (
                  <div className="space-y-4">
                    {candidate.workExperiences.map((workExperience, index) => (
                      <div
                        key={index}
                        className="border-t pt-2 first:border-t-0 first:pt-0"
                      >
                        <ul className="space-y-3">
                          <li className="flex justify-between">
                            <div className="w-full">Job Title</div>
                            <div className="w-full">
                              {workExperience.jobTitle}
                            </div>
                          </li>
                          <li className="flex justify-between">
                            <div className="w-full">Company Name</div>
                            <div className="w-full">
                              {workExperience.companyName ?? "N/A"}
                            </div>
                          </li>
                          <li className="flex justify-between">
                            <div className="w-full">Start Date</div>
                            <div className="w-full">
                              {workExperience.startDate}
                            </div>
                          </li>
                          <li className="flex justify-between">
                            <div className="w-full">End Date</div>
                            <div className="w-full">
                              {workExperience.endDate}
                            </div>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No work experience available</p>
                )}
              </CardContent>
            </Card>

            <Card className="h-full w-full">
              <CardHeader>
                <div className="flex justify-between">
                  <h2 className="text-lg text-violet">Education</h2>
                </div>
              </CardHeader>
              <CardContent
                className="overflow-auto"
                style={{ maxHeight: "calc(100% - 60px)" }}
              >
                {candidate.education.length ? (
                  <div className="space-y-4">
                    {candidate.education.map((education, index) => (
                      <div
                        key={index}
                        className="border-t pt-2 first:border-t-0 first:pt-0"
                      >
                        <ul className="space-y-3">
                          <li className="flex justify-between">
                            <span className="w-full">Degree</span>
                            <span className="w-full">{education.degree}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="w-full">Field Of Study</span>
                            <span className="w-full">
                              {education.fieldOfStudy ?? "N/A"}
                            </span>
                          </li>
                          <li className="flex justify-between">
                            <span className="w-full">Institution</span>
                            <span className="w-full">
                              {education.institution ?? "N/A"}
                            </span>
                          </li>
                          <li className="flex justify-between">
                            <span className="w-full">Graduation Year</span>
                            <span className="w-full">
                              {education.graduationYear ?? "N/A"}
                            </span>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">
                    No education information available
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {!candidate.technicalSkills.length ||
      !candidate.softSkills.length ? null : (
        <div className="mt-6 flex w-full justify-center">
          <Card className="w-11/12 pb-6">
            <div>
              <div className="flex justify-between p-4">
                <h2 className="text-lg text-violet">Technical Skills</h2>
              </div>
              <CandidateTechSkills techSkills={candidate.technicalSkills} />
            </div>
            <div>
              <div className="flex justify-between p-4">
                <h2 className="text-lg text-violet">Soft Skills</h2>
              </div>
              <CandidateSoftSkills softSkills={candidate.softSkills} />
            </div>
          </Card>
        </div>
      )}

      {candidate.jobPreferences ? (
        <div className="mt-6 flex w-full justify-center">
          <Card className="w-11/12">
            <div>
              <div className="flex justify-between p-4">
                <h2 className="text-lg text-violet">Job Preferences</h2>
              </div>
              <CandidateJobPreferences
                jobPreferences={candidate.jobPreferences}
              />
            </div>
          </Card>
        </div>
      ) : null}

      {candidate.tandemPreferences ? (
        <div className="mt-6 flex w-full justify-center">
          <Card className="w-11/12">
            <div>
              <div className="flex justify-between p-4">
                <h2 className="text-lg text-violet">Work Tandem Preferences</h2>
              </div>
              <CandidateWorkTandemPreferences
                tandemPreferences={candidate.tandemPreferences}
              />
            </div>
          </Card>
        </div>
      ) : null}

      {candidate.references.length ? (
        <div className="mt-6 flex w-full justify-center">
          <Card className="w-11/12">
              {candidate.references.map((reference, index) => (
                <CandidateReferences key={index} reference={reference} />
              ))}
          </Card>
        </div>
      ) : null}

      {candidate.projects.length ? (
        <div className="mt-6 flex w-full justify-center">
          <Card className="w-11/12">
            <div className="p-4">
              <h2 className="mb-4 text-lg text-violet">Projects</h2>
              {candidate.projects.map((project, index) => (
                <CandidateProject key={index} project={project} />
              ))}
            </div>
          </Card>
        </div>
      ) : null}

      {candidate.additionalInfo ? (
        <div className="mt-6 flex w-full justify-center">
          <Card className="w-11/12">
            <div>
              <div className="flex justify-between p-4">
                <h2 className="text-lg text-violet">Additional Information</h2>
              </div>
              <CandidateAdditionalInfo
                additionalInfo={candidate.additionalInfo}
              />
            </div>
          </Card>
        </div>
      ) : null}
    </Suspense>
  );
};

export default CandidateProfile;
