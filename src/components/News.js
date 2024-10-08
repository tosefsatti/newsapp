import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>{
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

 const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=76af9c44fdde45da994579f4a9ffad96&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    try{
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
   
    props.setProgress(70);
    if (parsedData.articles) {
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      
    } else {
      console.error("Error: Articles not found in parsedData", parsedData);
    }
  } catch(error){
    console.error("Error fetching more data:", error);
  }
  setLoading(false);



    
    props.setProgress(100);
  }
  useEffect(() =>{
    document.title = `${capitalize(props.category)} - NewsMonkey`;
    updateNews();
  }, []);

 const fetchMoreData = async () => {
    
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=76af9c44fdde45da994579f4a9ffad96&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        setLoading(true);
        try {
          let data = await fetch(url);
          let parsedData = await data.json();
      
          if (parsedData.articles) {
            setArticles(articles.concat(parsedData.articles));
            setTotalResults(parsedData.totalResults);
          } else {
            console.error("Error: Articles not found in parsedData", parsedData);
          }
        }catch (error) {
            console.error("Error fetching more data:", error);
          }
          setLoading(false);
      }
    
    return (
      <>
      
        <h1 className="text-center " style={{marginTop: '70px'}}>
          NewsMonkey - Top {capitalize(props.category)} headlines
        </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => (
                <div className="col-sm-1 col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={
                      element.description ? element.description.slice(0, 88) : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
        </>
    );
  }


News.defaultProps = {
  country: "us",
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
