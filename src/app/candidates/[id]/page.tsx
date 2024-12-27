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
// import CandidateJobPreferences from "../components/candidate-job-preferences";

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
                workExperience={candidate.workExperiences}
              />
            ))}
          </Card>
        ) : null}
        {candidate.education.length ? (
          <Card className="h-fit w-full">
            {candidate.education.map((educatio, index) => (
              <CandidateEducation key={index} educatio={candidate.education} />
            ))}
          </Card>
        ) : null}
      </div>

      <Card className="mt-6 h-fit w-11/12">
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

      {/* {ShowJobPreferences ? (
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

      {ShowWorkTandemPreferences ? (
        <Card className="mt-6 h-fit w-11/12">
          <div>
            <div className="flex justify-between p-4">
              <h2 className="text-lg text-violet">Work Tandem Preferences</h2>
              {editWorkTandem ? null : (
                <div
                  className="cursor-pointer"
                  onClick={() => setEditWorkTandem(true)}
                >
                  <Image
                    src="/icons/profile-edit.png"
                    alt="Profile edit icon"
                    width={16}
                    height={16}
                  />
                </div>
              )}
            </div>
            {!workTandemPreferences ? (
              <WorkTandem userId={user.id} />
            ) : (
              <WorkTandemSave
                userId={user.id}
                workTandemPreferences={workTandemPreferences}
                editWorkTandem={editWorkTandem}
                setEditWorkTandem={setEditWorkTandem}
              />
            )}
          </div>
        </Card>
      ) : null}

      {references.length ? (
        <Card className="mt-6 h-fit w-11/12">
          {references
            .slice(0, showAllReference ? references.length : 1)
            .map((reference, index) => (
              <ReferenceComponent key={index} reference={reference} />
            ))}
          <CardFooter className="flex w-full justify-between">
            {!showAllReference && references.length > 1 && (
              <>
                <Button onClick={() => setShowAllReferences(true)}>
                  Show More
                </Button>
                <ModalReferences userId={user.id} title="Add more" />
              </>
            )}
            {references.length === 1 ? (
              <ModalReferences userId={user.id} title="Add more" />
            ) : null}
            {showAllReference && references.length > 1 ? (
              <>
                <Button onClick={() => setShowAllReferences(false)}>
                  Show Less
                </Button>
                <ModalReferences userId={user.id} title="Add more" />
              </>
            ) : null}
          </CardFooter>
        </Card>
      ) : null}

      {projects.length ? (
        <Card className="mt-6 h-fit w-11/12">
          {projects
            .slice(0, showAllProjects ? projects.length : 1)
            .map((project, index) => (
              <ProjectComponent key={index} project={project} />
            ))}
          <CardFooter className="flex w-full justify-between">
            {!showAllProjects && projects.length > 1 && (
              <>
                <Button onClick={() => setShowAllProjects(true)}>
                  Show More
                </Button>
                <ModalProject userId={user.id} title="Add more" />
              </>
            )}
            {projects.length === 1 ? (
              <ModalProject userId={user.id} title="Add more" />
            ) : null}
            {showAllProjects && projects.length > 1 ? (
              <>
                <Button onClick={() => setShowAllProjects(false)}>
                  Show Less
                </Button>
                <ModalProject userId={user.id} title="Add more" />
              </>
            ) : null}
          </CardFooter>
        </Card>
      ) : null}

      {ShowAdditionalInfo ? (
        <Card className="mt-6 h-fit w-11/12">
          <div>
            <div className="flex justify-between p-4">
              <h2 className="text-lg text-violet">Additional Information</h2>
              {editAdditionalInfo ? null : (
                <div
                  className="cursor-pointer"
                  onClick={() => setEditAdditionalInfo(true)}
                >
                  <Image
                    src="/icons/profile-edit.png"
                    alt="Profile edit icon"
                    width={16}
                    height={16}
                  />
                </div>
              )}
            </div>

            <AdditionalInfoComponent userId={user.id} />
          </div>
        </Card>
      ) : null} */}
    </>
  );
};

export default CandidateProfile;
