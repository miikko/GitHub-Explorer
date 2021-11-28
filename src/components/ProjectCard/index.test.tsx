import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectCard from './index';

const mockProject = {
  id: 'a87e8618-7392-4ac2-b4d0-c6b9b8fb3304',
  name: 'React',
  url: 'https://github.com/facebook/react',
  rating: 5,
  createdAt: new Date('2021-11-19T13:46:36.211Z'),
};

const handleProjectRemoveMock = jest.fn();

beforeEach(() => {
  render(
    <ProjectCard
      project={mockProject}
      onProjectRemove={handleProjectRemoveMock}
    />
  );
});

afterEach(() => {
  handleProjectRemoveMock.mockReset();
});

describe('ProjectCard', () => {
  it('shows correct project information', () => {
    screen.getByText(mockProject.name);
    expect(screen.getAllByLabelText('Rating star yellow').length).toBe(
      mockProject.rating
    );
  });

  it('opens project GitHub page on a new tab when clicked', () => {
    const windowOpenMock = jest.fn();
    window.open = windowOpenMock;
    userEvent.click(screen.getByLabelText('Interactive project card content'));
    expect(windowOpenMock).toHaveBeenCalledWith(mockProject.url);
    windowOpenMock.mockRestore();
  });

  it('calls "onProjectRemove" prop when close-button is pressed', () => {
    expect(handleProjectRemoveMock).toHaveBeenCalledTimes(0);
    userEvent.click(screen.getByLabelText('Remove project button'));
    expect(handleProjectRemoveMock).toHaveBeenCalledTimes(1);
  });
});
