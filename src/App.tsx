import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ProjectCard from './components/ProjectCard';
import AddProjectDialog from './components/AddProjectDialog';
import ProjectSorter from './components/ProjectSorter';
import initialProjects from './initialProjects';
import { GitHubProject, ProjectSortOption } from './interfaces';
import * as cookieUtils from './cookieUtils';

const App = () => {
  const [projects, setProjects] = useState<GitHubProject[]>([]);
  const [showAddProjectDialog, setShowAddProjectDialog] = useState(false);
  const [sortBy, setSortBy] = useState(ProjectSortOption.DEFAULT);

  useEffect(() => {
    if (cookieUtils.getProjects().length === 0) {
      initialProjects.forEach((proj) => cookieUtils.addProject(proj));
    }
    setProjects(cookieUtils.getProjects());

    const searchParams = new URLSearchParams(window.location.search);
    const sortSearchParam = searchParams.get('sortBy') as ProjectSortOption;
    if (sortSearchParam) {
      sortProjects(sortSearchParam);
      setSortBy(sortSearchParam);
    }
  }, []);

  const handleAddProject = (newProj: GitHubProject) => {
    cookieUtils.addProject(newProj);
    setProjects(projects.concat(newProj));
    setShowAddProjectDialog(false);
  };

  const handleRemoveProject = (id: string) => {
    cookieUtils.removeProject(id);
    setProjects(projects.filter((proj) => proj.id !== id));
  };

  const sortProjects = (sortOption: ProjectSortOption) => {
    switch (sortOption) {
      case ProjectSortOption.RATING_ASC:
        setProjects((projs) => projs.sort((a, b) => a.rating - b.rating));
        break;
      case ProjectSortOption.RATING_DESC:
        setProjects((projs) => projs.sort((a, b) => b.rating - a.rating));
        break;
      case ProjectSortOption.CREATED_ASC:
        setProjects((projs) =>
          projs.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
        );
        break;
      case ProjectSortOption.CREATED_DESC:
        setProjects((projs) =>
          projs.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        );
        break;
      default:
        break;
    }
  };

  const handleSortChange = (value: ProjectSortOption) => {
    const searchParams = new URLSearchParams(window.location.search);
    let newUrl = window.location.href.split('?')[0];
    if (value !== ProjectSortOption.DEFAULT) {
      searchParams.set('sortBy', value);
      newUrl += `?${searchParams.toString()}`;
    } else {
      searchParams.delete('sortBy');
    }
    window.history.pushState({ path: newUrl }, '', newUrl);
    sortProjects(value);
    setSortBy(value);
  };

  return (
    <div>
      <AppBar position="relative">
        <Typography variant="h3" style={{ padding: 5 }}>
          GitHub Explorer
        </Typography>
      </AppBar>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginRight: 30,
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        <ProjectSorter value={sortBy} onChange={handleSortChange} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginLeft: 30,
        }}
      >
        {projects.map((proj) => (
          <ProjectCard
            key={`project-card-${proj.id}`}
            project={proj}
            onProjectRemove={() => handleRemoveProject(proj.id)}
          />
        ))}
      </div>
      <Fab
        onClick={() => setShowAddProjectDialog(true)}
        style={{ position: 'absolute', bottom: 30, right: 30 }}
      >
        <AddIcon />
      </Fab>
      <AddProjectDialog
        isOpen={showAddProjectDialog}
        onClose={() => setShowAddProjectDialog(false)}
        onSubmit={handleAddProject}
      />
    </div>
  );
};

export default App;
