import { useMemo } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import RatingStars from '../RatingStars';
import { GitHubProject } from '../../interfaces';

interface Props {
  /**
   * This component's is constructed based on the property-values of this object.
   */
  project: GitHubProject;
  /**
   * Callback for handling project removal action.
   * Called when user presses the X-button on the top-righthand corner of the Card.
   */
  onProjectRemove: () => void;
}

const ProjectCard = (props: Props) => {
  const colorPalette = [
    '#f5f5f570',
    '#ff558066',
    '#9b55ff66',
    '#5595ff66',
    '#ff795566',
  ];
  // useMemo is here so that background color is not recalculated on each render.
  const backgroundColor = useMemo(
    () => colorPalette[Math.floor(Math.random() * colorPalette.length)],
    [props.project.id]
  );

  return (
    <Card
      style={{
        margin: 10,
        width: '22%',
        position: 'relative',
        backgroundColor,
      }}
    >
      <IconButton
        size="small"
        color="secondary"
        onClick={props.onProjectRemove}
        style={{ position: 'absolute', right: 0 }}
        aria-label="Remove project button"
      >
        <CloseIcon />
      </IconButton>
      <CardContent
        aria-label="Interactive project card content"
        onClick={() => window.open(props.project.url)}
        style={{ cursor: 'pointer', paddingBottom: 5 }}
      >
        <Typography variant="h6">{props.project.name}</Typography>
        <div style={{ marginLeft: -3, marginTop: 5 }}>
          <RatingStars
            rating={props.project.rating}
            id={`${props.project.id}-card-stars`}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
