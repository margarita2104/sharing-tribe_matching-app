// import { type JobPreference } from "@prisma/client";
// import { CardContent } from "~/components/ui/card";

// export default function CandidateJobPreferences({
//   jobPreferences,
// }: {
//   jobPreferences: JobPreference[];
// }) {
//   return (
//     <CardContent>
//       <div className="space-y-4">

//           <div className="flex flex-wrap items-center space-x-4 space-y-2">

//             {jobPreferences?.role.map((role, index) => (
//               <>
//                 <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
//                   {role}
//                   {editJobPreferences && (
//                     <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform cursor-pointer">
//                       <MdOutlineCancel className="text-red-500" />
//                     </div>
//                   )}
//                 </span>
//               </>
//             ))}
//           </div>
//         )}

//         {editJobPreferences ? (
//           <>
//             <div className="flex items-center space-x-4">
//               {jobPreferences?.workPreference.map((role, index) => (
//                 <>
//                   <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
//                     {role}
//                     {editJobPreferences && (
//                       <div
//                         onClick={() =>
//                           startTransition(async () => {
//                             await JobPreferenceDelete(
//                               jobPreferences?.id ?? 0,
//                               "workPreference",
//                               index,
//                             )
//                               .then(() => {
//                                 toast({
//                                   title: "Skill deleted",
//                                   description: "Skill has been deleted",
//                                 });
//                               })
//                               .catch((error) => {
//                                 toast({
//                                   title: "Error",
//                                   description: `Failed to delete skill`,
//                                 });
//                               });
//                           })
//                         }
//                         className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform cursor-pointer"
//                       >
//                         <MdOutlineCancel className="text-red-500" />
//                       </div>
//                     )}
//                   </span>
//                 </>
//               ))}
//             </div>
//             <FormField
//               control={form.control}
//               name="workPreference"
//               render={({ field }) => (
//                 <FormItem className="flex items-center">
//                   <FormLabel className="w-full">
//                     Work Preference (Add a new one){" "}
//                   </FormLabel>
//                   <Select
//                     onValueChange={(value) => {
//                       field.onChange([value]);
//                     }}
//                     value={field.value?.[0] ?? ""}
//                   >
//                     <FormControl className="cursor-pointer">
//                       <SelectTrigger>
//                         <SelectValue placeholder="Choose" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent className="cursor-pointer">
//                       {filteredWorkPreferences?.map((role, index) => (
//                         <SelectItem
//                           className="cursor-pointer"
//                           key={index}
//                           value={role}
//                         >
//                           {role}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </>
//         ) : (
//           <div className="flex flex-wrap items-center space-x-4 space-y-2">
//             <FormLabel>Work Preference</FormLabel>
//             {jobPreferences?.workPreference.map((role, index) => (
//               <>
//                 <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
//                   {role}
//                   {editJobPreferences && (
//                     <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform cursor-pointer">
//                       <MdOutlineCancel className="text-red-500" />
//                     </div>
//                   )}
//                 </span>
//               </>
//             ))}
//           </div>
//         )}

//         {editJobPreferences ? (
//           <>
//             <div className="flex items-center space-x-4">
//               {jobPreferences?.industry.map((role, index) => (
//                 <>
//                   <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
//                     {role}
//                     {editJobPreferences && (
//                       <div
//                         onClick={() =>
//                           startTransition(async () => {
//                             await JobPreferenceDelete(
//                               jobPreferences?.id ?? 0,
//                               "industry",
//                               index,
//                             )
//                               .then(() => {
//                                 toast({
//                                   title: "Skill deleted",
//                                   description: "Skill has been deleted",
//                                 });
//                               })
//                               .catch((error) => {
//                                 toast({
//                                   title: "Error",
//                                   description: `Failed to delete skill`,
//                                 });
//                               });
//                           })
//                         }
//                         className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform cursor-pointer"
//                       >
//                         <MdOutlineCancel className="text-red-500" />
//                       </div>
//                     )}
//                   </span>
//                 </>
//               ))}
//             </div>
//             <FormField
//               control={form.control}
//               name="industry"
//               render={({ field }) => (
//                 <FormItem className="flex items-center">
//                   <FormLabel className="w-full">
//                     Desired industry (Add a new one){" "}
//                   </FormLabel>
//                   <Select
//                     onValueChange={(value) => {
//                       field.onChange([value]);
//                     }}
//                     value={field.value?.[0] ?? ""}
//                   >
//                     <FormControl className="cursor-pointer">
//                       <SelectTrigger>
//                         <SelectValue placeholder="Choose" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent className="cursor-pointer">
//                       {filteredIndustry?.map((role, index) => (
//                         <SelectItem
//                           className="cursor-pointer"
//                           key={index}
//                           value={role}
//                         >
//                           {role}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </>
//         ) : (
//           <div className="flex flex-wrap items-center space-x-4 space-y-2">
//             <FormLabel>Desired Industry</FormLabel>
//             {jobPreferences?.industry.map((role, index) => (
//               <>
//                 <span className="relative rounded-full bg-slate-300 px-2 py-1 text-slate-950">
//                   {role}
//                   {editJobPreferences && (
//                     <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform cursor-pointer">
//                       <MdOutlineCancel className="text-red-500" />
//                     </div>
//                   )}
//                 </span>
//               </>
//             ))}
//           </div>
//         )}
//       </div>
//     </CardContent>
//   );
// }
