import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import { GitHubProject } from '../../interfaces';

interface Props {
  project: GitHubProject;
  onProjectRemove: () => void;
}

const ProjectCard = (props: Props) => {
  const createStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const backgroundColor = props.project.rating > i ? 'yellow' : 'gray';
      stars.push(
        <StarIcon
          className={`rating-star-${backgroundColor}`}
          style={{ fill: backgroundColor }}
          key={`${props.project.id}-${i}`}
        />
      );
    }
    return stars;
  };

  const colorPalette = [
    '#f5f5f570',
    '#ff558066',
    '#9b55ff66',
    '#5595ff66',
    '#ff795566',
  ];
  const backgroundColor =
    colorPalette[Math.floor(Math.random() * colorPalette.length)];

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
        <div style={{ marginLeft: -3, marginTop: 5 }}>{createStars()}</div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
