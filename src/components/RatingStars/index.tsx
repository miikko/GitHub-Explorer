import StarIcon from '@material-ui/icons/Star';

interface Props {
  /**
   * Unique id that is used to form a key for each star component.
   * The key is used in React reconciliation.
   * */
  id: string;
  /**
   * Determines the amount of stars that will be colored (yellow).
   */
  rating: number;
  /**
   * Optional click handler that is attached to each star.
   * An index (starting from the left-most star) of the clicked star is provided as an argument.
   */
  onClick?: (starIndex: number) => void;
}

const RatingStars = (props: Props) => {
  const createStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const backgroundColor = props.rating > i ? 'yellow' : 'gray';
      stars.push(
        <StarIcon
          key={`rating-star-${props.id}-${i}`}
          aria-label={`Rating star ${backgroundColor}`}
          style={{
            fill: backgroundColor,
            cursor: props.onClick ? 'pointer' : 'inherit',
          }}
          onClick={() => (props.onClick ? props.onClick(i) : undefined)}
        />
      );
    }
    return stars;
  };

  return <div>{createStars()}</div>;
};

export default RatingStars;
