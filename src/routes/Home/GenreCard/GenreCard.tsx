import { useContext } from 'react';
import Next from '../../../assets/images/Next.svg';
import Adventure from '../../../assets/images/Adventure.svg';
import Drama from '../../../assets/images/Drama.svg';
import Fiction from '../../../assets/images/Fiction.svg';
import History from '../../../assets/images/History.svg';
import Humour from '../../../assets/images/Humour.svg';
import Philosophy from '../../../assets/images/Philosophy.svg';
import Politics from '../../../assets/images/Politics.svg';
import { SearchContext } from '../../../context/SearchContext';
import { useNavigate } from "react-router-dom";
import './genreCard.css';

type GenreCardProps = {
  title: string;
  value: string;
}


function GenreCard({title, value}:GenreCardProps) {

    const getGenreImage = (genreValue : string)  => {
    switch (genreValue) {
      case 'fiction':
        return Fiction;
      case 'philosophy':
        return Philosophy;
      case 'drama':
        return Drama;
      case 'history':
        return History;
      case 'humuor':
        return Humour;
      case 'adventure':
        return Adventure;
      default:
        return Politics;
    }
  };

  const { setSearchQuery, setSearchTitle } = useContext(SearchContext);
  let navigate = useNavigate();

  const navigateToBooks = (searchTerm : string, title : string) => (event: any) => {
    setSearchQuery(searchTerm);
    setSearchTitle(title);
    navigate("/books");
  };
  return (
    <div className="genereCard" onClick={navigateToBooks(value,title )} >
      <div className="cardLeftItems">
        <img className="genereIcon" src={getGenreImage(value)} alt={title} />
        {title}
      </div>
        <img className="nextIcon" src={Next} alt='Next'/>
    </div>

  )
}

export default GenreCard