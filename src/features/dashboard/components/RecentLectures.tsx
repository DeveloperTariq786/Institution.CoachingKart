import { RecentLecture } from "../services/dashboardService";
import { PlayCircle, Clock, Calendar } from "lucide-react";
import { format } from "date-fns";
import { resolveAssetUrl } from "@/lib/resolveAssetUrl";

interface RecentLecturesProps {
  lectures: RecentLecture[];
  loading?: boolean;
}

const RecentLectures = ({ lectures, loading }: RecentLecturesProps) => {
  if (loading) {
    return (
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="p-6 border-b">
          <div className="h-7 w-40 bg-muted animate-pulse rounded" />
        </div>
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 p-4 rounded-lg border bg-background animate-pulse">
                <div className="h-24 w-40 shrink-0 bg-muted rounded-md" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-muted rounded" />
                  <div className="h-3 w-full bg-muted rounded" />
                  <div className="h-3 w-1/2 bg-muted rounded pt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    const parts = [];
    if (hrs > 0) parts.push(hrs.toString().padStart(2, '0'));
    parts.push(mins.toString().padStart(2, '0'));
    parts.push(secs.toString().padStart(2, '0'));
    
    return parts.join(':');
  };

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Recent Lectures</h2>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full font-medium">
          Last {lectures.length} sessions
        </span>
      </div>
      <div className="p-6">
        {lectures.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground">
              <PlayCircle className="h-6 w-6" />
            </div>
            <p className="text-muted-foreground font-medium">No recent lectures found.</p>
            <p className="text-xs text-muted-foreground mt-1">Start by creating your first lecture session.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {lectures.map((lecture) => (
              <div 
                key={lecture.id} 
                className="flex gap-4 p-4 rounded-lg border bg-background hover:border-primary/50 hover:shadow-md transition-all duration-300 group cursor-pointer"
              >
                <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-md bg-muted shadow-sm">
                  <img
                    src={resolveAssetUrl(lecture.thumbnail) || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&h=225&auto=format&fit=crop'}
                    alt={lecture.title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="h-10 w-10 rounded-full bg-primary/90 flex items-center justify-center text-white transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <PlayCircle className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 font-medium ring-1 ring-white/20">
                    <Clock className="h-3 w-3" />
                    {formatDuration(lecture.duration)}
                  </div>
                </div>
                
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <h3 className="font-semibold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {lecture.title}
                    </h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                      {lecture.description}
                    </p>
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold text-primary px-1.5 py-0.5 bg-primary/5 rounded-md border border-primary/10">
                        {lecture.batchSubject.batch.name}
                      </span>
                      <span className="text-[10px] font-medium text-foreground px-1.5 py-0.5 bg-muted rounded-md">
                        {lecture.batchSubject.subject.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-1 border-t border-dashed border-border/50">
                       <div className="flex items-center gap-1.5 truncate">
                          <img 
                            src={resolveAssetUrl(lecture.faculty.profileImage) || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=40&h=40&auto=format&fit=crop'} 
                            alt={lecture.faculty.name} 
                            className="h-5 w-5 rounded-full object-cover ring-1 ring-border" 
                          />
                          <span className="text-[11px] text-foreground font-medium truncate">
                            {lecture.faculty.name}
                          </span>
                       </div>
                       <span className="text-[10px] text-muted-foreground flex items-center gap-1 shrink-0">
                         <Calendar className="h-3 w-3" />
                         {format(new Date(lecture.createdAt), 'MMM dd')}
                       </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentLectures;
