import './Card.css';

const Card = ({
  imageUrl,
  name,
  addDate,
  onClick,
}: {
  imageUrl: string;
  name?: string;
  addDate: Date | string;
  onClick?: () => void;
}) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-image">
        <img src={imageUrl} alt={''} />
      </div>
      <div className="heading">{name || imageUrl}</div>
      <div className="add-date">
        {new Date(addDate).toLocaleDateString() +
          ' ' +
          new Date(addDate).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default Card;
