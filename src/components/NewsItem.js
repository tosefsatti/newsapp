import React from "react";

const NewsItem = (props) =>{
 
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className="my-3">
        <div className="card">
          <span
            className="badge position-absolute d-flex justify-content-end rounded-pill bg-danger"
            style={{ right: "0" }}
          >
            {source}
          </span>{" "}
          <img
            src={
              !imageUrl
                ? "https://images.mktw.net/im-16893173/social"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title"> {title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small>
                By {!author ? "Unknown" : author} at{" "}
                {new Date(date).toGMTString()}{" "}
              </small>
            </p>
            <a href={newsUrl} target="_blank" className="btn btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
export default NewsItem;
