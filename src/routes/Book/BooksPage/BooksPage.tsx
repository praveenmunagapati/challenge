import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {SearchContext} from '../../../context/SearchContext';
import Back from '../../../assets/images/Back.svg';
import Search from '../../../assets/images/Search.svg';
import Cancel from '../../../assets/images/Cancel.svg';
import NoContent from '../../../assets/images/no-result.svg';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import { DebounceInput } from 'react-debounce-input';
import debounce  from "lodash.debounce";
import LoadingSpin from "react-loading-spin";
import './booksPage.css';

function BooksPage() {

  type pageData = {
    page : number;
    previousPage : number | null;
    nextPage : number | null;
  }

  const [filled, setFilled] = useState(false);
  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState<pageData>({ page: 1, previousPage: null, nextPage: null});
  const [searhText, setSearhText] = useState('');
  const { searchTitle, searchQuery } = useContext(SearchContext);

  let navigate = useNavigate();

  window.onscroll = debounce(() => {
    if (isLoading || !page.nextPage) return;
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        fetchData(page.page);
    }
  }, 100);


  const _onSearchChange = (text:string) => {
    if(text) {
      setFilled(true);
    }
    else {
      setFilled(false);
    }
    setPage({ page: 1, previousPage: null, nextPage: null });
    setBooks([]);
    setSearhText(text);
  };

  const fetchData = async (page:number) => {
    type paramData = {
      params: {
        topic : string;
        page : number;
        search ?: any;
      };

      headers: {
        'Content-Type': string;
      };
    };
    setLoading(true);
    let params:paramData = { params: { topic: searchQuery, page: page }, headers: { 
      'Content-Type': 'application/json'
    }};

    if (searhText) {
      params.params.search = searhText;
    } else {
      delete params.params.search;
    }
    const result = await axios('http://skunkworks.ignitesol.com:8000/books', params);
    setLoading(false);
    setBooks([...books, ...result.data.results]);
    setPage({ page: page+1 , previousPage: result.data.previous, nextPage: result.data.next });
  };

  useEffect(() => {
    fetchData(page.page);
  }, [searhText]);

  const _crearText = () => {
    setFilled(false);
    setSearhText('');
  };

  const _redirectBack = () => {
    navigate(-1);
  };


  return (
    <div className='BooksContainer'>
        <div className="dataContainer">
          <div className="booksHeading">
            <div className="head" onClick={_redirectBack} >
              <img src={Back} alt="Back" />
              <h2 className="headingText">{searchTitle}</h2>
            </div>
            <div className ="search-input">
              <img className="searchIcon" src={Search} alt="search"/>
              <DebounceInput
                minLength={2}
                debounceTimeout={1000}
                value={searhText}
                onChange={(event) => _onSearchChange(event.target.value)}
                className="inputTextArea form-control"
                type="text"
                placeholder="Search"/>
              <img className={`cancleIcon ${filled ? 'active' : ''}`} src={Cancel} alt="cloase" onClick={() => _crearText()}/>
              </div>
          </div>

          <div className="pageBody">
            <div className="bookCardWrapper">
                {
                    books.map(book => {
                      return (
                        <div className="felxCol-2" key = {book.id}> 
                          <BookCard book={book} key = {book.id} />
                        </div> 
                      )
                    })
                  }
            </div>
          </div>
         

      </div>
      <div className="loadingAnimation">
        {
          isLoading ? <LoadingSpin /> : null
        }
      </div>
      <div className="noResultContainer">
        {
        !books.length && !isLoading ? (
          <div>
            <img src={NoContent} alt="no-result-found" />
            <h3>No Results Found</h3>
          </div>) : null
      }
      </div>
      
    </div>
  )
}

export default BooksPage