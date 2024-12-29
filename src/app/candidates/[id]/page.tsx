import { getCandidateById } from "~/actions/profile";
import { Card } from "~/components/ui/card";
import CandidateProfileHeader from "../components/canditate-profile-header";
import CandidateBio from "../components/bio";
import CandidatePersonalInfo from "../components/candidate-personal-info";
import CandidateProfessionalOverview from "../components/candidate-professional-overview";
import CandidateWorkExperiences from "../components/candidate.work-experiences";
import CandidateEducation from "../components/candidate-education";
import CandidateTechSkills from "../components/candidate-tech-skills";
import CandidateSoftSkills from "../components/candidate-soft-skills";
import CandidateJobPreferences from "../components/candidate-job-preferences";
import CandidateWorkTandemPreferences from "../components/candiate-tandem-preference";
import CandidateReferences from "../components/candidate-references";
import CandidateProject from "../components/candidate-project";
import CandidateAdditionalInfo from "../components/candidate-additional-info";

interface CandidateProfileProps {
  params: {
    id: string;
  };
}

const CandidateProfile = async ({ params }: CandidateProfileProps) => {
  const { id } = params;
  const candidate = await getCandidateById(id);
  console.log(candidate);
  if (!candidate) {
    return <div>User not found</div>;
  }

  return (
    <>
      <CandidateProfileHeader user={candidate} />

      <div className="mt-8 flex w-9/12 items-center justify-center space-x-8">
        <CandidateBio user={candidate} />
      </div>

      <div className="mt-8 grid w-11/12 grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
        <CandidatePersonalInfo user={candidate} />

        {!candidate.jobTitle ? null : (
          <CandidateProfessionalOverview user={candidate} />
        )}

        {candidate.workExperiences.length ? (
          <Card className="h-fit w-full">
            {candidate.workExperiences.map((workExperience, index) => (
              <CandidateWorkExperiences
                key={index}
                workExperience={workExperience}
              />
            ))}
          </Card>
        ) : null}
        {candidate.education.length ? (
          <Card className="h-fit w-full">
            {candidate.education.map((educatio, index) => (
              <CandidateEducation key={index} educatio={educatio} />
            ))}
          </Card>
        ) : null}
      </div>

      {!candidate.technicalSkills.length ||
      !candidate.softSkills.length ? null : (
        <Card className="mt-6 h-fit w-11/12 pb-6">
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
      )}

      {candidate.jobPreferences ? (
        <Card className="mt-6 h-fit w-11/12">
          <div>
            <div className="flex justify-between p-4">
              <h2 className="text-lg text-violet">Job Preferences</h2>
            </div>

            <CandidateJobPreferences
              jobPreferences={candidate.jobPreferences}
            />
          </div>
        </Card>
      ) : null}

      {candidate.tandemPreferences ? (
        <Card className="mt-6 h-fit w-11/12">
          <div>
            <div className="flex justify-between p-4">
              <h2 className="text-lg text-violet">Work Tandem Preferences</h2>
            </div>
            <CandidateWorkTandemPreferences
              tandemPreferences={candidate.tandemPreferences}
            />
          </div>
        </Card>
      ) : null}

      {candidate.references.length ? (
        <Card className="mt-6 h-fit w-11/12">
          {candidate.references.map((reference, index) => (
            <CandidateReferences key={index} reference={reference} />
          ))}
        </Card>
      ) : null}

      {candidate.projects.length ? (
        <Card className="mt-6 h-fit w-11/12">
          {candidate.projects.map((project, index) => (
            <CandidateProject key={index} project={project} />
          ))}
        </Card>
      ) : null}

      {candidate.additionalInfo ? (
        <Card className="mt-6 h-fit w-11/12">
          <div>
            <div className="flex justify-between p-4">
              <h2 className="text-lg text-violet">Additional Information</h2>
            </div>

            <CandidateAdditionalInfo
              additionalInfo={candidate.additionalInfo}
            />
          </div>
        </Card>
      ) : null}
    </>
  );
};

export default CandidateProfile;
