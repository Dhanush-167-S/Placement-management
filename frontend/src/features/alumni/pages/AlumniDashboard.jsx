import React from 'react';
import { useAuthStore } from '../../auth/store/authStore';
import { Briefcase, Building2, Quote, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const AlumniDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8 mt-10">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-light flex items-center">
          Welcome back, {user?.studentData?.name || user?.name || 'Alumnus'}
        </h1>
        <p className="text-neutral-300">Your alumni portal. Share your expertise with the next generation.</p>
      </div>

      <div className="glass-card p-8 border-l-4 border-l-accent-teal shadow-card">
         <div className="flex items-start md:items-center space-x-6">
            <div className="w-16 h-16 rounded-2xl bg-surface border border-neutral-700/50 flex flex-col items-center justify-center shrink-0 shadow-inner">
               <Building2 className="w-8 h-8 text-accent-teal" />
            </div>
            <div>
               <h3 className="text-lg font-medium text-neutral-500 mb-1 uppercase tracking-widest">Currently Placed At</h3>
               <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-teal to-emerald-400">
                  {user?.companyJoined || 'Acme Corp'}
               </p>
               <p className="text-light mt-1 font-medium">{user?.role || 'Software Engineer'}</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
         <Link to="/alumni/network" className="glass-card p-6 flex items-center justify-between group cursor-pointer hover:bg-light/5 border-brand-violet/20 shadow-sm hover:shadow-glow interactive">
            <div>
              <h4 className="text-lg font-bold text-brand-violet mb-2">My Network</h4>
              <p className="text-sm text-neutral-500">Connect with other placed peers.</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-brand-violet/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-violet/30 transition-all">
               <Users className="w-6 h-6 text-brand-violet" />
            </div>
         </Link>

         {/* Placeholder link to feedback modal/page */}
         <button className="glass-card p-6 flex items-center justify-between group cursor-pointer hover:bg-light/5 border-emerald-500/20 shadow-sm hover:shadow-glow text-left w-full interactive">
            <div>
              <h4 className="text-lg font-bold text-emerald-400 mb-2">Give Feedback</h4>
              <p className="text-sm text-neutral-500">Review {user?.companyJoined || 'your company'} for juniors.</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/30 transition-all">
               <Quote className="w-6 h-6 text-emerald-500" />
            </div>
         </button>
      </div>
    </div>
  );
};

export default AlumniDashboard;
