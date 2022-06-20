import {useState} from 'react';
import GenreCard from '../GenreCard/GenreCard';
import './home.css';

const Home = () => {
    
    const [genre] = useState([
        { title: 'Fiction', value: 'fiction'},
        { title: 'Philosophy', value: 'philosophy'},
        { title: 'Drama', value: 'drama' },
        { title: 'History', value: 'history' },
        { title: 'Humor', value: 'humor' },
        { title: 'Adventure', value: 'adventure' },
        { title: 'Politics', value: 'politics' }
    ]);
    return (
        <div className="homeBaseContainer">
            <div className="homeJumbotron">
                <div className="headingWrapper">
                    <h1>Gutenberg Project</h1>
                    <p>
                        A social cataloging website that allows you to freely search its database of books, annotations,
                        and reviews.
                    </p>
                </div>
            </div>
            
             <div className="homePageContent">
                { genre.map(gn =>
                    <div className="col-6">
                        <GenreCard title={gn.title} value={gn.value} key={gn.value}/>
                    </div>
                )}
            </div>
        </div>
    )   
}


export default Home;