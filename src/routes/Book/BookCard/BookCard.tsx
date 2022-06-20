import frameImage from '../../../assets/images/frame-landscape.svg';
import './bookCard.css';

function BookCard(prop:any) {

  const _getMimeType = (formats:any) => {
    let html = formats["text/html"];
    let epub = formats["application/epub+zip"];
    let text = formats["text/plain; charset=utf-8"];
    if (html){
      return html;
    }
    else if(epub){
      return epub;
    }
    else if(text){
      return text;
    }
    else{
      return null;
    }
  };

  const _handleOnClick = (event:any) => {
    let url = _getMimeType(prop.book.formats);
    window.open(url, '_blank');
  };


  const _getImage = (formats:any) => {
    let image = formats["image/jpeg"];
    if (!image){
      return frameImage;
    }
    return image;
  };

  return (
    <div>
      <div className="bookCardContainer" onClick={_handleOnClick}>
        <div className="cardImage">
              <img src={_getImage(prop.book.formats)} alt="img" />
        </div>
        <div className="cardtext">
          <p className="bookTitle">{`${prop.book.title.substring(0, 20)}` || 'Not Provided'}</p>
          <p className="bookAuthor">{(prop.book.authors[0] && prop.book.authors[0].name) || 'Not Provided'}</p>
        </div>
      </div>
    </div>
  )
}

export default BookCard