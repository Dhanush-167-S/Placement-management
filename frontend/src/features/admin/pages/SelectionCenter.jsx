import React, { useState } from 'react';
import { useActiveDrives, useSelectStudents } from '../hooks/useAdminHooks';
import { 
  Building2, Users, CheckSquare, ChevronRight, 
  MapPin, Award, CheckCircle2, FileText, Loader2, ArrowRight
} from 'lucide-react';
import { cn } from '../../../shared/utils/cn';
import { useAdminStore } from '../store/adminStore';

const SelectionCenter = () => {
  const { data, isLoading } = useActiveDrives();
  const { mutate: selectStudents, isPending } = useSelectStudents();
  
  // Drives with applicants
  const drives = data?.data?.drives?.filter(d => d.applicants?.length > 0) || [];

  const [selectedDriveId, setSelectedDriveId] = useState(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState(new Set());

  const activeDrive = drives.find(d => d._id === selectedDriveId);

  const toggleStudentSelection = (studentId) => {
    const newSelected = new Set(selectedStudentIds);
    if (newSelected.has(studentId)) {
      newSelected.delete(studentId);
    } else {
      newSelected.add(studentId);
    }
    setSelectedStudentIds(newSelected);
  };

  const selectAll = () => {
    if (!activeDrive) return;
    const actionable = activeDrive.applicants.filter(a => a.status !== 'PLACED');
    if (selectedStudentIds.size === actionable.length && actionable.length > 0) {
      setSelectedStudentIds(new Set());
    } else {
      setSelectedStudentIds(new Set(actionable.map(a => a.studentId)));
    }
  };

  const handleFinalize = () => {
    if (!activeDrive || selectedStudentIds.size === 0) return;
    
    selectStudents({
      companyId: activeDrive._id,
      studentIds: Array.from(selectedStudentIds)
    }, {
      onSuccess: () => {
        setSelectedStudentIds(new Set());
        setSelectedDriveId(null);
      }
    });
  };

  return (
    <div className="space-y-6 mt-10 h-[calc(100vh-[120px])] flex flex-col">
      <div className="flex items-center space-x-3 mb-4 shrink-0">
        <div className="p-3 bg-accent-gold/10 rounded-2xl border border-accent-gold/20">
          <CheckSquare className="w-8 h-8 text-accent-gold" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-light tracking-tight">Selection Center</h1>
          <p className="text-neutral-500 mt-1 text-sm">Review applicants, finalize placements, and trigger alumni migration.</p>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Left Panel: Active Drives */}
        <div className="w-full lg:w-1/3 flex flex-col min-h-0">
          <div className="glass-card shadow-card flex flex-col h-full overflow-hidden border border-neutral-700/50">
            <div className="p-5 border-b border-light/10 bg-surface/50">
              <h2 className="text-lg font-bold text-light flex items-center">
                 <Building2 className="w-5 h-5 mr-2 text-accent-gold" /> Placement Drives
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
              {isLoading ? (
                [1,2,3].map(i => <div key={i} className="h-20 rounded-xl bg-light/5 animate-pulse" />)
              ) : drives.length > 0 ? (
                drives.map(drive => (
                  <button
                    key={drive._id}
                    onClick={() => {
                        setSelectedDriveId(drive._id);
                        setSelectedStudentIds(new Set());
                    }}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border transition-all duration-200 group interactive",
                      selectedDriveId === drive._id 
                        ? "bg-accent-gold/10 border-accent-gold/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]" 
                        : "bg-surface/50 border-transparent hover:bg-light/5 hover:border-light/10"
                    )}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={cn("font-bold truncate pr-3", selectedDriveId === drive._id ? "text-accent-gold" : "text-light")}>
                        {drive.companyName}
                      </h3>
                      <ChevronRight className={cn("w-4 h-4 shrink-0 transition-transform", selectedDriveId === drive._id ? "text-accent-gold translate-x-1" : "text-neutral-500")} />
                    </div>
                    <p className="text-xs text-brand-violet font-medium">{drive.role}</p>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <div className="flex items-center text-neutral-400">
                         <Users className="w-3.5 h-3.5 mr-1" />
                         <span>{drive.applicants.length} Applicants</span>
                      </div>
                      <div className="text-neutral-500 font-medium">
                         Target: {drive.numberOfCandidates || 'N/A'}
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center p-8 text-neutral-500 flex flex-col items-center">
                  <Building2 className="w-10 h-10 mb-2 opacity-30" />
                  <p className="text-sm">No active drives with applicants.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Applicants Details */}
        <div className="w-full lg:w-2/3 flex flex-col min-h-0">
          <div className="glass-card shadow-card flex flex-col h-full overflow-hidden border border-neutral-700/50">
            {activeDrive ? (
              <>
                {/* Header */}
                <div className="p-6 border-b border-light/10 bg-gradient-to-r from-surface to-deep shrink-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-light mb-1">{activeDrive.companyName}</h2>
                      <p className="text-sm text-neutral-400">Select candidates to be placed. Selected students will automatically be migrated to the Alumni network.</p>
                    </div>
                    
                    {/* Finalize Button */}
                    <button
                      disabled={selectedStudentIds.size === 0 || isPending}
                      onClick={handleFinalize}
                      className={cn(
                        "btn-primary py-2.5 px-6 whitespace-nowrap",
                        (selectedStudentIds.size === 0 || isPending) && "opacity-50 cursor-not-allowed transform-none hover:shadow-none bg-neutral-700 text-neutral-400 shadow-none"
                      )}
                    >
                      {isPending ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                      )}
                      Finalize {selectedStudentIds.size > 0 ? `(${selectedStudentIds.size})` : ''}
                    </button>
                  </div>
                </div>

                {/* Table Area */}
                <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead className="sticky top-0 bg-deep/95 backdrop-blur-md z-10 shadow-sm border-b border-light/10">
                      <tr>
                        <th className="p-4 w-12 text-center">
                          <input 
                            type="checkbox" 
                            checked={selectedStudentIds.size === activeDrive.applicants.filter(a => a.status !== 'PLACED').length && activeDrive.applicants.filter(a => a.status !== 'PLACED').length > 0}
                            onChange={selectAll}
                            className="w-4 h-4 rounded appearance-none border border-neutral-500 checked:bg-accent-gold checked:border-accent-gold relative checked:after:content-['✓'] checked:after:absolute checked:after:text-light checked:after:text-xs checked:after:left-[3px] checked:after:-top-[1px] transition-all cursor-pointer"
                          />
                        </th>
                        <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Candidate / USN</th>
                        <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Branch & CGPA</th>
                        <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-wider text-center">Match Rating</th>
                        <th className="p-4 text-xs font-bold text-neutral-500 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-light/5">
                      {activeDrive.applicants.map(app => (
                        <tr 
                          key={app.studentId}
                          onClick={() => { if (app.status !== 'PLACED') toggleStudentSelection(app.studentId) }}
                          className={cn(
                            "group transition-colors",
                            app.status === 'PLACED' ? "bg-accent-gold/5 opacity-80 cursor-default" : "cursor-pointer hover:bg-light/5",
                            selectedStudentIds.has(app.studentId) ? "bg-accent-gold/10" : ""
                          )}
                        >
                          <td className="p-4 text-center">
                            <input 
                              type="checkbox" 
                              checked={selectedStudentIds.has(app.studentId) || app.status === 'PLACED'}
                              disabled={app.status === 'PLACED'}
                              readOnly
                              className={cn(
                                "w-4 h-4 rounded appearance-none border border-neutral-500 checked:after:content-['✓'] checked:after:absolute checked:after:text-light checked:after:text-xs checked:after:left-[3px] checked:after:-top-[1px] transition-all relative pointer-events-none",
                                app.status === 'PLACED' ? "bg-neutral-600 border-neutral-600 checked:bg-neutral-600" : "checked:bg-accent-gold checked:border-accent-gold"
                              )}
                            />
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-light group-hover:text-accent-gold transition-colors">{app.name}</div>
                            <div className="text-xs text-neutral-400 mt-0.5 uppercase tracking-wider">{app.usn}</div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center text-sm text-neutral-300">
                               <MapPin className="w-3.5 h-3.5 mr-1.5 text-neutral-500" /> {app.branch}
                            </div>
                            <div className="flex items-center text-sm text-brand-lavender mt-1 font-medium">
                               <Award className="w-3.5 h-3.5 mr-1.5" /> {app.cgpa} CGPA
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            {app.status === 'PLACED' ? (
                               <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black bg-accent-gold/20 text-accent-gold border border-accent-gold/30 uppercase tracking-widest shadow-glow">
                                  Placed
                               </span>
                            ) : (
                               <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                 {app.matchedSkillsCount} Skills
                               </span>
                            )}
                          </td>
                          <td className="p-4 text-right">
                             {app.resume ? (
                               <a 
                                  href={app.resume} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  onClick={e => e.stopPropagation()}
                                  className="inline-flex items-center justify-center p-2 rounded-xl bg-surface border border-light/10 text-brand-lavender hover:bg-light/10 hover:border-brand-lavender/50 transition-colors interactive"
                                >
                                  <FileText className="w-4 h-4" />
                                </a>
                             ) : (
                               <span className="text-xs text-neutral-500 italic">No CV</span>
                             )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {activeDrive.applicants.length === 0 && (
                    <div className="p-12 text-center text-neutral-500">
                      No applicants found for this drive.
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <CheckSquare className="w-16 h-16 text-neutral-700/50 mb-4" />
                <h3 className="text-xl font-bold text-light mb-2">No Drive Selected</h3>
                <p className="text-neutral-500 max-w-sm">
                  Select a placement drive from the left panel to review applicants and finalize selections.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionCenter;
