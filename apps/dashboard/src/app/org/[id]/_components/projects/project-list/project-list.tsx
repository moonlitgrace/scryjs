import { getAbbr } from '@/constants/abbr';
import { formatTimeSince } from '@/lib/datetime';
import { getInitials } from '@/lib/utils';
import { OrgService } from '@/services/org.service';
import { Avatar, AvatarFallback } from '@repo/design-system/components/ui/avatar';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Button } from '@repo/design-system/components/ui/button';
import { ArrowRight, Ellipsis, FolderOpen, GitBranch, SearchX } from 'lucide-react';
import Link from 'next/link';
import { Props } from '../projects';

export default async function ProjectList({ id, query, sort }: Props) {
  const service = new OrgService(id);
  const projects = await service.getProjects({ query, sort });

  if (projects.length === 0) {
    const title = query ? 'No Results Found!' : 'No Project Yet!';
    const description = query
      ? `Your search for ${`"${query}"`} did not return any results.`
      : 'Get started by creating your first project.';
    const Icon = query ? SearchX : FolderOpen;

    return (
      <div className="col-span-2 flex h-full flex-col items-center justify-center gap-2">
        <Icon className="text-muted-foreground size-10 stroke-1" />
        <span className="text-sm font-medium">{title}</span>
        <span className="text-muted-foreground text-sm">{description}</span>
        <Link href={`/project/new${query && `?name=${query}`}`}>
          <Button variant={'link'}>
            New Project
            <ArrowRight />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-card hover:bg-accent/40 relative flex h-45 flex-col justify-between rounded-lg border p-5 transition-colors"
        >
          <Link href={`/project/${project.id}`} className="absolute inset-0 z-1" />
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2">
              <Avatar className="size-10 rounded-md">
                <AvatarFallback className="rounded-md">
                  {getInitials(project.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{project.name}</span>
                <span className="text-muted-foreground line-clamp-1 text-sm break-all">
                  {new URL(project.domain).host}
                </span>
              </div>
            </div>
            <div className="inline-flex items-center gap-2">
              <Badge variant={project.status === 'Active' ? 'default' : 'destructive'}>
                {project.status}
              </Badge>
              <Button
                variant={'ghost'}
                size={'icon-sm'}
                className="relative z-2"
                disabled
              >
                <Ellipsis />
              </Button>
            </div>
          </div>
          <div className="text-muted-foreground flex flex-col text-sm">
            <span className="line-clamp-1 font-mono text-xs font-medium">
              {project.latestError.errorMsg}
            </span>
            <div className="inline-flex items-center gap-2">
              <span>{formatTimeSince(project.latestError.timestamp)}</span>
              <span>on</span>
              <GitBranch className="size-4" />
              <span className="text-foreground text-xs font-medium uppercase">
                {getAbbr(project.latestError.env)}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="flex flex-col items-start">
              <div className="font-medium">{project.stats.errors}</div>
              <div className="text-muted-foreground">Errors</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-medium">
                {formatTimeSince(project.stats.lastError)}
              </div>
              <div className="text-muted-foreground">Last Error</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="font-medium">
                {project.stats.errorTrend === 'UP'
                  ? '↑ More'
                  : project.stats.errorTrend === 'DOWN'
                    ? '↓ Less'
                    : '→ Stable'}
              </div>
              <div className="text-muted-foreground">vs yesterday</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
